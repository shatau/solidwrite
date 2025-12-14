"use client"
import { useState } from "react"
import { Sparkles, Clipboard, Loader2, Check, ArrowRight, Shield, Zap, Users } from "lucide-react"
import config from "@/config"

const Hero = () => {
  const [text, setText] = useState("")
  const [isDetecting, setIsDetecting] = useState(false)
  const [detectionResult, setDetectionResult] = useState(null)
  const [error, setError] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const maxWords = 500

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
      setDetectionResult(null)
      setError(null)
    } catch (err) {
      console.error("Failed to read clipboard:", err)
    }
  }

  const handleDetect = async () => {
    if (!text.trim() || wordCount > maxWords) return

    setIsDetecting(true)
    setError(null)
    setDetectionResult(null)
    setShowResults(true)

    try {
      const response = await fetch("/api/detect-500", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setError("Rate limit exceeded. Please try again later or sign up for unlimited checks.")
        } else {
          setError(data.error || "Detection failed")
        }
        setShowResults(false)
        return
      }

      setDetectionResult(data)
    } catch (err) {
      setError("Network error. Please try again.")
      console.error("Detection error:", err)
      setShowResults(false)
    } finally {
      setIsDetecting(false)
    }
  }

  const handleHumanize = () => {
    window.location.href = "/dashboard"
  }

  const handleReset = () => {
    setText("")
    setDetectionResult(null)
    setError(null)
    setShowResults(false)
  }

  const stats = [
    { value: "50K+", label: "Active Users", icon: Users },
    { value: "99.2%", label: "Success Rate", icon: Shield },
    { value: "<3s", label: "Processing", icon: Zap },
  ]

  // Single column view (no results)
  if (!showResults) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#F5F5F5]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Gradient orbs */}
<div className="absolute top-0 left-0 w-[600px] h-[800px] bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl" />
<div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-purple-200/50 to-blue-100/50 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-20 lg:pb-28">
          <div className="flex flex-col items-center text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-transparent border  border-blue-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm text-gray-800">
                Join <span className="font-semibold text-gray-800">40,000+</span> writers worldwide
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-gray-900 max-w-5xl leading-[1.1]">
              Make AI Text Sound
              <span className="relative mx-3">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Human
                </span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-200" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-8 text-lg text-gray-600 max-w-2xl leading-relaxed">
              Transform AI-generated content into natural, authentic writing that bypasses all major AI detectors — instantly.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="group px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl text-lg font-semibold transition-all shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 flex items-center justify-center gap-2"
              >
               Try for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* <a
                href="#how-it-works"
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-2xl text-lg font-semibold transition-all border border-gray-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                See How It Works
              </a> */}
            </div>



            {/* Demo Card */}
            <div className="w-full max-w-5xl mt-16">
              <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/60 border border-gray-300 overflow-hidden">
                {/* Card header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                  <div className="flex items-center gap-3">

                    <span className="text-sm font-medium text-gray-600">Your Text</span>
                  </div>
                  <button
                    onClick={handlePaste}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Clipboard className="w-4 h-4" />
                    Paste
                  </button>
                </div>

                {/* Textarea */}
                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value)
                    setDetectionResult(null)
                    setError(null)
                  }}
                  placeholder="Paste your AI-generated text here to check or humanize it..."
                  className="w-full resize-none p-6 text-gray-800 text-base leading-relaxed focus:outline-none bg-white min-h-[350px] placeholder:text-gray-400"
                />

                {/* Card footer */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                  <span className={`text-sm font-medium ${wordCount > maxWords ? "text-red-500" : "text-gray-500"}`}>
                    {wordCount.toLocaleString()} / {maxWords.toLocaleString()} words
                  </span>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={handleDetect}
                      disabled={!text.trim() || wordCount > maxWords || isDetecting}
                      className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      {isDetecting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4" />
                          Check AI Score
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleHumanize}
                      disabled={!text.trim() || wordCount > maxWords}
                      className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20"
                    >
                      <Sparkles className="w-4 h-4" />
                      Humanize
                    </button>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
              )}
            </div>

            {/* Stats */}
            {/* <div className="flex flex-wrap justify-center gap-8 mt-16">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div> */}

            {/* Trust indicators */}
            {/* <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-12 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Bypasses All Detectors</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Preserves Original Meaning</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>No Credit Card Required</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    )
  }

  // Two column layout with results
  return (
   <section className="relative overflow-hidden bg-[#F5F5F5] pt-28 pb-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-200/60 to-purple-200/60 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            Make AI Text Sound <span className="text-blue-600">Human</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Transform AI-generated content into natural, authentic writing.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left - Input */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <span className="text-sm font-semibold text-gray-900">Your Text</span>
              <button
                onClick={handlePaste}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Clipboard className="w-4 h-4" />
              </button>
            </div>

            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                setDetectionResult(null)
                setError(null)
              }}
              placeholder="Paste your text here..."
              className="w-full resize-none p-6 text-gray-800 text-base focus:outline-none min-h-[350px] placeholder:text-gray-400"
            />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <span className={`text-sm font-medium ${wordCount > maxWords ? "text-red-500" : "text-gray-500"}`}>
                {wordCount} / {maxWords} words
              </span>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleDetect}
                  disabled={!text.trim() || wordCount > maxWords || isDetecting}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                >
                  {isDetecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                  {isDetecting ? "Checking..." : "Check AI"}
                </button>
                <button
                  onClick={handleHumanize}
                  disabled={!text.trim() || wordCount > maxWords}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Humanize
                </button>
              </div>
            </div>
          </div>

          {/* Right - Results */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <span className="text-sm font-semibold text-gray-900">Detection Results</span>
            </div>

            <div className="p-6 min-h-[350px] flex flex-col">
              {/* Error */}
              {error && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <p className="text-red-500 font-medium text-center">{error}</p>
                  <button onClick={handleReset} className="mt-4 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    Try Again
                  </button>
                </div>
              )}

              {/* Loading */}
              {!detectionResult && !error && isDetecting && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-100 border-t-blue-500 animate-spin mb-4" />
                  <p className="text-gray-500 font-medium">Analyzing your text...</p>
                </div>
              )}

              {/* Results */}
              {detectionResult && !error && (
                <div className="flex-1 flex flex-col">
                  {/* Score */}
                  <div className="text-center py-8">
                    <div className="text-7xl font-bold text-gray-900 mb-2">{Math.round(100 - detectionResult.score)}%</div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Human Score</div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden mb-6">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500 transition-all duration-700"
                      style={{ width: `${Math.round(100 - detectionResult.score)}%` }}
                    />
                  </div>

                  {/* Detector badges */}
                  {detectionResult.details && (
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {Object.entries(detectionResult.details).map(([detector, humanScore]) => {
                        const passed = humanScore >= 60
                        return (
                          <div
                            key={detector}
                            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg ${passed ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                              }`}
                          >
                            <span>{passed ? "✓" : "✗"}</span>
                            <span className="font-medium">{detector}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <div className="mt-auto">
                    <button
                      onClick={handleReset}
                      className="w-full py-3 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      Start New Check
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-12 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>Bypasses All Detectors</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>Natural Writing Style</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span>Instant Results</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero