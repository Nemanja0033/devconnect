'use client'
import { motion } from 'framer-motion'

const headline = "Connect, Learn, Collaborate."

export default function AnimatedHeadline() {
  return (
    <h1 className="text-5xl font-extrabold tracking-tight text-start">
      {headline.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02, duration: 0.1 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  )
}
