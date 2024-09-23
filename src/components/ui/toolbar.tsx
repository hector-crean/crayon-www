"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BoxSelect, HandIcon, ZoomIn, PencilIcon, ShapesIcon, TypeIcon, UndoIcon, RedoIcon, ImageIcon, LayersIcon, EyeIcon, DownloadIcon } from 'lucide-react'

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
        <div className="flex items-center space-x-2 bg-primary  rounded-2xl shadow-md p-1.5 space-y-1.5 px-2">
          {tools.map((tool) => (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTool === tool.id ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setActiveTool(tool.id)}
                  aria-label={tool.label}
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