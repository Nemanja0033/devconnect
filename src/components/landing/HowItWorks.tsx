"use client"
import { devConnectSteps } from "@/constants/constants";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

export default function HowItWorks(){
    const { theme } = useTheme();
    return(
        <section className="grid place-items-start gap-12 items-center justify-center">
            {devConnectSteps.map((step, index) => (
                <motion.div  
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.1 }} 
                className="flex justify-around gap-3 items-center">
                    <span className={`${theme !== 'light' ? 'bg-gray-600 text-white' : "bg-black text-white"} text-xl font-bold flex items-center justify-center rounded-full w-12 h-12`}>{step.num}</span>
                    <span className="text-xl font-bold">{step.title}</span>
                    <span className="font-bold text-2xl">-</span>
                    <p className="text-xl">{step.description}</p>
                </motion.div>
            ))}
            <div className="flex justify-center w-full">
                <Button>Get Started!</Button>
            </div>
        </section>
    )
}