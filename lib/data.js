import prisma from "lib/prisma"

export const getVideos = async (options, prisma) => {
    const data = {
        where: {},
        orderBy: [
            {
                createdAt: "desc",
            },
        ],
        include: {
            author: true,
        },
    }

    const videos = await prisma.video.findMany(data)

    return videos
}

export const getVideo = async (id, prisma) => {
    const data = {
        where: {
            id: id,
        },
        include: {
            author: true,
        },
    }

    const video = await prisma.video.findUnique(data)

    return video
}
