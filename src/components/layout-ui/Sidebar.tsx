"use client"
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Heart, HeartIcon, Home, MenuIcon, Music2Icon, Play, Square, StopCircle, Users2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const path = usePathname();

  const navOptions = [
    {
      label: "Home", 
      icon: <Home size={18} />,
      path: '/feed' 
    },
    {
      label: "Saved",
      icon: <HeartIcon size={18} />,
      path: '/saved'
    },
    {
      label: "Groups",
      icon: <Users2Icon size={18} />,
      path: "/groups"
    }
  ]

  const sidebarVariants: Variants = {
    open: {
      x: 0,
      transition: {
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: -200,
      transition: {
        duration: 0.4,
      },
    },
  };

  useEffect(() => {
    console.log(path)
  })

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="sidebar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="w-60 p-3 h-screen flex-col fixed top-19 left-0 shadow-lg border-r z-50"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-colors"
              aria-label="Close sidebar"
            >
              <MenuIcon />
            </button>

            <div className="w-full h-32 border-b-2 text-gray-400 py-2 border-t-2 mt-10 mb-1">
              {navOptions.map((nav) => (
                <Link className={`flex gap-2 p-2 rounded-lg w-full text-sm ${path === nav.path && 'bg-accent/50 text-primary'} hover:text-primary`} href={nav.path}>{nav.icon} {nav.label}</Link>
              ))}
            </div>

            <div className="w-full h-20 border-b-2 flex relative  justify-center items-center py-2">
              <span className="absolute text-xs text-gray-400 top-1 left-2">Ambient music</span>
              <div className="bg-accent/50 gap-3 w-full rounded-lg text-gray-400 h-full flex justify-center items-center">
                <button><Play size={18} /></button>
                <button><Square size={18} /></button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {!isOpen && (
        <aside className="w-12 h-screen fixed">
          <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(true)}
          className="fixed left-0 w-10 border-l-2 h-10 rounded-full flex items-center top-19 justify-center shadow hover:bg-gray-600 cursor-pointer transition-colors z-50"
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </motion.button>
        </aside>
      )}
    </div>
  );
}
