"use client"
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import AnimatedHeadline from "./AnimatedHeadline";

export default function Hero(){
    return(
        <section className="w-full grid gap-5 place-items-start">
                <AnimatedHeadline />
                <motion.div initial={{ x: -50, opacity: 0}} animate={{ x: 0, opacity: 1}} transition={{ duration: 0.5, ease: 'easeOut'}}>
                    <h2 className="scroll-m-20 text-gray-500 md:w-1/2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                     DevConnect is the new home for developers seeking community, growth, and project collaboration.
                    </h2>
                    <div className="flex gap-5">
                        <Button>Join for Free</Button>
                        <Button variant={'secondary'}>Explore Feautures</Button>
                    </div>
                </motion.div>
        </section>
    )
}