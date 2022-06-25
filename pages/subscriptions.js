import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useSession, getSession } from "next-auth/react"

import prisma from "lib/prisma"
import { getVideos } from "lib/data.js"
import { amount } from "lib/config"

import Videos from "components/Videos"
import LoadMore from "components/LoadMore"

export default function Subscriptions({ initialVideos }) {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [videos, setVideos] = useState(initialVideos)
    const [reachedEnd, setReachedEnd] = useState(initialVideos.length < amount)

    const loading = status === "loading"

    if (loading) {
        return (
            <p className="text-pink-200 text-2xl font-bold p-5">
                . . . loading
            </p>
        )
    }

    if (session && !session.user.name) {
        router.push("/setup")
    }

    if (!videos)
        return (
            <p className="text-pink-200 text-2xl font-bold p-5">
                You haven&apos;t subscribed to any videos yet
            </p>
        )

    return (
        <div>
            <Head>
                <title>MyTube</title>
                <meta name="description" content="video sharing app" />
                <link rel="icon" href="/monkeyfav.ico" />
            </Head>

            <Videos videos={videos} />

            {!reachedEnd && (
                <LoadMore
                    videos={videos}
                    setVideos={setVideos}
                    setReachedEnd={setReachedEnd}
                    subscriptions={session.user.id}
                />
            )}
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    let videos = await getVideos({ subscriptions: session.user.id }, prisma)
    videos = JSON.parse(JSON.stringify(videos))

    return {
        props: {
            initialVideos: videos,
        },
    }
}
