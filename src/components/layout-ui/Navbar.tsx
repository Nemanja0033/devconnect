"use client"
import { useSession } from "next-auth/react"
import Link from "next/link";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import AvatarToggle from "../../features/user/components/AvatarToggle";
import { useMeQuery } from "@/features/user/hooks/useMeQuery";
import { useEffect } from "react";
import NotificationToggle from "../../features/notifications/components/NotificationToggle";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const Navbar = () => {
    const { status } = useSession();
    const { theme } = useTheme();
    const { data, isLoading } = useMeQuery();

    useEffect(() => {
        console.log(data?.user);
    }, [data]);

  return (
    <header className="w-full h-[70px] fixed z-10 border-b-2 shadow-md bg-background flex px-5 justify-between items-center">
        <div>
            <Link href={'/'}>
                <img src={`${theme === 'light' ? "/logo.webp" : "/logo.webp"}`} className="w-40 relative top-1 h-auto" alt="" />
            </Link>
        </div>

        <div className="w-96 relative">
            <Input className="dark:bg-accent rounded-2xl w-full px-10" placeholder="Search DevConnect" />
            <Search strokeWidth={2} className="absolute top-[5.5px] left-2 text-gray-400" />
        </div>

        <nav>
            {
                status === 'authenticated' ?
                (
                    <div className="gap-4 items-center flex">
                    <Link href={'/createpost'}>
                        <Button className="hover:text-primary transition-all cursor-pointer rounded-lg" variant={'outline'}>+ Create</Button>
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