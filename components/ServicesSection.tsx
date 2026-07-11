'use client'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Sparkles, Camera, MapPin, Music } from 'lucide-react'

const services = [
  { title: "Destination Weddings", icon: <MapPin className="w-8 h-8 text-[#D4AF37]" /> },
  { title: "Cinematography", icon: <Camera className="w-8 h-8 text-[#D4AF37]" /> },
  { title: "Stage Design", icon: <Sparkles className="w-8 h-8 text-[#D4AF37]" /> },
  { title: "Entertainment", icon: <Music className="w-8 h-8 text-[#D4AF37]" /> },
]

function TiltCard({ service }: { service: any }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left - rect.width / 2)
    y.set(event.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="relative w-full h-80 rounded-xl bg-white/5 border border-[#D4AF37]/20 backdrop-blur-md p-8 flex flex-col justify-center items-center text-center cursor-pointer overflow-hidden group transition-colors hover:bg-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div style={{ transform: "translateZ(50px)" }} className="mb-6">
        {service.icon}
      </div>
      <h3 style={{ transform: "translateZ(30px)" }} className="font-serif text-2xl text-white">
        {service.title}
      </h3>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Our Bespoke Services</h2>
        <div className="h-[1px] w-24 bg-[#D4AF37] mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 [perspective:1000px]">
        {services.map((s, i) => (
          <TiltCard key={i} service={s} />
        ))}
      </div>
    </section>
  )
}