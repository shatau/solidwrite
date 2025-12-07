"use client"

import { useState } from "react"
import Image from "next/image"
import { FileText, Wand2, Copy, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "1",
    icon: FileText,
    title: "Paste Your Text",
    description: "Simply paste your AI-generated content into our editor. No formatting required.",
    type: "image",
    path: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Paste text illustration",
    bgColor: "bg-orange-50",
  },
  {
    number: "2",
    icon: Wand2,
    title: "Check AI Score",
    description: "See how much of your text is considered AI-generated with our detection tool.",
    type: "image",
    path: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "AI score check illustration",
    bgColor: "bg-orange-50",
  },
  {
    number: "3",
    icon: Copy,
    title: "Humanize",
    description: "Transform your text to sound 100% human-written and pass all detection tools.",
    type: "image",
    path: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Humanize text illustration",
    bgColor: "bg-orange-50",
  },
]

const StepCard = ({ step, index, isActive, onClick }) => {
  const { number, icon: Icon, title, description } = step

  return (
    <div
      className={`cursor-pointer transition-all duration-300 ${
        isActive ? "opacity-100" : "opacity-60 hover:opacity-80"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-6">
        <div
          className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            isActive ? "bg-orange-700 shadow-lg shadow-orange-500/50" : "bg-gray-100"
          }`}
        >
          <Icon className={`w-8 h-8 ${isActive ? "text-white" : "text-gray-600"}`} />
        </div>
        <div className="flex-1 pt-2">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-sm font-bold ${isActive ? "text-orange-700" : "text-gray-400"}`}>STEP {number}</span>
          </div>
          <h3
            className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
              isActive ? "text-gray-900" : "text-gray-600"
            }`}
          >
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

const Media = ({ step }) => {
  const { type, path, alt } = step

  if (type === "image") {
    return (
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        <Image
          src={path || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-cover"
          width={800}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    )
  }
  return null
}

const FeaturesAccordion = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="py-20 lg:py-12 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Simple Process
          </div>

          <h2 className="text-4xl lg:text-4xl font-bold text-gray-900 mb-6">Humanize AI Writing in 3 Simple Steps</h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Perfect for essays, assignments, blog posts and research papers
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className={`${step.bgColor} rounded-2xl p-8 border border-orange-100`}>
              <div className="mb-6">
                <span className="inline-block bg-orange-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                  STEP {step.number}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Media display */}
        {/* <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-orange-200">
            <p className="text-lg text-gray-700 font-medium">Ready to transform your content?</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-3 bg-orange-700 hover:bg-orange-800 text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              Try It Free Now
            </button>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default FeaturesAccordion
