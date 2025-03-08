"use client"
import { useSession } from "next-auth/react"

const Navbar = () => {
    const { status } = useSession();

  return (
    <header className="w-full h-[60px] shadow-md rounded-md flex justify-between items-center">
        <div>
            <img src="/logo.png" className="w-32 h-auto" alt="" />
        </div>
        <nav className="flex items-center justify-around">
            {
                status === 'authenticated' ?
                (
                    <>
                    <button>Create a post</button>
                    <button>Sign Out</button>
                    </>
                )
                :
                (
                    <button>Sign In</button>
                )
            }
        </nav>
    </header>
  )
}

export default Navbar