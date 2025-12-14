"use client"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Emily Chen",
    role: "Graduate Student",
    avatar: "EC",
    rating: 5,
    text: "This tool saved my thesis. My advisor was impressed by how naturally my research flowed. The humanized text passed Turnitin with flying colors.",
    highlight: "Passed Turnitin perfectly",
  },
  {
    name: "Marcus Williams",
    role: "Content Writer",
    avatar: "MW",
    rating: 5,
    text: "As a freelancer, I use AI to draft content but needed it to sound authentic. This tool transformed my workflow completely. Clients love the results.",
    highlight: "Transformed my workflow",
  },
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    avatar: "SJ",
    rating: 5,
    text: "We produce dozens of blog posts weekly. This tool ensures every piece reads naturally while maintaining our brand voice. Absolute game-changer.",
    highlight: "Game-changer for our team",
  },
  {
    name: "Daniel Park",
    role: "PhD Researcher",
    avatar: "DP",
    rating: 5,
    text: "I was skeptical at first, but the quality exceeded my expectations. It doesn&apos;t just rewrite — it preserves my academic tone while making it undetectable.",
    highlight: "Preserves academic tone",
  },
  {
    name: "Lisa Rodriguez",
    role: "Blogger",
    avatar: "LR",
    rating: 5,
    text: "Finally, a tool that actually works. My content passes every AI detector I&apos;ve tried. The interface is intuitive and results are instant.",
    highlight: "Works every time",
  },
  {
    name: "James Mitchell",
    role: "Business Owner",
    avatar: "JM",
    rating: 5,
    text: "Worth every penny. We use it for all our website copy, emails, and marketing materials. The ROI has been incredible.",
    highlight: "Incredible ROI",
  },
]

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="group relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-500">
      {/* Quote icon */}
      <div className="absolute top-6 right-6 opacity-10">
        <Quote className="w-12 h-12 text-gray-900" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Highlight badge */}
      <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
        {testimonial.highlight}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 leading-relaxed mb-8">
        &quot;{testimonial.text}&quot;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-sm font-bold text-gray-600">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-sm text-gray-500">{testimonial.role}</div>
        </div>
      </div>
    </div>
  )
}

const Testimonials3 = () => {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32 bg-[#FAFAFA] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Loved by 50,000+ Writers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See why students, professionals, and content creators trust us with their most important work.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </div>

        {/* Trust bar */}
        {/* <div className="mt-20 text-center">
          <p className="text-sm text-gray-500 mb-6">Trusted by writers at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-50">
            {["Harvard", "Stanford", "MIT", "Oxford", "Yale"].map((uni) => (
              <span key={uni} className="text-xl font-bold text-gray-400">
                {uni}
              </span>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default Testimonials3