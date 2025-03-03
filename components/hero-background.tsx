"use client"

import { useEffect, useRef } from "react"

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // City skyline parameters
    const skylineHeight = canvas.height * 0.3
    const buildingCount = Math.floor(canvas.width / 40)
    const buildings: { x: number; width: number; height: number; windows: { x: number; y: number; lit: boolean }[] }[] =
      []

    // Generate random buildings
    for (let i = 0; i < buildingCount; i++) {
      const width = Math.random() * 60 + 30
      const height = Math.random() * 150 + 50
      const x = i * (canvas.width / buildingCount)

      // Generate windows for each building
      const windows = []
      const windowRows = Math.floor(height / 15)
      const windowCols = Math.floor(width / 15)

      for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowCols; col++) {
          if (Math.random() > 0.3) {
            // 70% chance of having a window
            windows.push({
              x: col * 15 + 5,
              y: row * 15 + 5,
              lit: Math.random() > 0.5, // 50% chance of being lit
            })
          }
        }
      }

      buildings.push({ x, width, height, windows })
    }

    // Particles for air pollution
    const particleCount = 200
    const particles: { x: number; y: number; radius: number; speed: number; opacity: number }[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    // Animation variables
    let pollutionLevel = 0
    let pollutionDirection = 0.001
    let frame = 0

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient sky background
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      skyGradient.addColorStop(0, `rgba(25, 25, 112, ${1 - pollutionLevel * 0.5})`) // Midnight Blue
      skyGradient.addColorStop(0.5, `rgba(70, 130, 180, ${1 - pollutionLevel * 0.7})`) // Steel Blue
      skyGradient.addColorStop(1, `rgba(135, 206, 235, ${1 - pollutionLevel * 0.9})`) // Sky Blue

      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw pollution overlay
      ctx.fillStyle = `rgba(169, 169, 169, ${pollutionLevel * 0.7})` // Gray pollution
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw buildings
      buildings.forEach((building) => {
        // Building
        ctx.fillStyle = `rgba(30, 30, 40, 0.9)`
        ctx.fillRect(building.x, canvas.height - building.height, building.width, building.height)

        // Windows
        building.windows.forEach((window) => {
          if (window.lit) {
            ctx.fillStyle = `rgba(255, 255, 150, ${0.7 - pollutionLevel * 0.5})`
          } else {
            ctx.fillStyle = `rgba(50, 50, 60, 0.8)`
          }
          ctx.fillRect(building.x + window.x, canvas.height - building.height + window.y, 8, 8)
        })
      })

      // Draw particles (pollution)
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(169, 169, 169, ${particle.opacity * pollutionLevel})`
        ctx.fill()

        // Move particles
        particle.y += particle.speed
        if (particle.y > canvas.height) {
          particle.y = 0
          particle.x = Math.random() * canvas.width
        }
      })

      // Update pollution level
      if (frame % 60 === 0) {
        // Change direction occasionally
        if (Math.random() > 0.7) {
          pollutionDirection = -pollutionDirection
        }
      }

      pollutionLevel += pollutionDirection

      // Keep pollution level between 0 and 1
      if (pollutionLevel > 0.8) {
        pollutionDirection = -Math.abs(pollutionDirection)
      } else if (pollutionLevel < 0.1) {
        pollutionDirection = Math.abs(pollutionDirection)
      }

      frame++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
    </>
  )
}

