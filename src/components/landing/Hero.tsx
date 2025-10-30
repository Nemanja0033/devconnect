import Link from "next/link";
import { Button } from "../ui/button";
import AnimatedHeadline from "./AnimatedHeadline";

export default function Hero(){
    return(
        <section className="w-full grid gap-5 place-items-start">
                <AnimatedHeadline />
                <div>
                    <h2 className="scroll-m-20 text-gray-500 md:w-1/2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                     DevConnect is the new home for developers seeking community, learning, and projects sharing.
                    </h2>
                    <div className="flex gap-5">
                        <Link href={'/login'}>
                            <Button className="text-white cursor-pointer">Try Beta</Button>
                        </Link>
                        <Link href={"#about"}>
                            <Button className="text-white cursor-pointer" variant={'secondary'}>Learn more</Button>
                        </Link>
                    </div>
                </div>
        </section>
    )
}