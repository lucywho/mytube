import { useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

//calculate duration of video
const getVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const media = new Audio(reader.result)
            media.onloadedmetadata = () => resolve(media.duration)
        }
        reader.readAsDataURL(file)
        reader.onerror = (error) => reject(error)
    })
}

export default function Upload() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"

    const [title, setTitle] = useState("")
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)
    const [duration, setDuration] = useState(null)

    if (!session || !session.user) return null
    if (loading) {
        return (
            <p className="text-pink-200 text-2xl font-bold p-5">
                . . . loading
            </p>
        )
    }

    return (
        <>
            <div>
                <p className="text-pink-200 text-2xl font-bold p-5">
                    upload your video
                </p>
            </div>
            <form
                className="mt-5 ml-20 "
                onSubmit={async (e) => {
                    e.preventDefault()

                    const body = new FormData()
                    body.append("image", image)
                    body.append("title", title)
                    body.append("video", video)
                    body.append("duration", duration)

                    await fetch("/api/upload", {
                        body,
                        method: "POST",
                    })

                    router.push(`/channel/${session.user.username}`)
                }}
            >
                <div className="mb-2 text-pink-200 text-2xl ">title</div>
                <input
                    type="text"
                    name="name"
                    onChange={(e) => setTitle(e.target.value)}
                    className="input p-2 w-1/2"
                    required
                />
                <label>
                    <div className="my-5 border border-pink-200 p-2 w-fit rounded-lg text-pink-200 hover:text-teal-400 hover:border-teal-400 text-2xl w-1/2">
                        upload a video thumbnail{" "}
                        {image ? (
                            "✅"
                        ) : (
                            <p className="text-base">
                                (800 x 450 suggested, 3MB limit)
                            </p>
                        )}
                    </div>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        required
                        onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                                if (event.target.files[0].size > 3072000) {
                                    alert(
                                        "Too large: maximum size allowed is 3MB"
                                    )
                                    return false
                                }
                                setImage(event.target.files[0])
                            }
                        }}
                    />
                </label>
                <label>
                    <div className="my-5 text-pink-200 hover:text-teal-400 text-2xl border border-pink-200 hover:border-teal-400 p-2 w-1/2 rounded-lg">
                        upload your video file{" "}
                        {video ? (
                            "✅"
                        ) : (
                            <p className="text-base">(20MB limit)</p>
                        )}
                    </div>
                    <input
                        name="image"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        required
                        onChange={async (event) => {
                            if (event.target.files && event.target.files[0]) {
                                if (event.target.files[0].size > 20971520) {
                                    alert(
                                        "Too large: maximum size allowed is 20MB"
                                    )
                                    return false
                                }
                                const duration = await getVideoDuration(
                                    event.target.files[0]
                                )
                                setDuration(parseInt(duration))
                                setVideo(event.target.files[0])
                            }
                        }}
                    />
                </label>

                <button
                    disabled={title && video && image ? false : true}
                    className={`button mt-5 ml-0 ${
                        title && video && image
                            ? ""
                            : "cursor-not-allowed bg-gray-300 text-gray-800 border-gray-800"
                    }`}
                >
                    upload
                </button>
            </form>
        </>
    )
}
