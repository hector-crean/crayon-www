"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import React, { useEffect, useRef, useState } from "react"
import { Tool, Toolbar } from "./toolbar"


export function CrayonCanvas() {
    const [activeTool, setActiveTool] = useState<Tool>("select")
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const onUndo = () => {}
    const onRedo = () => {}
    const canUndo = true 
    const canRedo = true 


    return (
        <div className="flex h-dvh w-dvw relative">
            <TooltipProvider>
                <div className="fixed bottom-0 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
                    <Toolbar activeTool={activeTool} setActiveTool={setActiveTool}/>
                </div>
            </TooltipProvider>
            <canvas
                ref={canvasRef}
                className="border border-gray-300 bg-slate-500 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-0"
            />
        </div>
    )
}