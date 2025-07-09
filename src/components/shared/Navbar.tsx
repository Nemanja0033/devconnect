"use client"
import { useSession } from "next-auth/react"
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
    const { status } = useSession();

    // const handleSignOut = async () => {
    //     await signOut();
    //     location.href = '/login';
    // }

  return (
    <header className="w-full h-[80px] shadow-md rounded-md flex lg:px-40 px-5 justify-between items-center">
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
                    <Button>Logout</Button>
                    </div>
                )
                :
                (
                 <div>
                    <Link href={'/login'}>
                        <Button variant={'link'}>Login</Button>
                    </Link>
                    <Link href={'/register'}>
                        <Button>Sign in</Button>
                    </Link>
                 </div>
                )
            }
        </nav>
    </header>
  )
}

export default Navbar