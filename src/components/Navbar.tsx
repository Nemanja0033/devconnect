"use client"
import { useSession } from "next-auth/react"
import Link from "next/link";

const Navbar = () => {
    const { status } = useSession();

  return (
    <header className="w-full h-[60px] shadow-md rounded-md flex lg:px-40 px-5 justify-between items-center">
        <div>
            <Link href={'/'}>
                <img src="/logo.png" className="w-32 relative top-1 h-auto" alt="" />
            </Link>
        </div>
        <nav className="flex items-center justify-around">
            {
                status === 'authenticated' ?
                (
                    <>
                    <button className="bg-orange-700 hover:bg-orange-800 transition-all rounded-2xl p-2 text-white font-semibold cursor-pointer">Create a post</button>
                    <button className="bg-purple-800 hover:bg-purple-900 transition-all rounded-2xl p-2 text-white font-semibold cursor-pointer">Sign Out</button>
                    </>
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