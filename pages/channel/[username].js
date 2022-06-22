import { useState } from "react"

import { amount } from "lib/config"
import { getUser, getVideos } from "lib/data"
import prisma from "lib/prisma"

import Videos from "components/Videos"
import LoadMore from "components/LoadMore"

export default function Channel({ user, initialVideos }) {
    const [videos, setVideos] = useState(initialVideos)
    const [reachedEnd, setReachedEnd] = useState(initialVideos.length < amount)

    if (!user)
        return (
            <p className="text-center p-5">Sorry. This user does not exist.</p>
        )
    if (!videos)
        return (
            <p className="text-center p-5">
                Sorry. This user has not shared any videos.
            </p>
        )
    return (
        <>
            <div className="flex flex-col w-full contents-center">
                <div className="flex m-5">
                    {user.image && (
                        <img
                            className="w-10 h-10 md:w-20 md:h-20 mt-2 mr-2 rounded-full"
                            src={user.image}
                        />
                    )}
                    <div className="flex flex-col justify-center  pl-2 md:pl-5">
                        <p className="text-2xl md:text-4xl font-bold text-teal-400">
                            {user.name}&apos;s videos
                        </p>
                    </div>
                </div>
                <div className="w-full">
                    <Videos videos={videos} />
                    {!reachedEnd && (
                        <LoadMore
                            videos={videos}
                            setVideos={setVideos}
                            setReachedEnd={setReachedEnd}
                            author={user}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    let user = await getUser(context.params.username, prisma)
    user = JSON.parse(JSON.stringify(user))

    let videos = await getVideos({ author: user.id }, prisma)
    videos = JSON.parse(JSON.stringify(videos))

    return {
        props: {
            initialVideos: videos,
            user,
        },
    }
}