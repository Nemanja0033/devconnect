"use client"
import { Image } from "lucide-react"
import { uploadToCloud } from "../helpers/uploadImage";
import React, { useState } from "react";

const CreatePostPage = () => {
    const [img, setimg] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const createPost = async () => {
        try{
            await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, img, }),
              });
            alert("Posted succesfully!");
        }
        catch(err){
            alert("Something went wrong!");
            console.log(err)
        }
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const url = await uploadToCloud(file);
            setimg(url);
            alert("Image uploaded!")
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

  return (
    <div className="w-full h-screen flex justify-center lg:px-40 px-5">
        <section className="lg:w-1/2 w-full shadow-md border border-gray-300 py-5 h-auto rounded-md flex-row px-5 mt-12">
            <input name="title" onChange={(e) => setTitle(e.target.value)} className="w-full px-5 h-10 border rounded-2xl border-gray-300" placeholder="Post Title. . ." type="text" />
            <div className="flex items-center">
                <Image className="relative top-2 text-purple-900" size={30}/>
                <input className="bg-purple-900 mt-3 w-18 cursor-pointer text-white rounded-2xl p-1"
                        type="file"
                        accept="image/*"  
                        onChange={handleFileUpload}
                        />
            </div>
            <textarea name="content" onChange={(e) => setContent(e.target.value)} placeholder="Post Content. . ." className="w-full mt-3 px-5 min-h-64 max-h-64 rounded-2xl border border-gray-300"></textarea>
            <button  onClick={createPost} className="bg-purple-800 w-full hover:bg-purple-900 transition-all rounded-2xl p-2 mt-3 text-white font-semibold cursor-pointer">Submit Post</button>
        </section>
    </div>
  )
}

export default CreatePostPage