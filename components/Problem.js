"use client"
import Image from "next/image"
import turnitin from "@/app/turnitin.png"
import gptzero from "@/app/gptzero.png"
import zerogpt from "@/app/zerogpt.png"
import copyleaks from "@/app/copyleaks.png"
import grammarly from "@/app/grammarly.png"
import quillbot from "@/app/quillbot.png"

const Problem = () => {
  const detectors = [
    { name: "Turnitin", logo: turnitin },
    { name: "GPTZero", logo: gptzero },
    { name: "ZeroGPT", logo: zerogpt },
    { name: "Copyleaks", logo: copyleaks },
    { name: "Grammarly", logo: grammarly },
    { name: "QuillBot", logo: quillbot },
  ]

  // Duplicate for infinite scroll effect
  const allDetectors = [...detectors, ...detectors]

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAFAFA] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Proven Results
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Bypass All Major AI Detectors
          </h2>
        </div>

        {/* Animated logo carousel */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll gap-16 py-8">
              {allDetectors.map((detector, index) => (
                <div
                  key={`${detector.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center w-40 h-16   transition-all duration-300"
                >
                  <Image
                    src={detector.logo}
                    alt={`${detector.name} logo`}
                    width={1600}
                    height={48}
                    className="object-contain max-h-12"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "99.2%", label: "Success Rate" },
            { value: "1M+", label: "Texts Humanized" },
            { value: "50K+", label: "Happy Users" },
            { value: "<3s", label: "Avg Processing" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default Problem