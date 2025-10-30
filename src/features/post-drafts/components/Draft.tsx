import { getPostTypeDetails } from "@/helpers/helpers"
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DraftType } from "../types";
import { DeleteIcon, EditIcon } from "@/components/reusables/Icons";

export default function Draft({ title, type, onDeleteClick, onEditClick}: { title: string, type: DraftType | undefined, onDeleteClick?: () => void, onEditClick: () => void }){
    const postType = getPostTypeDetails(type);

    return(
        <div className={`w-full border-2 transition-all hover:opacity-85 h-20 flex items-center justify-between p-3 rounded-md shadow-md`}>
            <div className="flex gap-2">
                <span className="font-semibold">{title}</span>
                <Badge className={`${postType.badge_color} ${postType.text_color} `} variant={'secondary'}>• {postType.post_type}</Badge>
            </div>
            <div className="flex gap-2 items-center">
                <button onClick={onEditClick} className="cursor-pointer bg-accent h-8 w-8 flex items-center justify-center rounded-full">
                    <EditIcon />
                </button>
                <button onClick={onDeleteClick} className="cursor-pointer bg-accent h-8 w-8 flex items-center justify-center rounded-full">
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
}