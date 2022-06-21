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
            <div className="flex flex-col">
                <ReactPlayer
                    className="react-player "
                    url={video.url}
                    width="100%"
                    controls={true}
                    light={video.thumbnail}
                />

                <div className="px-5 mt-5">
                    <div className="flex ">
                        <div>
                            <p className="text-2xl font-bold ">{video.title}</p>

                            <div className="text-pink-200">
                                {video.views} views ·{" "}
                                {timeago.format(new Date(video.createdAt))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row items-center border-t border-teal-400 my-5 pt-5">
                        <Link href={`/channel/${video.author.username}`}>
                            <div className="flex flex-row w-full ">
                                <a className="flex flex-row items-center cursor-pointer">
                                    {video.author.image && (
                                        <img
                                            className="w-16 h-16 mt-2 mr-2 rounded-full"
                                            src={video.author.image}
                                            alt="user photo"
                                        />
                                    )}
                                    <span className="text-xl flex flex-row items-center pl-5 text-teal-400 hover:underline hover:text-pink-200 active:text-purple-900">
                                        {video.author.name}
                                    </span>
                                </a>
                            </div>
                        </Link>
                    </div>
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
