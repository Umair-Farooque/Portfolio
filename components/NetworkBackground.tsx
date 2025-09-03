"use client"

import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createNodes = () => {
      const nodeCount = Math.floor((window.innerWidth * window.innerHeight) / 15000)
      nodesRef.current = []

      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: [],
        })
      }

      // Create connections
      nodesRef.current.forEach((node, i) => {
        const maxConnections = 3
        let connectionCount = 0

        nodesRef.current.forEach((otherNode, j) => {
          if (i !== j && connectionCount < maxConnections) {
            const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2))
            if (distance < 150) {
              node.connections.push(j)
              connectionCount++
            }
          }
        })
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodesRef.current.forEach((node, i) => {
        // Mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(node.x - mouseRef.current.x, 2) + Math.pow(node.y - mouseRef.current.y, 2),
        )

        if (mouseDistance < 100) {
          const force = (100 - mouseDistance) / 100
          const angle = Math.atan2(node.y - mouseRef.current.y, node.x - mouseRef.current.x)
          node.vx += Math.cos(angle) * force * 0.02
          node.vy += Math.sin(angle) * force * 0.02
        }

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Boundary collision
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))

        // Draw connections
        node.connections.forEach((connectionIndex) => {
          const connectedNode = nodesRef.current[connectionIndex]
          if (connectedNode) {
            const distance = Math.sqrt(Math.pow(node.x - connectedNode.x, 2) + Math.pow(node.y - connectedNode.y, 2))
            const opacity = Math.max(0, 1 - distance / 150)

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connectedNode.x, connectedNode.y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.3})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

        // Draw node
        const nodeOpacity = mouseDistance < 100 ? 1 : 0.6
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${nodeOpacity})`
        ctx.fill()

        // Glow effect
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${nodeOpacity * 0.2})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      resizeCanvas()
      createNodes()
    }

    resizeCanvas()
    createNodes()
    animate()

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
