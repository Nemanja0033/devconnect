import React from "react";

export default function ErrorTooltip({ children }: { children: React.ReactNode}){
    return(
        <span className="text-sm text-red-500">{ children}</span>
    )
}