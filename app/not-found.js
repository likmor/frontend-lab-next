"use client"
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return <div className="hero bg-base-200">
        <div className="hero-content text-center">
            <div className="max-w-lg">
                <h1 className="text-5xl font-bold">Page not found</h1>
                <p className="py-6">
                    The path you are trying to access is not found.
                </p>
                <button className="btn btn-primary" onClick={() => router.push("/")}>Back Home</button>
            </div>
        </div>
    </div>
}