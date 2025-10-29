"use client"
import { useSession } from "next-auth/react"
import Link from "next/link";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import AvatarToggle from "../../features/user/components/AvatarToggle";
import { useMeQuery } from "@/features/user/hooks/useMeQuery";
import { useEffect } from "react";
import NotificationToggle from "../../features/notifications/components/NotificationToggle";
import SearchBar from "@/features/search/components/SearchBar";
        
const Navbar = () => {
    const { status } = useSession();
    const { theme } = useTheme();
    const { data, isLoading } = useMeQuery();

    useEffect(() => {
        console.log(data?.user);
    }, [data]);

  return (
    <header className="w-full h-[70px] fixed z-10 shadow-lg dark:bg-slate-900 bg-neutral-50 flex px-5 justify-between items-center">
        <div>
            <Link href={'/'}>
                <img src={`${theme === 'light' ? "/logo.webp" : "/logo.webp"}`} className="w-40 relative top-1 h-auto" alt="" />
            </Link>
        </div>
        <SearchBar />
        <nav>
            {
                status === 'authenticated' ?
                (
                    <div className="gap-4 items-center flex">
                    <Link href={'/createpost'}>
                        <Button className="text-white transition-all cursor-pointer rounded-lg">+ Create</Button>
                    </Link>

                    <NotificationToggle reciverId={data?.user.id} />
                    
                    <AvatarToggle isLoading={isLoading} avatar={data?.user.avatar} username={data?.user.username} email={data?.user.email}/>
                    </div>
                )
                :
                (
                 <div>
                    {/* <ModeToggle /> */}
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