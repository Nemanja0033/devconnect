import { devConnectSteps } from "@/constants/constants";
import { Button } from "../ui/button";

export default function HowItWorks(){
    return(
        <section className="grid place-items-start gap-12 items-center justify-center">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">How It Works?</h1>
            {devConnectSteps.map((step, index) => (
                <div 
                key={index} 
                className="flex justify-around gap-3 items-center">
                    <span className={`bg-black text-white md:text-xl font-bold flex items-center justify-center rounded-full p-3 md:w-12 md:h-12`}>{step.num}</span>
                    <span className="text-xl font-bold">{step.title}</span>
                    <span className="font-bold text-2xl">-</span>
                    <p className="text-xl">{step.description}</p>
                </div>
            ))}
        </section>
    )
}