"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Data Collection",
      description:
        "Our sensors collect real-time data from multiple sources including weather stations, traffic monitors, and satellite imagery.",
      icon: "📡",
    },
    {
      title: "AI Processing",
      description:
        "Advanced machine learning algorithms analyze patterns and predict air quality changes with high accuracy.",
      icon: "🧠",
    },
    {
      title: "Forecast Generation",
      description: "The system generates detailed forecasts for the next 24-72 hours with hourly precision.",
      icon: "📊",
    },
    {
      title: "Personalized Insights",
      description:
        "You receive tailored recommendations based on your location, health profile, and planned activities.",
      icon: "📱",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-xl transition-all duration-300 ${
              activeStep === index ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-white border"
            }`}
          >
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className={`text-sm ${activeStep === index ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
              {step.description}
            </p>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                <ArrowRight
                  className={`h-6 w-6 ${activeStep === index || activeStep === index + 1 ? "text-primary" : "text-muted-foreground/30"}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${activeStep === index ? "bg-primary" : "bg-slate-300"}`}
            onClick={() => setActiveStep(index)}
          />
        ))}
      </div>
    </div>
  )
}

