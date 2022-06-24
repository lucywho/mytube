import { amount } from "lib/config"

export default function LoadMore({
    videos,
    setVideos,
    setReachedEnd,
    author,
    subscriptions,
}) {
    return (
        <div className="flex justify-start p-5">
            <button
                className="button bg-purple-800"
                onClick={async () => {
                    const url = `/api/videos?skip=${videos.length}`

                    if (author) {
                        url += `&author=${author.id}`
                    }

                    if (subscriptions) {
                        url += `&subscriptions=${subscriptions}`
                    }
                    const res = await fetch(url)
                    const data = await res.json()
                    if (data.length <= amount) {
                        setReachedEnd(true)
                    }
                    setVideos([...videos, ...data])
                }}
            >
                . . . show me more
            </button>
        </div>
    )
}
