"use client"
import { Variants } from "framer-motion"
import { Heart, HeartIcon, Home, Users2Icon } from "lucide-react";

export const navOptions = [
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

export const sidebarVariants: Variants = {
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
