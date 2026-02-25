'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { MarketingCopy } from '@/lib/marketing-copy'

interface DescriptionSectionProps {
  text: MarketingCopy
}

export function DescriptionSection({ text }: DescriptionSectionProps) {
  return (
    <section id="description" className="relative overflow-hidden px-4 py-24 lg:py-32">
      <Image src="/BF_MOZ_2025-271.jpg.jpeg" alt="Ambient texture" fill className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-linear-to-b from-[#fff8f6] via-white/95 to-[#fff8f6]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#c99845]">Brutal Fruit Spritzer</p>
          <h2 className="mb-4 font-serif text-4xl italic text-[#231d22] lg:text-6xl">{text.description.title}</h2>
          <p className="mx-auto max-w-2xl text-[#4c4350] lg:text-lg">{text.description.subtitle}</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { label: 'Data | Date', value: '28 March 2026' },
            { label: 'Hora | Time', value: '12h00 - 18h00' },
            { label: 'Local | Venue', value: 'Repinga, Maputo' },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-[#eedbb7] bg-white/85 p-8 text-center shadow-lg backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-[#b1823d]">{item.label}</p>
              <p className="mt-2 font-serif text-2xl italic text-[#231d22]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
