import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Header({ subscriptions }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"
    if (loading) {
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
            </header>
        )
    }

    let nothome = true

    if (router.pathname === "/") {
        nothome = false
    }

    return (
        <header className=" min-h-10 md:min-h-14 flex flex-col md:flex-row px-5 pt-2 pb-4 md:pb-10 border-b-2 border-teal-400">
            <div className="flex flex-row justify-between">
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
                    <div className="three w-full flex flex-row content-center cursor-pointer md:ml-3">
                        <Link href={`/channel/${session.user.username}`}>
                            <div className="four flex flex-row">
                                <div className="flex flex-col justify-center h-auto min-w-fit">
                                    <img
                                        src={session.user.image}
                                        className="h-5 w-5 md:h-10 md:w-10 rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="ml-2 text-teal-400 hover:text-pink-200 font-bold text-lg md:text-2xl ">
                                        {session.user.name}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>

            <div className="grow  ml-10 -mt-1"></div>
            <div className="flex flex-row mt-2 justify-start md:mt-0">
                {session && router.pathname !== "/subscriptions" && (
                    <Link href={`/subscriptions`}>
                        <button className="button ml-0">
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

                <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                    {session ? (
                        <button className="button">sign out</button>
                    ) : (
                        <button className="button">sign in</button>
                    )}
                </Link>
            </div>
        </header>
    )
}
