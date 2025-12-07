import Image from "next/image"

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
      <figure className="relative h-full p-8 bg-white rounded-xl border border-gray-200 hover:border-orange-200 hover:shadow-lg transition-all flex flex-col">
        {/* Quote */}
        <blockquote className="relative flex-1 mb-6">
          <p className="text-gray-700 leading-relaxed text-base">"{testimonial.text}"</p>
        </blockquote>

        {/* Author */}
        <figcaption className="flex items-center gap-4 pt-6 border-t border-gray-100">
          <div className="flex-shrink-0">
            {testimonial.img ? (
              <Image
                className="w-12 h-12 rounded-full object-cover"
                src={testimonial.img || "/placeholder.svg"}
                alt={testimonial.name}
                width={48}
                height={48}
              />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-100 text-orange-700 font-semibold">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{testimonial.name}</div>
            {testimonial.username && <div className="text-sm text-gray-600">@{testimonial.username}</div>}
          </div>
        </figcaption>
      </figure>
    </li>
  )
}

const Testimonials3 = () => {
  return (
    <section id="testimonials" className="relative bg-gradient-to-b from-white to-orange-50 px-6 py-16 lg:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Trusted by thousands</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">See what users are saying about their results.</p>
        </div>

        {/* Testimonials Grid */}
        <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((e, i) => (
            <Testimonial key={i} i={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Testimonials3
