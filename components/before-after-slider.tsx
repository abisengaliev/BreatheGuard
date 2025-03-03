"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return

    let clientX: number

    if ("touches" in e) {
      clientX = e.touches[0].clientX
    } else {
      clientX = e.clientX
    }

    const rect = containerRef.current.getBoundingClientRect()
    const position = ((clientX - rect.left) / rect.width) * 100

    setSliderPosition(Math.min(Math.max(position, 0), 100))
  }

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false
    }
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchend", handleMouseUp)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-ew-resize"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* Clean Air Image (After) */}
      <div className="absolute inset-0 w-full h-full">
        <Image src="/placeholder.svg?height=400&width=600" alt="Clean air city view" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="px-4 py-2 bg-green-500/80 text-white rounded-full text-sm font-medium">Clean Air</span>
        </div>
      </div>

      {/* Polluted Air Image (Before) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
        <Image
          src="/placeholder.svg?height=400&width=600"
          alt="Polluted air city view"
          fill
          className="object-cover filter brightness-75 contrast-125 saturate-50"
        />
        <div className="absolute inset-0 bg-slate-500/30 flex items-center justify-center">
          <span className="px-4 py-2 bg-red-500/80 text-white rounded-full text-sm font-medium">Polluted Air</span>
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full"></div>
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

