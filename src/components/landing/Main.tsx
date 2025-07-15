"use client"
import { motion } from "framer-motion"

export default function Main(){
    return(
        <motion.section initial={{ y: 150, opacity: 0}} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5}} className="w-full grid gap-5 place-items-center">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                What is DevConnect?
            </h1>
            <p className="md:w-1/2 text-2xl">
                <strong>DevConnect</strong> is a platform built for <strong>developers of all levels</strong>—from <strong>juniors to senior engineers</strong>—to 
                <strong>share knowledge</strong>, <strong>showcase their work</strong>, and <strong>collaborate on real-world projects</strong>.<br />
                Whether you're looking to <strong>network</strong>, <strong>find collaborators</strong>, or simply <strong>learn something new</strong>—
                DevConnect brings developers together in one <strong>vibrant digital space</strong>.
            </p>
        </motion.section>
    )
}