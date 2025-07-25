import { getPostTypeDetails } from "@/helpers/helper"
import { PostType } from "@prisma/client";
import { Badge } from "../ui/badge";

export default function Draft({ title, type }: { title: string, type?: PostType }){
    const postType = getPostTypeDetails(type);

    return(
        <div className={`w-full border-2 hover:opacity-80 transition-all cursor-pointer h-20 flex items-center justify-between p-3 rounded-md shadow-md`}>
            <span className="font-semibold">{title}</span>
            <Badge className={`${postType.badge_color} text-white`} variant={'default'}>{postType.post_type}</Badge>
        </div>
    )
}