"use client"
import { useSession } from "next-auth/react"
import Link from "next/link";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { ModeToggle } from "../ui/theme-toggle";
import AvatarToggle from "../../features/user/components/AvatarToggle";
import { useMeQuery } from "@/features/user/hooks/useMeQuery";
import { useEffect } from "react";

const Navbar = () => {
    const { status } = useSession();
    const { theme } = useTheme();
    const { data, isLoading } = useMeQuery();

    useEffect(() => {
        console.log(data?.user);
    }, [data]);

  return (
    <header className="w-full h-[80px] border-b shadow-md rounded-md bg-accent flex lg:px-40 px-5 justify-between items-center">
        <div>
            <Link href={'/'}>
                <img src={`${theme === 'light' ? "/logo.png" : "/dark-logo.png"}`} className="w-32 relative top-1 h-auto" alt="" />
            </Link>
        </div>
        <nav>
            {
                status === 'authenticated' ?
                (
                    <div className="gap-2 flex">
                    <Link href={'/createpost'}>
                        <Button>+ Create</Button>
                    </Link>
                    <AvatarToggle isLoading={isLoading} avatar={data?.user.avatar} username={data?.user.username} email={data?.user.email}/>
                    </div>
                )
                :
                (
                 <div>
                    <ModeToggle />
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