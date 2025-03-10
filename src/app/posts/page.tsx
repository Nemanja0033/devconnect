// "use client"
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const page = () => {
//     const [posts, setPosts] = useState([]);
//     console.log(posts)

//     useEffect(() => {
//         const fetchPosts = async () => {
//             axios.get('api/posts')
//             .then(res => setPosts(res.data))
//             .catch(err => console.log(err)) 
//         }

//         fetchPosts();
//     }, []);

//     const deletePost = async (id: any) => {
//         axios.delete(`api/posts/${id}`)
//         .then(() => {
//             alert("Deleted!")
//         })
//         .catch((err) => alert(err))
//     }
//   return (
//     <div>{posts.map((p: any) => (
//         <div key={p.id} className='w-full border flex justify-around'>
//             <span>{p.title}</span>
//             <span>{p.id}</span>
//             <span onClick={() => deletePost(p.id)} className='cursor-pointer hover:text-red-500'>Delete</span>
//         </div>
//     ))}</div>
//   )
// }

// export default page