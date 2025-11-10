import { Faq } from "@/components/landing/Faq";
import Feautures from "@/components/landing/Feautures";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Main from "@/components/landing/Main";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'DevConnect | Connect with Developers',
  description: 'Join DevConnect and share your coding journey. Discover features, stories, and how it works.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'DevConnect | Connect with Developers',
    description: 'Join DevConnect and share your coding journey. Discover features, stories, and how it works.',
    url: 'https://devconnect.forum',
    siteName: 'DevConnect',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevConnect | Connect with Developers',
    description: 'Join DevConnect and share your coding journey.',
  },
};

export default function LandingPage(){
    return(
        <main className={`w-full p-5 flex justify-center items-center h-full hero-dark`}>
            <section className="grid w-[1200px] p-2 place-items-center">
                <nav className="flex w-full justify-end fixed top-5 right-5">
                    <div className="flex border-b items-center gap-5">
                        <Link href={'/login'}>Login</Link>
                        <Link href={'/register'}>Register</Link>
                    </div>
                </nav>
                <div className="mt-80 grid gap-80">
                    <Hero />
                    <Main />
                    <Feautures />
                    <HowItWorks />
                    {/* <Faq /> */}
                    <footer className="w-full flex justify-center">
                        <span className="text-gray-300">DevConnect 2025 v.0.2.1 </span>
                    </footer>
                </div>
            </section>
        </main>
    )
}