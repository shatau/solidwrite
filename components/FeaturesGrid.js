"use client"

import { CheckCircle2, Zap, Shield, Brain, Sparkles, Lock } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Advanced AI Technology",
    description: "Powered by cutting-edge NLP and machine learning algorithms to ensure natural, human-like output.",
  },
  {
    icon: Shield,
    title: "Undetectable Results",
    description: "Bypass all major AI detectors including Turnitin, GPTZero, ZeroGPT, and Originality.ai.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get humanized content in seconds. No waiting, instant results every time.",
  },
  {
    icon: Lock,
    title: "Privacy Focused",
    description: "Your data is encrypted and never stored. Complete confidentiality guaranteed.",
  },
  {
    icon: Sparkles,
    title: "Maintains Quality",
    description: "Preserves the original meaning and context while improving readability and flow.",
  },
  {
    icon: CheckCircle2,
    title: "100% Original",
    description: "Zero plagiarism. All content is unique and passes plagiarism detection tools.",
  },
]

const FeaturesGrid = () => {
  return (
    <section className="relative bg-white px-6 py-16 lg:py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Built on Science</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI humanizer is built on advanced research and proven technology to deliver results you can trust.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex flex-col items-start p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200/50 hover:border-orange-300 transition-colors"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-700 mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid
