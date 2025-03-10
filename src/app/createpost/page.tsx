"use client"
import { Image } from "lucide-react"
import { uploadToCloud } from "../../utils/uploadImage";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useLoadingStore } from "@/store/useLoadingStore";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import SucessfulPost from "@/components/ui/SucessfulPost";

const CreatePostPage = () => {
    const { data: session } = useSession();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const postedSound = new Audio('/posted.mp3');

    const [img, setimg] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isImageLoaded, setIsImageLoaded] = useState(false); // state for displaying succes message if image is uploaded succesfully
    const { isLoading, toggleLoading } = useLoadingStore();
    const [isPosted, setIsPosted] = useState(false);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    const handleSuccesfullPost = async () => {
        await postedSound.play();
        toggleLoading();
        setIsPosted(true);
    }

    const createPost = async () => {
        if(title.length < 1 || content.length < 1 || img.length < 1){
            alert("All fields are required!")
        }
       else{
        toggleLoading();
        const res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, img, }),
          });

          if(res.ok){
            handleSuccesfullPost();
          }
          else{
            toggleLoading();
            alert("Somethhing went wrong");
          }
       }
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            toggleLoading();
            const url = await uploadToCloud(file);
            setimg(url);
            setIsImageLoaded(true);
            toggleLoading();
        } catch (error) {
            toggleLoading();
            alert('Error uploading image:');
        }
    };

  if(isPosted){
    return(
        <SucessfulPost />
    )
  }

  return (
    <div className="w-full h-screen flex justify-center lg:px-40 px-5">
        <section className="lg:w-[80%] w-full shadow-md border border-gray-300 py-5 h-auto rounded-md flex-row px-5 mt-12">
            <div className="flex items-start">
                <span className="font-semibold text-md text-gray-400 mb-3">
                    Hello <span className="font-bold underline">{session?.user?.name}</span> what do you want to talk about? 
                </span>
            </div>
            <input ref={titleRef} name="title" onChange={(e) => setTitle(e.target.value)} className="w-full px-5 h-10 border rounded-2xl border-gray-300" placeholder="Post Title. . ." type="text" />
            <div className="flex items-center">
                <Image className="relative top-2 text-purple-900" size={30}/>
                <input className="bg-purple-900 mt-3 w-18 cursor-pointer text-white rounded-2xl p-1"
                        type="file"
                        accept="image/*"  
                        onChange={handleFileUpload}
                        />
                <div className="relative top-1 ml-1">
                    {!isLoading && isImageLoaded ? <span className="text-green-400 text-md">Image Uploaded!</span> : isLoading && !isImageLoaded ? <Loader /> : null}
                </div>
            </div>
            <textarea name="content" onChange={(e) => setContent(e.target.value)} placeholder="Post Content. . ." className="w-full mt-3 px-5 min-h-64 max-h-64 rounded-2xl border border-gray-300"></textarea>
            <button onClick={createPost} className="bg-purple-800 w-full hover:bg-purple-900 transition-all rounded-2xl p-2 mt-3 text-white font-semibold flex justify-center items-center cursor-pointer">{isLoading ? <Loader /> : 'Submit Post'}</button>
        </section>
    </div>
  )
}

export default CreatePostPage