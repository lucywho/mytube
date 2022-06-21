import dynamic from "next/dynamic"
import Link from "next/link"

import prisma from "lib/prisma"
import { getVideo } from "lib/data.js"
import timeago from "lib/timeago"

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export default function SingleVideo({ video }) {
    if (!video)
        return (
            <p className="text-center p-5">Sorry. This video does not exist.</p>
        )

    return (
        <>
            <div className="relative pt-[60%]">
                <ReactPlayer
                    className="react-player absolute top-0 left-0"
                    url={video.url}
                    width="100%"
                    controls={true}
                    light={video.thumbnail}
                />
            </div>

            <div className="px-5 mt-5">
                <div className="flex ">
                    <div>
                        <p className="text-2xl font-bold ">{video.title}</p>

                        <div className="text-gray-400">
                            {video.views} views ·{" "}
                            {timeago.format(new Date(video.createdAt))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between border-t border-gray-500 mt-5 pt-5">
                    <Link href={`/channel/${video.author.username}`}>
                        <a className=" flex ">
                            {video.author.image && (
                                <img
                                    className="w-16 h-16 mt-2 mr-2 rounded-full"
                                    src={video.author.image}
                                />
                            )}
                            <span className="mt-6 ml-2 text-xl">
                                {video.author.name}
                            </span>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    let video = await getVideo(context.params.id, prisma)
    video = JSON.parse(JSON.stringify(video))

    return {
        props: {
            video,
        },
    }
}
