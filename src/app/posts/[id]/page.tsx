"use client"
import { formatDistanceToNow } from "date-fns"; // library for date manipulation
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link";

const PostPage = () => {
    const params = useParams();
    const [postData, setPostData] = useState<any>();

    useEffect(() => {
      const fetchPosts = async () => {
        axios.get(`/api/posts/${params.id}`)
        .then(res => setPostData(res.data))
        .catch(err => console.log(err));
      }

      fetchPosts();
    }, [])

  return (
    <main className='w-full h-[100vh] flex justify-center'>
      <section className="lg:w-[70%] mt-12 flex-row px-5 shadow-md">
        <h1 className="text-3xl font-bold">{postData?.title}</h1>
        <div className="flex justify-start gap-3 mt-3 text-gray-400 text-md items-center">
          <Link className="underline" href={`/user/${postData?.author.id}`}>{postData?.author.name}</Link>
          <span>
          {postData?.createdAt 
            ? formatDistanceToNow(new Date(postData.createdAt), { addSuffix: true }) 
            : null}
          </span>
        </div>
        <div className="mt-3">
          {postData?.content}
        </div>
      </section>
    </main>
  )
}

export default PostPage