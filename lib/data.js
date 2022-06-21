import prisma from "lib/prisma"
import { amount } from "./config"

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

    if (options.author) {
        data.where = {
            author: {
                id: options.author,
            },
        }
    }

    data.take = options.take || amount
    if (options.skip) data.skip = options.skip

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

export const getUser = async (username, prisma) => {
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    })

    return user
}
