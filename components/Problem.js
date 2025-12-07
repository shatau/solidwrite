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
    <section className=" bg-white py-20 lg:py-10">
      <div className="max-w-8xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 bg-orange-200 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Industry-Leading Detection Bypass
          </div> */}

          <h2 className="text-4xl lg:text-3xl font-bold mb-6 leading-tight text-gray-900">
            Bypass All Major
            <span className="block bg-gradient-to-r from-orange-700 to-orange-600 bg-clip-text text-transparent">
              AI Content Detectors
            </span>
          </h2>

          {/* <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our advanced humanization technology ensures your content passes through all popular AI detection tools with
            flying colors.
          </p> */}
        </div>

        {/* Detector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-8xl mx-auto">
                    {detectors.map((detector, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl p-6 hover:bg-white transition-all duration-300 group shadow-sm"
            >
              <div className="flex flex-col items-center text-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{detector.name}</h3>
                <div className="flex items-center gap-2 text-orange-700 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Bypassed</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-8 bg-white/70 backdrop-blur-sm border border-orange-200 rounded-2xl shadow-sm">
            <div className="text-5xl font-bold bg-gradient-to-r from-orange-700 to-orange-600 bg-clip-text text-transparent mb-2">
              99.8%
            </div>
            <p className="text-gray-900 font-medium">Success Rate</p>
            <p className="text-sm text-gray-600 mt-2">Bypass accuracy across all detectors</p>
          </div>

          <div className="text-center p-8 bg-white/70 backdrop-blur-sm border border-orange-200 rounded-2xl shadow-sm">
            <div className="text-5xl font-bold bg-gradient-to-r from-orange-700 to-orange-600 bg-clip-text text-transparent mb-2">
              50K+
            </div>
            <p className="text-gray-900 font-medium">Active Users</p>
            <p className="text-sm text-gray-600 mt-2">Trusted by students and professionals</p>
          </div>

          <div className="text-center p-8 bg-white/70 backdrop-blur-sm border border-orange-200 rounded-2xl shadow-sm">
            <div className="text-5xl font-bold bg-gradient-to-r from-orange-700 to-orange-600 bg-clip-text text-transparent mb-2">
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
