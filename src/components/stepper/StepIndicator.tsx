import { StepIndicatorProps, Steps } from "@/types";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Check } from "lucide-react";

export default function StepIndicator({ step, steps, viewStep }: StepIndicatorProps){
    return(
        <TooltipProvider>
            <div className="flex justify-center items-center gap-5 mt-10">
            {steps.map((s, i) => (
                 <div className="w-full flex items-center justify-center gap-5" key={i}>
                    <Tooltip>
                        <TooltipTrigger>
                            <span onClick={() => {step > i || step === i ? viewStep(i) : null}} className={`${step === i ? 'bg-primary' : (step > i ? 'bg-primary' : 'bg-gray-400')} rounded-full h-10 w-10 text-white flex justify-center items-center text-lg font-bold"`}>{step > i ? <Check /> : i + 1}</span>
                        </TooltipTrigger>
                        <TooltipContent className="p-3">
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