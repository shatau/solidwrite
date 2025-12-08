import Image from "next/image"
import { Star } from "lucide-react"

const list = [
  {
    username: "alex",
    name: "Alex Anderson",
    text: "This is amazing. My content passes all detection tools and reads like it was written by a native speaker. Worth every penny.",
  
  },
  {
    username: "james",
    name: "James Mitchell",
    text: "Humanized text passed every detector test I tried. Pretty cool.",
   
  },
  {
    username: "lisa",
    name: "Lisa",
    text: "This tool saved my assignment. My professor couldn't tell the difference. The text flows naturally and sounds like I actually wrote it.",
   
  },
]

const Testimonial = ({ i }) => {
  const testimonial = list[i]

  if (!testimonial) return null

  return (
    <li key={i}>
      <figure className="relative h-full p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="relative flex-1 mb-6">
          <p className="text-slate-600 leading-relaxed text-sm">&quot;{testimonial.text}&quot;</p>
        </blockquote>

        {/* Author */}
        <figcaption className="flex items-center gap-3 pt-5 border-t border-slate-100">
          <div className="flex-shrink-0">
            {testimonial.img ? (
              <Image
                className="w-10 h-10 rounded-full object-cover"
                src={testimonial.img || "/placeholder.svg"}
                alt={testimonial.name}
                width={40}
                height={40}
              />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-600 font-semibold text-sm">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-slate-900 text-sm">{testimonial.name}</div>
            {testimonial.username && <div className="text-xs text-slate-500">@{testimonial.username}</div>}
          </div>
        </figcaption>
      </figure>
    </li>
  )
}

const Testimonials3 = () => {
  return (
    <section id="testimonials" className="relative bg-slate-50 px-6 py-20 lg:py-28">
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Trusted by thousands</h2>
          <p className="text-slate-600 max-w-xl mx-auto">See what users are saying about their results.</p>
        </div>

        {/* Testimonials Grid */}
        <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((e, i) => (
            <Testimonial key={i} i={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Testimonials3