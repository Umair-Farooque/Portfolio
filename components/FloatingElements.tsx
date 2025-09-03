"use client"

import { useEffect, useState } from "react"

interface FloatingShape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  opacity: number
}

export function FloatingElements() {
  const [shapes, setShapes] = useState<FloatingShape[]>([])

  useEffect(() => {
    // Create floating geometric shapes
    const newShapes: FloatingShape[] = []
    for (let i = 0; i < 8; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * 360,
        speed: Math.random() * 20 + 10,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }
    setShapes(newShapes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute animate-float"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            animationDuration: `${shape.speed}s`,
            animationDelay: `${shape.id * 2}s`,
          }}
        >
          {/* Triangular shapes */}
          <div
            className="border border-cyan-400/20"
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              transform: `rotate(${shape.rotation}deg)`,
              opacity: shape.opacity,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              background: "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))",
            }}
          />
        </div>
      ))}
    </div>
  )
}
