"use client"

import { useRef, useState } from "react"
import { Plus, Minus, MessageCircleQuestion } from "lucide-react"

const faqList = [
  {
    question: "How does SolidWrite humanize AI text?",
    answer:
      "Our advanced AI analyzes your text and rewrites it to match natural human writing patterns. We remove robotic phrases, vary sentence structure, and add authentic voice — all while preserving your original meaning.",
  },
  {
    question: "Which AI detectors does it bypass?",
    answer:
      "SolidWrite successfully bypasses all major AI detection tools including Turnitin, GPTZero, ZeroGPT, Originality.ai, Copyleaks, Writer.com, Content at Scale, and Sapling. Our technology is constantly updated to stay ahead of new detection algorithms.",
  },
  {
    question: "How fast is the humanization process?",
    answer:
      "Most texts are processed in under 3 seconds. Pro and Ultra plan users get priority processing for even faster results, typically under 2 seconds regardless of text length.",
  },
  {
    question: "Is my content stored or shared?",
    answer:
      "No. We take privacy seriously. Your content is processed in real-time and never stored on our servers. Once humanization is complete, your text is immediately deleted from our system.",
  },
  {
    question: "What languages are supported?",
    answer:
      "Currently, SolidWrite fully supports English. We're actively working on adding support for additional languages including Spanish, French, German, and Portuguese.",
  },
  {
    question: "Can I use this for academic work?",
    answer:
      "SolidWrite is designed to help make AI-assisted content read more naturally. We recommend checking your institution's policies regarding AI writing tools. Our tool helps improve readability and natural flow of any text.",
  },
]

const FaqItem = ({ item, isOpen, onToggle }) => {
  const contentRef = useRef(null)

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-6 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="flex-1 text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors pr-8">
          {item.question}
        </span>
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-blue-600 text-white rotate-0" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
          }`}
        >
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight + "px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="pb-6 text-gray-600 leading-relaxed pr-16">{item.answer}</p>
      </div>
    </div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative py-24 lg:py-32 bg-[#FAFAFA]" id="faq">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Everything you need to know about humanizing your AI content.
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10">
          {faqList.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

    

      </div>
    </section>
  )
}

export default FAQ