"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { data: session, status }: any = useSession();
    const router = useRouter();

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/login");
    //     }
    // }, [status]);
    

    useEffect(() => {
        async function testApi() {
            const res = await fetch("http://localhost:3000/api/test");
            const id = await res.json()
            console.log(id)
        }

        testApi();
    }, [])

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Welcome, {session?.user?.name}! {status === 'authenticated' ? 'You are logged in' : 'You are not Logged in'}</h2>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    );
}
