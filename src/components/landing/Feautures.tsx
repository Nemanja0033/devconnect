"use client"
import { FEAUTURES } from "@/constants/constants";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

export default function Feautures() {
    return(
        <motion.section initial={{ x: 50, opacity: 0}} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5}} className="w-full grid place-items-center gap-5">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Key Feautures</h1>
            <div className="md:flex justify-center grid place-items-start gap-5">
                {FEAUTURES.map((item, i) => (
                    <Card key={i} className="p-5 hover:scale-105 transition-all w-96 h-40 shadow-md rounded-md">
                        <div className="grid gap-5">
                            <span className="text-xl font-semibold">{item.feauture}</span>
                            <span className="text-lg text-gray-500">{item.desc}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </motion.section>
    )
}