"use client"
import { useSession } from "next-auth/react"
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { status } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    }

  return (
    <header className="w-full h-[60px] shadow-md rounded-md flex lg:px-40 px-5 justify-between items-center">
        <div>
            <Link href={'/'}>
                <img src="/logo.png" className="w-32 relative top-1 h-auto" alt="" />
            </Link>
        </div>
        <nav>
            {
                status === 'authenticated' ?
                (
                    <div className="gap-2 flex">
                    <button className="bg-pink-500 hover:bg-pink-600 transition-all rounded-2xl p-2 text-white font-semibold cursor-pointer">Create a post +</button>
                    <button onClick={handleSignOut} className="bg-purple-800 hover:bg-purple-900 transition-all rounded-2xl p-2 text-white font-semibold cursor-pointer">Sign Out</button>
                    </div>
                )
                :
                (
                    <Link href={'/login'} className="bg-purple-800 hover:bg-purple-900 transition-all rounded-2xl p-2 text-white font-semibold cursor-pointer">Log In</Link>
                )
            }
        </nav>
    </header>
  )
}

export default Navbar