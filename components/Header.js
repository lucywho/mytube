import { useRouter } from "next/router"

export default function Header() {
    const router = useRouter()
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

            {nothome && (
                <div className="grow">
                    <button
                        className="button"
                        onClick={(e) => {
                            e.preventDefault()
                            router.push("/")
                        }}
                    >
                        home
                    </button>
                </div>
            )}
        </header>
    )
}
