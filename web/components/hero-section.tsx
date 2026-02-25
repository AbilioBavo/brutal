'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function HeroSection() {
  const scrollToDescription = () => {
    const descriptionSection = document.getElementById('description')
    descriptionSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <Image
          src="/BF_MOZ_2025-86.jpg.jpeg"
          alt="Pink Table Event Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Vignette Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-20 text-center lg:pb-32">
        <div className="max-w-4xl space-y-6">
          {/* Title with emoji */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl font-bold text-white drop-shadow-lg lg:text-7xl"
          >
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-2xl font-light italic tracking-wide text-pink-200 drop-shadow-md lg:text-4xl"
          >
            💗 Hey Bestie… The Pink Table is Back 💗
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mx-auto max-w-2xl text-lg text-white/95 drop-shadow-md lg:text-xl"
          >
            A nossa mesa favorita está de volta — mais feminina, mais vibrante e pronta para um brunch inesquecível.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="pt-4"
          >
            <Button
              onClick={scrollToDescription}
              size="lg"
              className="bg-pink-600 px-8 py-6 text-lg font-semibold text-white shadow-2xl transition-transform hover:scale-105 hover:bg-pink-700"
            >
              Descubra Mais
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
