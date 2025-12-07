"use client"

import { useRef, useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqList = [
  {
    question: "How does SolidWrite work?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        SolidWrite uses advanced AI technology to analyze and transform AI-generated text into natural, human-like
        writing. Our algorithms remove robotic patterns, add natural variation, and ensure your content reads
        authentically while maintaining your original message and meaning.
      </div>
    ),
  },
  {
    question: "Which AI detectors can SolidWrite bypass?",
    answer: (
      <p>
        SolidWrite successfully bypasses all major AI detection tools including Turnitin, GPTZero, ZeroGPT,
        Originality.ai, Copyleaks, Writer.com, Content at Scale, and Sapling. Our technology is constantly updated to
        stay ahead of detection algorithms.
      </p>
    ),
  },
  {
    question: "What is the credit system?",
    answer: (
      <p>
        Credits work on a simple 1:1 basis - 1 word equals 1 credit. For example, if you humanize a 500-word essay, it
        will cost 500 credits. Your credits reset monthly based on your subscription plan.
      </p>
    ),
  },
  {
    question: "Can I use SolidWrite for academic writing?",
    answer: (
      <p>
        Yes! SolidWrite is perfect for academic essays, research papers, and reports. Our service helps make AI-assisted
        content undetectable while maintaining academic quality and integrity. Thousands of students trust SolidWrite
        for their academic work.
      </p>
    ),
  },
  {
    question: "What languages are supported?",
    answer: (
      <p>
        SolidWrite supports multilingual content humanization including English, Spanish, French, German, Italian,
        Portuguese, Dutch, and many more. Our AI technology adapts to each language&apos;s unique patterns and nuances.
      </p>
    ),
  },
  {
    question: "Can I get a refund?",
    answer: (
      <p>
        Yes! We offer a 7-day money-back guarantee. If you&apos;re not satisfied with SolidWrite for any reason, contact our
        support team within 7 days of purchase for a full refund.
      </p>
    ),
  },
  {
    question: "How long does humanization take?",
    answer: (
      <p>
        Humanization is instant! Most texts are processed in 2-5 seconds. Pro and Ultra plan users get priority
        processing for even faster results, typically under 2 seconds.
      </p>
    ),
  },
  {
    question: "Do you store my content?",
    answer: (
      <p>
        No. We prioritize your privacy and security. Your content is processed in real-time and not stored on our
        servers. Once humanization is complete, your text is immediately deleted from our system.
      </p>
    ),
  },
]

const Item = ({ item }) => {
  const accordion = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="border-b border-gray-200 last:border-0">
      <button
        className="relative flex gap-4 items-center w-full py-6 text-left group"
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(!isOpen)
        }}
        aria-expanded={isOpen}
      >
        <span className="flex-1 text-lg font-semibold text-gray-900 group-hover:text-orange-700 transition-colors">
          {item?.question}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isOpen ? "bg-orange-700 text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>

      <div
        ref={accordion}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={isOpen ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: 0 }}
      >
        <div className="pb-6 text-gray-600 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  )
}

const FAQ = () => {
  return (
    <section className="bg-white py-20 lg:py-32" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            FAQ
          </div>

          <h2 className="text-4xl lg:text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <p className="text-xl text-gray-600">Everything you need to know about SolidWrite</p>
        </div>

        {/* FAQ List */}
        <ul className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>

        {/* Contact Section */}
        {/* <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-orange-200">
            <h3 className="text-xl font-bold text-gray-900">Still have questions?</h3>
            <p className="text-gray-600">Our support team is here to help you get the most out of SolidWrite.</p>
            <a
              href="mailto:support@SolidWrite.com"
              className="px-6 py-3 bg-orange-700 hover:bg-orange-800 text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              Contact Support
            </a>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default FAQ
