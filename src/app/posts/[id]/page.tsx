"use client"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const PostPage = () => {
    const params = useParams();
    const [postData, setPostData] = useState();

    useEffect(() => {
      const fetchPosts = async () => {
        axios.get(`/api/posts/${params.id}`)
        .then(res => setPostData(res.data))
        .catch(err => console.log(err));
      }

      fetchPosts()
    }, [])

  return (
    <main className='w-full h-full flex justify-center'>

    </main>
  )
}

export default PostPage