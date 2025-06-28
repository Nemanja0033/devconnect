"use client"
import { useSession } from "next-auth/react"
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Newspaper } from "lucide-react";

const Navbar = () => {
    const { status } = useSession();

    const handleSignOut = async () => {
        await signOut();
        location.href = '/login';
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
                    <Link href={'/createpost'} className="bg-slate-500 hover:bg-purple-800 transition-all rounded-2xl flex items-center gap-1 p-1 text-white font-semibold cursor-pointer">Create a post <Newspaper size={18} /></Link>
                    <button onClick={handleSignOut} className="bg-purple-800 hover:bg-purple-900 transition-all rounded-2xl p-1 text-white font-semibold cursor-pointer">Sign Out</button>
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