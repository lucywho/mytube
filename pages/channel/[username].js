import { useState } from "react"
import { useSession } from "next-auth/react"

import { amount } from "lib/config"
import { getUser, getVideos, getSubscribersCount, isSubscribed } from "lib/data"
import prisma from "lib/prisma"

import Videos from "components/Videos"
import LoadMore from "components/LoadMore"
import SubscribedButton from "components/SubscribedButton"

export default function Channel({
    user,
    initialVideos,
    subscribers,
    subscribed,
}) {
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const [videos, setVideos] = useState(initialVideos)
    const [reachedEnd, setReachedEnd] = useState(initialVideos.length < amount)

    if (loading) {
        return (
            <p className="text-pink-200 text-2xl font-bold p-5">
                . . . loading
            </p>
        )
    }

    if (!user)
        return (
            <p className="text-center p-5">Sorry. This user does not exist.</p>
        )

    if (initialVideos.length === 0) {
        return (
            <p className="text-xl md:text-2xl font-bold text-pink-200 p-5">
                Sorry, {user.name} hasn&apos;t shared any videos yet.
            </p>
        )
    }
    return (
        <>
            <div className="flex flex-col w-full contents-center">
                <div className="flex m-5 justify-between">
                    <div className="flex">
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
                            <div className="text-pink-200 mt-2">
                                {subscribers} subscribers
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        {session && user.id === session.user.id ? (
                            <></>
                        ) : (
                            <SubscribedButton
                                user={user}
                                subscribed={subscribed}
                            />
                        )}
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

    let subscribers = await getSubscribersCount(context.params.username, prisma)

    let subscribed = null

    if (session) {
        subscribed = await isSubscribed(session.user.username, user.id, prisma)
    }

    return {
        props: {
            initialVideos: videos,
            user,
            subscribers,
            subscribed,
        },
    }
}
