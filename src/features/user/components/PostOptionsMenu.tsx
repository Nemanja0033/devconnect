import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Ellipsis, Trash } from "lucide-react"

const PostOptions = ({ handleDelete }: any) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer"><Ellipsis /></DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-accent">
                <DropdownMenuItem onClick={handleDelete} className="cursor-pointer hover:opacity-75 transition-all"><Trash /> Delete post</DropdownMenuItem>
                {/* <DropdownMenuItem className="cursor-pointer hover:opacity-75 transition-all"><Edit /> Edit post</DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default PostOptions