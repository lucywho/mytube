import Video from "components/Video"

export default function Videos({ videos }) {
    if (!videos)
        return (
            <p className="text-pink-200 text-2xl font-bold p-5">
                Sorry, no videos here!
            </p>
        )

    return (
        <div className="flex flex-wrap bg-grey-900">
            {videos.map((video, index) => (
                <div className="w-full md:w-1/2 lg:w-1/3" key={index}>
                    <Video video={video} />
                </div>
            ))}
        </div>
    )
}
