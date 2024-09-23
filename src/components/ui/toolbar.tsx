"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BoxSelect, HandIcon, ImageIcon, PencilIcon, ShapesIcon, TypeIcon, ZoomIn } from 'lucide-react'
import React from 'react'

type Tool = "select" | "hand" | "zoom" | "draw" | "shape" | "text" | "image"

const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
  { id: "select", icon: <BoxSelect className="h-4 w-4" />, label: "Select" },
  { id: "hand", icon: <HandIcon className="h-4 w-4" />, label: "Pan" },
  { id: "zoom", icon: <ZoomIn className="h-4 w-4" />, label: "Zoom" },
  { id: "draw", icon: <PencilIcon className="h-4 w-4" />, label: "Draw" },
  { id: "shape", icon: <ShapesIcon className="h-4 w-4" />, label: "Shape" },
  { id: "text", icon: <TypeIcon className="h-4 w-4" />, label: "Text" },
  { id: "image", icon: <ImageIcon className="h-4 w-4" />, label: "Image" },
]

interface ToolbarProps {
  activeTool: Tool
  setActiveTool: React.Dispatch<React.SetStateAction<Tool>>
}

export function Toolbar({ activeTool, setActiveTool }: ToolbarProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2 bg-primary text-primary-foreground rounded-2xl shadow-md p-1.5 px-2">
        {tools.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === tool.id ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setActiveTool(tool.id)}
                aria-label={tool.label}
                className={`flex items-center justify-center ${activeTool === tool.id ? "bg-secondary text-secondary-foreground" : "bg-transparent text-foreground"}`}
              >
                {tool.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tool.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export type { Tool }

