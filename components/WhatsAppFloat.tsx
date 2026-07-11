'use client'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  const phoneNumber = "91998815821"
  const message = encodeURIComponent("Hello Synergy Event, I want to plan my wedding.")
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow duration-300 group"
    >
      <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-50" />
      <MessageCircle size={32} />
      
      <span className="absolute right-20 bg-[#0a0a0a] border border-white/10 text-white text-sm py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-md">
        Plan Your Wedding
      </span>
    </motion.a>
  )
}