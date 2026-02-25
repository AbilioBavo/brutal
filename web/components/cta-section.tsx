'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface CtaSectionProps {
  onRsvpClick?: () => void
}

export function CtaSection({ onRsvpClick }: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 py-28 lg:py-40">
      <div className="absolute inset-0 bg-linear-to-b from-white via-pink-50/20 to-white"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-pink-600 via-pink-500 to-rose-500 p-14 text-center text-white shadow-[0_20px_60px_rgba(236,72,153,0.35)] lg:p-20"
      >
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23fff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1.5\'/%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>

        <div className="relative">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-pink-200">
            Garanta a sua presença
          </p>
          <h3 className="mb-6 font-serif text-4xl font-light italic lg:text-6xl">
            Secure Your Spot
          </h3>

          <div className="mx-auto mb-8 h-px w-24 bg-white/30"></div>

          <p className="mx-auto mb-4 max-w-xl text-xl font-light leading-relaxed text-white/95 lg:text-2xl">
            Confirma já a tua presença
          </p>
          <p className="mx-auto mb-12 max-w-md text-base text-white/80">
            Faz o teu RSVP aqui para garantir o teu lugar à mesa
          </p>

          <Button
            size="lg"
            onClick={onRsvpClick}
            className="border-2 border-white/80 bg-white px-14 py-7 font-serif text-xl font-light italic tracking-wide text-pink-600 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/95 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
          >
            Fazer RSVP
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
