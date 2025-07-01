import { STEPS } from "@/constants/constants";
import { Steps } from "@/types";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";

export default function StepIndicator({ step, steps }: { step: number, steps: Steps[] }){
    return(
        <TooltipProvider>
            <div className="flex justify-center items-center gap-5 mt-10">
            {steps.map((s, i) => (
                 <div className="w-full flex items-center justify-center gap-5" key={i}>
                    <Tooltip>
                        <TooltipTrigger>
                            <span className={`${step === i ? 'bg-black' : 'bg-gray-300'} rounded-full h-10 w-10 text-white flex justify-center items-center text-lg font-bold"`}>{i + 1}</span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-50 p-3">
                            <p className="text-sm">{s.step}</p>
                        </TooltipContent>
                    </Tooltip>
                    {i !== 2 && <div className="h-1 w-5 bg-gray-400"></div>}
                </div>
             ))}
            </div>
        </TooltipProvider>
    )
}