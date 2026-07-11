'use client'
import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Environment } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

// 3D Luxury Mandap & Cinematic Atmosphere
function WeddingScene() {
  const mandapRef = useRef<THREE.Group>(null)
  const petalsRef = useRef<THREE.Points>(null)
  
  // Create 200 falling rose petals
  const count = 200
  const positions = new Float32Array(count * 3)
  const speeds = new Float32Array(count)
  
  for(let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10 // X
    positions[i * 3 + 1] = Math.random() * 5 + 2  // Y (Start high)
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 // Z
    speeds[i] = Math.random() * 0.02 + 0.01        // Fall speed
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Smooth camera mouse parallax
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, (state.mouse.x * 3), 0.03)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + (state.mouse.y * 1.5), 0.03)
    state.camera.lookAt(0, 0.5, 0)

    // Rotate Mandap Pillars slowly
    if (mandapRef.current) {
      mandapRef.current.rotation.y = time * 0.05
    }

    // Animate swirling rose petals
    if (petalsRef.current) {
      const geo = petalsRef.current.geometry
      const posAttr = geo.attributes.position
      
      for(let i = 0; i < count; i++) {
        let y = posAttr.getY(i)
        let x = posAttr.getX(i)
        
        y -= speeds[i] // Fall down
        x += Math.sin(time + i) * 0.005 // Sway gently
        
        // Reset petal to top if it goes below floor
        if (y < -2) {
          y = 5
          x = (Math.random() - 0.5) * 10
        }
        
        posAttr.setY(i, y)
        posAttr.setX(i, x)
      }
      posAttr.needsUpdate = true
      petalsRef.current.rotation.y = time * 0.02
    }
  })

  return (
    <>
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.4} />
      {/* Warm Golden Sunlight streaming down */}
      <directionalLight position={[5, 8, 5]} intensity={2.5} color="#FFDF73" castShadow />
      {/* Sacred Fire (Havan Kund) Glow from center floor */}
      <pointLight position={[0, -0.8, 0]} intensity={4} distance={6} color="#FF5500" />

      {/* 3D Mandap Architectural Structure */}
      <group ref={mandapRef}>
        {/* Mandap Floor Base */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[3.5, 3.8, 0.2, 8]} />
          <meshStandardMaterial color="#1a120b" roughness={0.6} metalness={0.8} />
        </mesh>

        {/* The Sacred Agni (Fire Ceremony Core) */}
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[0.8, 0.2, 0.8]} />
          <meshStandardMaterial color="#AA7C11" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Glowing Royal Pillars (4 Pillars Arrangement) */}
        {[[-2.2, -2.2], [-2.2, 2.2], [2.2, -2.2], [2.2, 2.2]].map((pos, idx) => (
          <mesh key={idx} position={[pos[0], 1, pos[1]]}>
            <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
            <meshStandardMaterial 
              color="#D4AF37" 
              emissive="#AA7C11"
              emissiveIntensity={0.3}
              metalness={0.9} 
              roughness={0.1} 
            />
          </mesh>
        ))}

        {/* Mandap Luxury Roof Canopy Ring */}
        <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.1, 16, 100]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Floating Golden Sparks atmosphere */}
      <Sparkles count={300} scale={8} size={2.5} speed={0.4} opacity={0.6} color="#D4AF37" />

      {/* Swirling Crimson Rose Petals System */}
      <points ref={petalsRef}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            args={[positions, 3]} 
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#8B0000" 
          size={0.12} 
          transparent 
          opacity={0.8} 
          depthWrite={false}
        />
      </points>

      <Environment preset="sunset" />
    </>
  )
}

export default function HeroScene() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0d0702]">
      {/* 3D Wedding Canvas Engine */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1.5, 7], fov: 45 }}>
          <WeddingScene />
        </Canvas>
        {/* Soft, dark gradient vignette overlay for luxury depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0d0702]/80 pointer-events-none" />
      </div>

      {/* Cinematic Intro Preloader Sequence */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.8, ease: "easeInOut" } }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <motion.h1 
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.8, duration: 2 }}
              className="font-serif text-4xl md:text-6xl text-[#D4AF37] mb-4 tracking-widest text-center uppercase"
            >
              Synergy Event
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 1.8, duration: 1.5 }}
              className="h-[1px] bg-[#D4AF37]/50 mb-4"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 2.6, duration: 1.5 }}
              className="text-white tracking-[0.4em] text-[10px] md:text-xs uppercase text-center px-4 font-light"
            >
              Crafting Timeless Wedding Memories
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Hero Content Layer */}
      {!loading && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-8xl text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] leading-[1.15]"
          >
            Where Dreams <br/> <span className="text-[#D4AF37] italic font-normal">Become Forever</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-xs md:text-base text-white/70 max-w-2xl font-light tracking-[0.2em] uppercase mb-12 drop-shadow"
          >
            Luxury Wedding Planning &bull; Royal Celebrations &bull; Destination Masterpieces
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 pointer-events-auto"
          >
            <button className="px-9 py-4 bg-[#AA7C11] text-white rounded-none uppercase tracking-[0.2em] text-xs font-semibold hover:bg-[#D4AF37] transition-all duration-300 shadow-[0_4px_20px_rgba(170,124,17,0.4)] hover:tracking-[0.25em]">
              Book Your Wedding
            </button>
            <button className="px-9 py-4 border border-[#D4AF37]/40 text-white rounded-none uppercase tracking-[0.2em] text-xs font-semibold hover:bg-white/5 transition-all duration-300 backdrop-blur-md hover:border-[#D4AF37]">
              View Portfolio
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}