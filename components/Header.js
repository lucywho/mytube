import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Header({ subscriptions }) {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"
    if (loading) {
        return (
            <header className="flex px-5 py-4 md:py-8 border-b-2 border-teal-400">
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
        <header className="flex flex-col md:flex-row px-5 py-4 md:py-8 border-b-2 border-teal-400">
            <div className="flex flex-row justify-between">
                <div className="text-4xl w-full flex flex-col justify-center">
                    <p className="text-4xl w-full flex flex-row">
                        🙈 <span className="text-teal-400 ml-2">my</span>
                        <span className="font-extrabold">
                            <span className="text-purple-800">T</span>
                            <span className="text-purple-600">u</span>
                            <span className="text-purple-400">b</span>
                            <span className="text-purple-200">e</span>
                        </span>
                    </p>
                </div>
                <div className="grow ml-10 -mt-1"></div>
                {session && (
                    <div className="h-full w-full flex flex-row content-center justify-center cursor-pointer">
                        <Link href={`/channel/${session.user.username}`}>
                            <div className="h-full flex flex-row">
                                <div className="flex flex-col justify-center h-auto min-w-fit ">
                                    <img
                                        src={session.user.image}
                                        className="h-5 w-5 md:h-10 md:w-10 rounded-full"
                                        alt="user avatar"
                                    />
                                </div>
                                <div className="flex flex-col justify-center ">
                                    <p className="ml-2 text-teal-400 hover:text-pink-200 font-bold text-2xl md:text-3xl ">
                                        {session.user.name}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
            <div className="grow  ml-10 -mt-1"></div>
            <div className="flex flex-row mt-4 justify-start md:mt-0 h-fit">
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
