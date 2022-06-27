import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Setup() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"

    const [name, setName] = useState("")
    const [username, setUserName] = useState("")
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState(null)

    useEffect(() => {
        if (session.user.name) {
            setName(session.user.name)
            setUserName(session.user.username)
            setImage(session.user.image)
        }
    })

    if (loading) {
        return (
            <p className="text-pink-200 text-2xl font-bold p-5">
                . . . loading
            </p>
        )
    }

    if (!session || !session.user) {
        return (
            <p className="text-pink-200 text-2xl font-bold p-5">
                <>
                    you must be{" "}
                    <span className="text-teal-400 hover:text-purple-800 underline">
                        <Link href="/api/auth/signin">signed in</Link>
                    </span>{" "}
                    to update your details
                </>
            </p>
        )
    }

    return (
        <>
            {session.user.name ? (
                <p className="text-pink-200 text-2xl font-bold p-5">
                    update your details
                </p>
            ) : (
                <p className="text-pink-200 text-2xl font-bold p-5">
                    please choose a name, username and avatar
                </p>
            )}
            <form
                className="mt-10 ml-20"
                onSubmit={async (e) => {
                    e.preventDefault()

                    const body = new FormData()
                    body.append("image", image)
                    body.append("name", name)
                    body.append("username", username)

                    await fetch("/api/setup", {
                        body,
                        method: "POST",
                    })

                    session.user.name = name
                    session.user.username = username
                    router.push("/")
                }}
            >
                <div className="mb-2 text-pink-200">name</div>
                <input
                    type="text"
                    name="name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 mb-5"
                    required
                />

                <div className="mb-2 text-pink-200">username</div>
                <input
                    type="text"
                    name="username"
                    defaultValue={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="p-2 mb-5"
                    required
                />

                <div>
                    <label>
                        {!imageURL && (
                            <p className="mb-2 text-pink-200">
                                upload an avatar
                            </p>
                        )}
                        <img src={imageURL} className="w-20 h-20" />
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            defaultValue={imageURL}
                            onChange={(event) => {
                                if (
                                    event.target.files &&
                                    event.target.files[0]
                                ) {
                                    if (event.target.files[0].size > 3072000) {
                                        alert(
                                            "maximum file size allowed is 3MB"
                                        )
                                        return false
                                    }
                                    setImage(event.target.files[0])
                                    setImageURL(
                                        URL.createObjectURL(
                                            event.target.files[0]
                                        )
                                    )
                                }
                            }}
                        />
                    </label>
                </div>

                <button className="button mt-5 ml-0">save</button>
            </form>
        </>
    )
}
