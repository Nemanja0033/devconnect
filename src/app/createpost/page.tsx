"use client"

import { Image } from "lucide-react"

const CreatePostPage = () => {

  return (
    <div className="w-full h-screen flex justify-center lg:px-40 px-5">
        <section className="lg:w-1/2 w-full flex-row px-5 mt-12">
            <input className="w-full px-5 h-10 border rounded-2xl border-gray-300" placeholder="Post Title. . ." type="text" />
            <div className="flex items-center">
                <Image  className="relative top-2 text-purple-900" size={30}/>
                <input className="bg-purple-900 mt-3 w-18 cursor-pointer text-white rounded-2xl p-1"
                        type="file"
                        accept="image/*"  
                        />
            </div>
            <textarea placeholder="Post Content. . ." className="w-full mt-3 px-5 min-h-64 max-h-96 rounded-2xl border border-gray-300"></textarea>
        </section>
    </div>
  )
}

export default CreatePostPage