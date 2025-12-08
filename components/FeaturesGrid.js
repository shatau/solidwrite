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
    <section className="relative bg-white px-6 py-20 lg:py-28 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-50 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Built on Science
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why Writers Trust SolidWrite</h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Our AI humanizer is built on advanced research and proven technology to deliver results you can trust.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group flex flex-col items-start p-6 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-100 text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid