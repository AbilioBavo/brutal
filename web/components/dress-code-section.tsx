'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { MarketingCopy } from '@/lib/marketing-copy'

interface DressCodeSectionProps {
  text: MarketingCopy
}

export function DressCodeSection({ text }: DressCodeSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 py-24 lg:py-28">
      <Image src="/BF_MOZ_2025-50.jpg.jpeg" alt="Dress code section background" fill className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-[#1f1920]/75 to-black/75" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl rounded-[2rem] border border-[#e9d7a4]/50 bg-[#201921]/55 p-8 text-white shadow-2xl backdrop-blur-md lg:p-12"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#f3ddb3]">Brutal Style Notes</p>
        <h3 className="font-serif text-4xl italic lg:text-5xl">{text.description.dressCodeTitle}</h3>
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
      </motion.div>
    </section>
  )
}
