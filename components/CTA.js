"use client"
import { Sparkles, ArrowRight } from "lucide-react"

const CTA = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 py-20 lg:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          Start Your Free Trial Today
        </div>

        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your
          <span className="block">AI Content?</span>
        </h2>

        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
          Join thousands of students, writers, and professionals who trust SolidWrite to make their AI-generated content
          undetectable and authentic.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="group px-8 py-4 bg-white text-emerald-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => (window.location.href = "/#pricing")}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
          >
            View Pricing
          </button>
        </div>


        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">50K+</div>
            <p className="text-white/80">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">10M+</div>
            <p className="text-white/80">Words Processed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">99.8%</div>
            <p className="text-white/80">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
