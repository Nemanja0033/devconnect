import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import Link from "next/link";
import { ModeToggle } from "../../../components/ui/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Settings, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AvatarToggle({ isLoading, avatar, username, email }: { isLoading: boolean, avatar: string, username: string, email: string}){
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        try{
            await signOut({ callbackUrl: '/' });
            // Clear current user cache
            queryClient.removeQueries({ queryKey: ['currentUser']});
        }
        catch(err){
            toast.error("Something went wrong");
        }
    }

    if(isLoading){
        return(
            <Skeleton className="h-10 w-10 rounded-full" />
        )
    }

    return(
        <Popover>
            <PopoverTrigger>
                <img className="h-10 w-10 rounded-full" src={avatar} alt={username} />
            </PopoverTrigger>
            <PopoverContent className="border-2 bg-white z-50 grid gap-5 mt-3 dark:bg-accent p-3 w-64 rounded-md">
                <div className="py-2 hover:text-primary cursor-pointer transition-all border-b">
                    <div className="flex justify-start items-center gap-2">
                        <img src={avatar} className="h-10 w-10 rounded-full" alt="" />
                        <div className="grid place-items-start">
                            <span>{username}</span>
                            <span className="text-xs text-gray-400">{email}</span>
                        </div>
                    </div>
                </div>
                <Button>
                    <Link href={'/profile'}>My Profile</Link>
                </Button>
                <Link className="hover:text-primary gap-1 flex items-center text-sm text-gray-400" href={'/'}><Settings size={12} />Settings</Link>
                <Link className="flex items-center hover:text-primary gap-1 text-sm text-gray-400" href={'/'}><SunMoon size={12} /><ModeToggle /></Link>
                <Link onClick={handleLogout} className="hover:text-primary gap-1 flex items-center text-sm text-gray-400" href={'/'}><LogOut size={12} /> Logout</Link>
            </PopoverContent>
        </Popover>
    )
}