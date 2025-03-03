"use client"

import { useEffect, useRef, useState } from "react"

// Air quality data points (simulated)
const airQualityData = [
  { lat: 43.25, lng: 76.95, aqi: 35, color: "#4CAF50" }, // Good
  { lat: 43.22, lng: 76.85, aqi: 75, color: "#FFC107" }, // Moderate
  { lat: 43.27, lng: 76.92, aqi: 120, color: "#FF9800" }, // Unhealthy for Sensitive Groups
  { lat: 43.23, lng: 76.91, aqi: 160, color: "#F44336" }, // Unhealthy
  { lat: 43.26, lng: 76.88, aqi: 50, color: "#4CAF50" }, // Good
  { lat: 43.24, lng: 76.93, aqi: 90, color: "#FFC107" }, // Moderate
  { lat: 43.21, lng: 76.89, aqi: 140, color: "#FF5722" }, // Unhealthy for Sensitive Groups
]

export default function AirQualityMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const animationFrameRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio
      canvas.height = canvas.clientHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Draw map background
    const drawBackground = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#0f172a")
      gradient.addColorStop(1, "#1e293b")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = "rgba(148, 163, 184, 0.1)"
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Function to draw a glowing circle
    const drawGlowingCircle = (x: number, y: number, radius: number, color: string, intensity: number, aqi: number) => {
      // Create multiple layers of glow
      for (let i = 5; i >= 0; i--) {
        const alpha = (intensity * (1 - i / 5) * 0.3).toFixed(2)
        const gradientRadius = radius * (1 + i * 0.5)

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, gradientRadius)
        gradient.addColorStop(
          0,
          `${color}${Math.floor(Number(alpha) * 255)
            .toString(16)
            .padStart(2, "0")}`,
        )
        gradient.addColorStop(1, `${color}00`)

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(x, y, gradientRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw main circle
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw AQI text
      ctx.fillStyle = "#fff"
      ctx.font = `${radius * 0.7}px Inter, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(aqi.toString(), x, y)
    }

    // Animation function
    const animate = (timestamp: number) => {
      timeRef.current = timestamp

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      drawBackground()

      // Draw data points
      airQualityData.forEach((point, index) => {
        const x = ((point.lng - 76.85) / 0.15) * canvas.clientWidth
        const y = ((43.28 - point.lat) / 0.08) * canvas.clientHeight

        // Calculate pulsing effect
        const pulseIntensity = Math.sin(timestamp / 1000 + (index * Math.PI) / 4) * 0.2 + 0.8
        const baseRadius = hoveredPoint === index ? 35 : 30

        drawGlowingCircle(x, y, baseRadius, point.color, hoveredPoint === index ? 1.2 : pulseIntensity, point.aqi)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate)

    // Handle mouse move for hover effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      let hoveredIndex = null

      airQualityData.forEach((point, index) => {
        const x = ((point.lng - 76.85) / 0.15) * canvas.clientWidth
        const y = ((43.28 - point.lat) / 0.08) * canvas.clientHeight

        const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2))

        if (distance < 30) {
          hoveredIndex = index
        }
      })

      if (hoveredIndex !== hoveredPoint) {
        setHoveredPoint(hoveredIndex)
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [hoveredPoint])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full rounded-lg" />

      {hoveredPoint !== null && (
        <div
          className="absolute bg-slate-900/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg text-sm border border-slate-700"
          style={{
            left: ((airQualityData[hoveredPoint].lng - 76.85) / 0.15) * 100 + "%",
            top: ((43.28 - airQualityData[hoveredPoint].lat) / 0.08) * 100 + "%",
            transform: "translate(-50%, -130%)",
            boxShadow: `0 0 20px 0 ${airQualityData[hoveredPoint].color}40`,
          }}
        >
          <div className="font-bold text-lg mb-1">AQI: {airQualityData[hoveredPoint].aqi}</div>
          <div className="mb-2">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs"
              style={{
                backgroundColor: `${airQualityData[hoveredPoint].color}20`,
                color: airQualityData[hoveredPoint].color,
                boxShadow: `0 0 10px 0 ${airQualityData[hoveredPoint].color}40`,
              }}
            >
              {airQualityData[hoveredPoint].aqi <= 50
                ? "Good"
                : airQualityData[hoveredPoint].aqi <= 100
                  ? "Moderate"
                  : airQualityData[hoveredPoint].aqi <= 150
                    ? "Unhealthy for Sensitive Groups"
                    : "Unhealthy"}
            </span>
          </div>
          <div className="text-xs text-slate-300">
            <div>
              Location: {airQualityData[hoveredPoint].lat.toFixed(3)}, {airQualityData[hoveredPoint].lng.toFixed(3)}
            </div>
            <div className="mt-1">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm p-4 rounded-lg border border-slate-700 shadow-lg">
        <div className="text-sm font-semibold mb-3 text-white">Air Quality Index</div>
        <div className="space-y-2.5">
          {[
            { range: "0-50", label: "Good", color: "#4CAF50" },
            { range: "51-100", label: "Moderate", color: "#FFC107" },
            { range: "101-150", label: "Unhealthy for Sensitive Groups", color: "#FF9800" },
            { range: "151+", label: "Unhealthy", color: "#F44336" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 10px 0 ${item.color}80`,
                }}
              />
              <span className="text-slate-200">
                {item.range}: {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

