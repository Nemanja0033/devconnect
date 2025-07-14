"use client"
import { motion } from "framer-motion"

export default function Main(){
    return(
        <motion.section initial={{ x: 50, opacity: 0}} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5}} className="w-full grid gap-5 place-items-center">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                What is DevConnect?
            </h1>
            <p className="w-1/2 text-2xl font-semibold">
                <strong>DevConnect</strong> is a platform built for <strong>developers of all levels</strong>—from <strong>juniors to senior engineers</strong>—to 
                <strong>share knowledge</strong>, <strong>showcase their work</strong>, and <strong>collaborate on real-world projects</strong>.<br />
                Whether you're looking to <strong>network</strong>, <strong>find collaborators</strong>, or simply <strong>learn something new</strong>—
                DevConnect brings developers together in one <strong>vibrant digital space</strong>.
            </p>
        </motion.section>
    )
}