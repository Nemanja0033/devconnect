import { getPostTypeDetails } from "@/helpers/helper"
import { Badge } from "../ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { DraftType } from "@/types";

export default function Draft({ title, type, onDeleteClick, onEditClick}: { title: string, type: DraftType | undefined, onDeleteClick?: () => void, onEditClick: () => void }){
    const postType = getPostTypeDetails(type);

    return(
        <div className={`w-full border-2  transition-all hover:opacity-85 h-20 flex items-center justify-between p-3 rounded-md shadow-md`}>
            <div className="flex gap-2">
                <span className="font-semibold">{title}</span>
                <Badge className={`${postType.badge_color} `} variant={'secondary'}>• {postType.post_type}</Badge>
            </div>
            <div className="flex gap-2 items-center">
                <button onClick={onEditClick} className="cursor-pointer bg-accent h-8 w-8 flex items-center justify-center rounded-full">
                    <Edit className="text-green-500 hover:text-green-700" />
                </button>
                <button onClick={onDeleteClick} className="cursor-pointer bg-accent h-8 w-8 flex items-center justify-center rounded-full">
                    <Trash2 className="text-red-500 hover:text-red-700 cursor-pointer transition-all" size={20} />
                </button>
            </div>
        </div>
    )
}