export default function Utils() {
    return (
        <div className="mt-10 ml-20">
            <h2 className="mb-10 text-xl">Utils</h2>

            <div className="flex-1 mb-5">
                <button
                    className="button"
                    onClick={async () => {
                        await fetch("/api/utils", {
                            body: JSON.stringify({
                                task: "generate_content",
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                            method: "POST",
                        })
                    }}
                >
                    Generate content
                </button>
            </div>
            <div className="flex-1 mb-5">
                <button
                    className="button"
                    onClick={async () => {
                        await fetch("/api/utils", {
                            body: JSON.stringify({
                                task: "clean_database",
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                            method: "POST",
                        })
                    }}
                >
                    Clean database
                </button>
            </div>
        </div>
    )
}