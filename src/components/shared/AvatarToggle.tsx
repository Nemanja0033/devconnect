import { useUserStore } from "@/store/useUserStore"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import Link from "next/link";
import { ModeToggle } from "../ui/theme-toggle";

export default function AvatarToggle(){
    const { user } = useUserStore();

    if(!user) return;

    return(
        <Popover>
            <PopoverTrigger>
                <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.username} />
            </PopoverTrigger>
            <PopoverContent className="border-2 bg-white z-50 grid gap-5 mt-3 dark:bg-accent p-3 w-64 rounded-md">
                <div className="py-2 hover:opacity-55 cursor-pointer transition-all">
                    <div className="flex justify-start items-center gap-2">
                        <img src={user.avatar} className="h-10 w-10 rounded-full" alt="" />
                        <div className="grid place-items-start">
                            <span>{user.username}</span>
                            <span className="text-xs text-gray-400">{user.email}</span>
                        </div>
                    </div>
                </div>
                <Link className="hover:opacity-55" href={'/'}>My Profile</Link>
                <Link className="hover:opacity-55" href={'/'}>Settings</Link>
                <Link className="flex items-center hover:opacity-55 gap-2" href={'/'}><ModeToggle /></Link>
                <Link className="hover:opacity-55" href={'/'}>Logout</Link>
            </PopoverContent>
        </Popover>
    )
}