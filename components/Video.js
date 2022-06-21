import Image from "next/image"
import Link from "next/link"
import timeago from "lib/timeago"

export default function Video({ video }) {
    return (
        <>
            <div className="px-5 pt-5">
                {video.thumbnail && (
                    <Link href={`/video/${video.id}`}>
                        <Image
                            className="mb-2 cursor-pointer"
                            src={video.thumbnail}
                            alt="video thumbnail"
                            width="800"
                            height="450"
                        />
                    </Link>
                )}
                <p className="text-grey-100 float-right relative -mt-11 mr-1 bg-gray-900 bg-opacity-60 rounded-lg p-1">
                    {Math.floor(video.length / 60)
                        .toString()
                        .padStart(2, "0")}
                    :{(video.length % 60).toString().padStart(2, "0")}
                </p>
                <div className="flex border border-purple-900 text-grey-100 rounded-xl bg-purple-900">
                    {video.author.image && (
                        <img
                            className="w-10 h-10 mt-2 mx-2 rounded-full"
                            src={video.author.image}
                        />
                    )}
                    <div>
                        <Link href={`/video/${video.id}`}>
                            <p className="text-lg font-bold text-gray-100 hover:text-pink-200 hover:underline  active:text-purple-900 cursor-pointer">
                                {video.title}
                            </p>
                        </Link>
                        <div className="">
                            <div className="">
                                <div className="text-pink-2000">
                                    <Link
                                        href={`/channel/${video.author.username}`}
                                    >
                                        <span className="mr-2 hover:underline hover:text-pink-200  active:text-purple-900 cursor-pointer">
                                            {video.author.name}
                                        </span>
                                    </Link>
                                </div>
                                <div className="text-pink-200 font-thin">
                                    {video.views} views ·{" "}
                                    {timeago.format(new Date(video.createdAt))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
