import { Variants } from "framer-motion"
import { ArrowRight, Disc3Icon, Heart, HeartIcon, Home, MenuIcon, Music2Icon, Pause, Play, Square, StopCircle, Users2Icon } from "lucide-react";

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

export const music = [
  new Audio('/good-night-lofi-cozy-chill-music-160166.mp3'),
  new Audio('/chill-lofi-background-music-331434.mp3'),
  new Audio('/tvari-tokyo-cafe-159065.mp3')
]