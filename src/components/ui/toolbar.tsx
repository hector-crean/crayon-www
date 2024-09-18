"use client"

import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MousePointer, Move, Pencil, Square, Type } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

type Tool = "select" | "move" | "text" | "shape" | "pen"

const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
    { id: "select", icon: <MousePointer className="h-4 w-4" />, label: "Select" },
    { id: "move", icon: <Move className="h-4 w-4" />, label: "Move" },
    { id: "text", icon: <Type className="h-4 w-4" />, label: "Text" },
    { id: "shape", icon: <Square className="h-4 w-4" />, label: "Shape" },
    { id: "pen", icon: <Pencil className="h-4 w-4" />, label: "Pen" },
]

interface ToolbarProps {
    activeTool: Tool;
    setActiveTool: Dispatch<SetStateAction<Tool>>
}
export function Toolbar({ activeTool, setActiveTool }: ToolbarProps) {

    return (
        <TooltipProvider>
            <div className="fixed top-1/2 left-4 -translate-y-1/2 bg-background border rounded-md shadow-md p-1.5 space-y-1.5">
                {tools.map((tool, index) => (
                    <div key={tool.id}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Toggle
                                    variant="outline"
                                    size="sm"
                                    pressed={activeTool === tool.id}
                                    onPressedChange={() => setActiveTool(tool.id)}
                                    aria-label={tool.label}

                                >
                                    {tool.icon}
                                </Toggle>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>{tool.label}</p>
                            </TooltipContent>
                        </Tooltip>
                        {index < tools.length - 1 && <Separator className="my-1.5" />}
                    </div>
                ))}
            </div>
        </TooltipProvider>
    )
}

export type { Tool }

