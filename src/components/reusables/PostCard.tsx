"use client"
import { PostType } from "@/types"
import { ArrowUpRightFromSquareIcon, CircleFadingArrowUp, MessageCircle } from "lucide-react"
import Link from "next/link"

const PostCard = ({image, title, id, comments, likes}: PostType ) => {
  return (
    <div className="lg:w-[70%] w-full mt-12 h-[450px] rounded-md border border-gray-100 shadow-md p-3 flex-row">
            <img className="w-full rounded-md h-[75%] border border-gray-100" src={image} alt={title} />
            <h1 className="text-xl font-semibold m-2 text-center">{title}</h1>
            <div className="flex shadow-md rounded-md border border-gray-200 justify-center gap-10 w-full items-center">
                <span className="flex text-purple-900 items-center p-1 cursor-pointer gap-2 hover:scale-105 transition-all"><MessageCircle />{comments}</span>
                <span className="flex text-purple-900 items-center p-1 cursor-pointer gap-2 hover:scale-105 transition-all"><CircleFadingArrowUp />{likes}</span>
            </div>
            <div className="flex justify-center m-3">
              <Link className="bg-purple-900 rounded-full p-2 flex items-center gap-1 hover:scale-105 transition-all text-white shadow-lg" href={`/posts/${id}`}>Read Article <ArrowUpRightFromSquareIcon /></Link>
            </div>
    </div>
  )
}

export default PostCard