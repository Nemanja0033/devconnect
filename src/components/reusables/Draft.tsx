import { getPostTypeDetails } from "@/helpers/helper"
import { PostType } from "@prisma/client";
import { Badge } from "../ui/badge";
import { Trash2 } from "lucide-react";

export default function Draft({ title, type, onDeleteClick}: { title: string, type?: PostType, onDeleteClick?: () => void }){
    const postType = getPostTypeDetails(type);

    return(
        <div className={`w-full border-2 hover:opacity-80 transition-all cursor-pointer h-20 flex items-center justify-between p-3 rounded-md shadow-md`}>
            <span className="font-semibold">{title}</span>
            <div className="flex items-center gap-2">
                <Badge className={`${postType.badge_color} text-white`} variant={'default'}>{postType.post_type}</Badge>
                <button onClick={onDeleteClick}>
                    <Trash2 className="text-red-500 hover:text-red-700 cursor-pointer transition-all" size={20} />
                </button>
            </div>
        </div>
    )
}