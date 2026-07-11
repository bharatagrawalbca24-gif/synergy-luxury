'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const projects = [
  {
    title: "The Royal Ballroom Gala",
    location: "Leela Palace",
    category: "Indoor Grand Reception",
    img: "https://www.marriagecolours.com/wp-content/uploads/2025/10/Barath-Manimaran-Stephna-Victor-Reception-Apl-25-Leela-Palace-2.jpg"
  },
  {
    title: "Sunset Mandap Horizon",
    location: "Shelter Resort Beach",
    category: "Destination Wedding",
    img: "https://www.marriagecolours.com/wp-content/uploads/2025/10/Aishwarya-Shanthan-Wedding-Shelter-Resort-14.jpg"
  },
  {
    title: "Bespoke Pathway Entrance",
    location: "Ocean Whispers Walk",
    category: "Floral Installation",
    img: "https://www.marriagecolours.com/wp-content/uploads/2025/10/Aishwarya-Shanthan-Wedding-Shelter-Resort-1.jpg"
  },
  {
    title: "Confection Artistry",
    location: "Ravello Terrazza",
    category: "Luxury Details",
    img: "https://tuscanweddingcakes.com/wp-content/uploads/2025/07/CarusoRavelloweddingcake.jpg"
  }
]

export default function PortfolioGallery() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <span className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] block mb-3 font-light">Captured Moments</span>
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Our Luxury Portfolio</h2>
        <div className="h-[1px] w-20 bg-[#D4AF37]/60 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="group relative h-[450px] w-full overflow-hidden rounded-sm bg-[#111] border border-white/5"
          >
            {/* Image Layer */}
            <Image 
              src={project.img} 
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              unoptimized // Allows loading external demo images securely without Next.js domain config blockers
            />

            {/* Premium Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Descriptive Context Data Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[#D4AF37] text-xs uppercase tracking-widest mb-2 font-medium">
                {project.category}
              </span>
              <h3 className="font-serif text-2xl text-white mb-1 drop-shadow-sm">
                {project.title}
              </h3>
              <p className="text-white/60 text-xs tracking-wide font-light">
                {project.location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}