"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import React, { useEffect, useRef, useState } from "react"
import { Tool, Toolbar } from "./toolbar"


export function CrayonCanvas() {
    const [activeTool, setActiveTool] = useState<Tool>("select")
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null)
    const [shapes, setShapes] = useState<Array<{ type: string; x: number; y: number; width?: number; height?: number; text?: string }>>([])
    const [selectedShape, setSelectedShape] = useState<number | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw all shapes
        shapes.forEach((shape, index) => {
            ctx.strokeStyle = index === selectedShape ? 'blue' : 'black'
            ctx.lineWidth = 2

            if (shape.type === 'rectangle') {
                ctx.strokeRect(shape.x, shape.y, shape.width || 0, shape.height || 0)
            } else if (shape.type === 'text') {
                ctx.font = '16px Arial'
                ctx.fillText(shape.text || '', shape.x, shape.y)
            }
        })
    }, [shapes, selectedShape])

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setIsDrawing(true)
        setLastPosition({ x, y })

        if (activeTool === 'select') {
            const clickedShapeIndex = shapes.findIndex(shape =>
                x >= shape.x && x <= (shape.x + (shape.width || 0)) &&
                y >= shape.y && y <= (shape.y + (shape.height || 0))
            )
            setSelectedShape(clickedShapeIndex !== -1 ? clickedShapeIndex : null)
        } else if (activeTool === 'text') {
            const text = prompt('Enter text:')
            if (text) {
                setShapes([...shapes, { type: 'text', x, y, text }])
            }
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        if (activeTool === 'pen') {
            const ctx = canvas.getContext('2d')
            if (ctx && lastPosition) {
                ctx.beginPath()
                ctx.moveTo(lastPosition.x, lastPosition.y)
                ctx.lineTo(x, y)
                ctx.stroke()
            }
        } else if (activeTool === 'shape' && lastPosition) {
            setShapes([...shapes.slice(0, -1), {
                type: 'rectangle',
                x: lastPosition.x,
                y: lastPosition.y,
                width: x - lastPosition.x,
                height: y - lastPosition.y
            }])
        } else if (activeTool === 'move' && selectedShape !== null) {
            setShapes(shapes.map((shape, index) =>
                index === selectedShape
                    ? { ...shape, x: x - (shape.width || 0) / 2, y: y - (shape.height || 0) / 2 }
                    : shape
            ))
        }

        setLastPosition({ x, y })
    }

    const handleMouseUp = () => {
        setIsDrawing(false)
        setLastPosition(null)
    }

    return (
        <div className="flex h-dvh w-dvw relative">
            <TooltipProvider>
                <div className="fixed top-1/2 left-4 -translate-y-1/2 bg-background border rounded-md shadow-md p-1.5 space-y-1.5 z-50">
                    <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
                </div>
            </TooltipProvider>
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="border border-gray-300 bg-slate-500 absolute top-0 left-0 right-0 bottom-0 w-full h-full z-0"
            />
        </div>
    )
}