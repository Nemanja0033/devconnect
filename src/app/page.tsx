"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Welcome, {session?.user?.name}!</h2>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    );
}
