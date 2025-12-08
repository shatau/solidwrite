"use client"
import { Shield, CheckCircle } from "lucide-react"

const Problem = () => {
  const detectors = [
    { name: "Turnitin", bypass: true },
    { name: "GPTZero", bypass: true },
    { name: "ZeroGPT", bypass: true },
    // { name: "Originality.ai", bypass: true },
    { name: "Copyleaks", bypass: true },
    // { name: "Writer.com", bypass: true },
    { name: "Grammarly", bypass: true },
    { name: "QuillBot", bypass: true },
  ]

  return (
    <section className="bg-white py-16 lg:py-20 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight text-slate-900">
            Bypass All Major{" "}
            <span className="text-emerald-600">AI Content Detectors</span>
          </h2>
        </div>

        {/* Detector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {detectors.map((detector, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-100 rounded-xl p-5 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center justify-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-emerald-600 transition-colors">
                  <Shield className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{detector.name}</h3>
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Bypassed</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-8 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-2xl shadow-sm">
            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent mb-2">
              99.8%
            </div>
            <p className="text-gray-900 font-medium">Success Rate</p>
            <p className="text-sm text-gray-600 mt-2">Bypass accuracy across all detectors</p>
          </div>

          <div className="text-center p-8 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-2xl shadow-sm">
            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent mb-2">
              50K+
            </div>
            <p className="text-gray-900 font-medium">Active Users</p>
            <p className="text-sm text-gray-600 mt-2">Trusted by students and professionals</p>
          </div>

          <div className="text-center p-8 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-2xl shadow-sm">
            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent mb-2">
              10M+
            </div>
            <p className="text-gray-900 font-medium">Words Humanized</p>
            <p className="text-sm text-gray-600 mt-2">Processing millions of words monthly</p>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default Problem