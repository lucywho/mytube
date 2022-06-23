import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Header({ subscriptions }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"
    if (loading) return null

    let nothome = true

    if (router.pathname === "/") {
        nothome = false
    }

    return (
        <header className="min-h-14 flex px-5 pt-2 pb-10 border-b-2 border-teal-400">
            <div className="text-4xl w-full">
                <p>
                    🙈 <span className="text-teal-400">my</span>
                    <span className="font-extrabold">
                        <span className="text-purple-800">T</span>
                        <span className="text-purple-600">u</span>
                        <span className="text-purple-400">b</span>
                        <span className="text-purple-200">e</span>
                    </span>
                </p>
            </div>
            {session && (
                <div className="w-full flex flex-row justify-end pr-6 content-center cursor-pointer">
                    <Link href={`/channel/${session.user.username}`}>
                        <div className="flex flex-row">
                            <span className="flex flex-col justify-center pr-3 ">
                                <img
                                    src={session.user.image}
                                    className="h-10 w-10 rounded-full "
                                />
                            </span>

                            <p className=" text-teal-400 font-bold text-2xl flex flex-col justify-center">
                                {session.user.name}
                            </p>
                        </div>
                    </Link>
                </div>
            )}

            <div className="grow  ml-10 -mt-1"></div>
            {session && router.pathname !== "/subscriptions" && (
                <Link href={`/subscriptions`}>
                    <button className="button">
                        <p className="">subscriptions</p>
                    </button>
                </Link>
            )}

            {nothome && (
                <button
                    className="button"
                    onClick={(e) => {
                        e.preventDefault()
                        router.push("/")
                    }}
                >
                    home
                </button>
            )}

            {session && (
                <Link href={"/setup"}>
                    <button className="button">update</button>
                </Link>
            )}

            <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                {session ? (
                    <button className="button">sign out</button>
                ) : (
                    <button className="button">sign in</button>
                )}
            </Link>
        </header>
    )
}
