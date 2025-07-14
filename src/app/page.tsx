"use client"
import Feautures from "@/components/landing/Feautures";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Main from "@/components/landing/Main";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function LandingPage(){
    const { theme } = useTheme();
    return(
        <main className={`w-full p-12 flex justify-center items-center h-full ${theme === 'light' ? 'hero' : 'hero-dark'}`}>
            <section className="grid w-full">
                <nav className="flex w-full justify-between">
                    <ModeToggle />
                    <div className="flex border-b items-center gap-5">
                        <Link className="hover:font-bold transition-all" href={'/'}>Login</Link>
                        <Link className="hover:font-bold transition-all" href={'/'}>Register</Link>
                    </div>
                </nav>
                <div className="mt-64">
                    <Hero />
                </div>
                <div className="mt-64">
                    <Main />
                </div> 
                <div className="mt-64">
                    <Feautures />
                </div>   
                <div className="mt-64">
                    <HowItWorks />
                </div>            
            </section>
        </main>
    )
}