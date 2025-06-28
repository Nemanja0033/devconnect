"use client"
import { formatDistanceToNow, set } from "date-fns"; // library for date manipulation
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link";
import Loader from "@/components/screens/Loader";
import Comment from "@/components/reusables/Comment";

const PostPage = () => {
    const params = useParams();
    const [postData, setPostData] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchPosts = async () => {
      setIsLoading(true);
        axios.get(`/api/posts/${params.id}`)
        .then(res => {
          setPostData(res.data);
          setIsLoading(false);
        })
        .catch(err => console.log(err));
        setIsLoading(false);
      }

      fetchPosts();
    }, [])

  if(isLoading){
    return(
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <main className='w-full h-full flex justify-center'>
      <section className="lg:w-[70%] w-full mt-12 flex-row px-5 shadow-md">
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
        <div className="mt-3">
          <img src={postData?.img} alt="" />
          <span className="text-gray-400">{postData?.title}</span>
        </div>

        <section className="flex-row w-full mt-5">
          <div className="flex justify-start border-b border-gray-300 py-2 mb-3">
            <span className="text-2xl">Comments ({postData?.Comment.length})</span>
          </div>
          <div className="w-full">
            {postData?.Comment.map((com: any) => (
              <Comment key={com.postId} 
                       date={com.createdAt} 
                       content={com.content} 
                       />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default PostPage