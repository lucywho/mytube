import { useRouter } from "next/router"

export default function Header() {
    const router = useRouter()
    let nothome = true

    if (router.pathname === "/") {
        nothome = false
    }

    return (
        <header className="min-h-14 flex px-5 pt-2 pb-5 ">
            <div className="text-4xl w-full text-center">
                <p>
                    🙈 my<span className="font-extrabold">Tube</span>
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
