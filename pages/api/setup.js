import { getSession } from "next-auth/react"
import nextConnect from "next-connect"
import middleware from "middleware/middleware"
import prisma from "lib/prisma"
import { upload } from "lib/upload"

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
    const session = await getSession({ req })

    if (!session) return res.statusCode(401).json({ message: "not signed in" })

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })

    if (!user) return res.statusCode(401).json({ message: "user not found" })

    //saves name and username
    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            name: req.body.name[0],
            username: req.body.username[0],
        },
    })

    //saves image file to aws
    if (req.files && req.files.image[0]) {
        const avatar_url = await upload({
            file: req.files.image[0],
            user_id: user.id,
        })

        //saves image link to db
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                image: avatar_url,
            },
        })
    }

    res.end()
    return
})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default handler
