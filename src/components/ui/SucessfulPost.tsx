"use client"
import Link from 'next/link'

const SucessfulPost = () => {
  return (
    <div className="w-full h-screen flex justify-center lg:px-40 px-5">
            <section className="flex-row h-auto lg:w-1/2 w-full mt-32">
                <h1 className="text-5xl font-semibold text-purple-900 mb-5">Posted Successfully!</h1>
                <Link className="bg-purple-800 hover:bg-purple-900 transition-all rounded-2xl p-2 text-white font-semibold cursor-pointer" href={"/"}>Go Home</Link>
                <img src="/posted.png" className="mt-6" alt="" />
            </section>
        </div>
  )
}

export default SucessfulPost