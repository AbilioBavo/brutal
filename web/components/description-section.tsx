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

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-14 overflow-hidden rounded-[2rem] border border-[#e8d5b2]"
        >
          <Image src="/BF_MOZ_2025-50.jpg.jpeg" alt="Dress code section background" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative p-10 text-white lg:p-12">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#f3ddb3]">Brutal Style Notes</p>
            <h3 className="font-serif text-3xl italic lg:text-5xl">{text.description.dressCodeTitle}</h3>
            <p className="mt-4 max-w-3xl text-white/90 lg:text-lg">{text.description.dressCodeSubtitle}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              {text.description.dressCodeColors.map((color) => (
                <span
                  key={color}
                  className="rounded-full border border-[#edd8ad]/60 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#f6e9c6] backdrop-blur-sm"
                >
                  {color}
                </span>
              ))}
            </div>
            <p className="mt-6 inline-flex rounded-full bg-[#d2918f]/25 px-4 py-2 text-sm text-[#ffe6de]">{text.description.dressCodePaletteNote}</p>
          </div>
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
