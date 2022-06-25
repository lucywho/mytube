import Head from "next/head"
import { useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { amount } from "lib/config"
import prisma from "lib/prisma"
import { getVideos } from "lib/data"
import Videos from "components/Videos"
import LoadMore from "components/LoadMore"

export default function Home({ initialVideos }) {
    const { data: session, status } = useSession()
    const router = useRouter()
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

    if (session && !session.user.name) {
        router.push("/setup")
    }

    if (!videos)
        return (
            <p className="text-pink-200 text-2xl font-bold p-5">
                Sorry, no videos here!
            </p>
        )

    return (
        <>
            <Head>
                <title>MyTube</title>
                <meta name="description" content="video sharing app" />
                <link rel="icon" href="/monkeyfav.ico" />
            </Head>
            <div>
                {videos.length === 0 && (
                    <p className="flex justify-center mt-20">
                        No videos found!
                    </p>
                )}
                <Videos videos={videos} />
                {!reachedEnd && (
                    <LoadMore
                        videos={videos}
                        setVideos={setVideos}
                        setReachedEnd={setReachedEnd}
                    />
                )}
            </div>
        </>
    )
}

export async function getServerSideProps() {
    let videos = await getVideos({}, prisma)
    videos = JSON.parse(JSON.stringify(videos))

    return {
        props: {
            initialVideos: videos,
        },
    }
}
