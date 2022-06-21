import { amount } from "lib/config"

export default function LoadMore({ videos, setVideos, setReachedEnd, author }) {
    return (
        <div className="flex justify-start p-5">
            <button
                className="button bg-purple-800"
                onClick={async () => {
                    const url = `/api/videos?skip=${videos.length}`
                    if (author) {
                        url += `&author=${author.id}`
                    }
                    const res = await fetch(url)
                    const data = await res.json()
                    if (data.length < amount) {
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
