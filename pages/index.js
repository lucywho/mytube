import Head from "next/head"
import prisma from "lib/prisma"
import { getVideos } from "lib/data"
import Videos from "components/Videos"

export default function Home({ videos }) {
    if (!videos) return <p className="text-pink-200">Sorry no videos</p>

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
            </div>
        </>
    )
}

export async function getServerSideProps() {
    let videos = await getVideos({}, prisma)
    videos = JSON.parse(JSON.stringify(videos))

    return {
        props: {
            videos,
        },
    }
}
