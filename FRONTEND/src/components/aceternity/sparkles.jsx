import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

export function SparklesCore({ className, background, minSize, maxSize, speed, particleColor, particleDensity }) {
  const canvasRef = useRef(null)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const density = particleDensity || 60

    const newParticles = Array.from({ length: density }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: randomInRange(minSize || 0.5, maxSize || 1.5),
      speedX: randomInRange(-0.3, 0.3) * (speed || 1),
      speedY: randomInRange(-0.5, -0.1) * (speed || 1),
      opacity: Math.random(),
    }))
    setParticles(newParticles)

    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      newParticles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        p.opacity -= 0.003
        if (p.opacity <= 0 || p.y < 0) {
          p.x = Math.random() * canvas.offsetWidth
          p.y = canvas.offsetHeight
          p.opacity = Math.random()
        }
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.fillStyle = particleColor || "#ffffff"
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      animationId = requestAnimationFrame(animate)
    }

    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    animate()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      style={{ background: background || "transparent" }}
    />
  )
}