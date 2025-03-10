"use client"
import { PostType } from "@/types/PostType"
import { CircleFadingArrowUp, MessageCircle } from "lucide-react"
import Link from "next/link"

const PostCard = ({image, title, id, comments, likes}: PostType ) => {
  return (
    <div className="lg:w-1/2 w-full h-96 rounded-md border border-gray-100 shadow-md p-3 flex-row">
        <Link href={`/posts/${id}`}>
            <img className="w-full rounded-md h-[75%] border border-gray-100" src={image} alt={title} />
            <h1 className="text-xl font-semibold m-2 text-center">{title}</h1>
            <div className="flex shadow-md rounded-md border border-gray-200 justify-center gap-10 w-full items-center">
                <span className="flex text-purple-900 items-center p-1 cursor-pointer gap-2 hover:scale-105 transition-all"><MessageCircle />{comments}</span>
                <span className="flex text-purple-900 items-center p-1 cursor-pointer gap-2 hover:scale-105 transition-all"><CircleFadingArrowUp />{likes}</span>
            </div>
        </Link>
    </div>
  )
}

export default PostCard