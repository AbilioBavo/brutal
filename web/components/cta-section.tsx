'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import type { MarketingCopy } from '@/lib/marketing-copy'

interface CtaSectionProps {
  text: MarketingCopy
}

export function CtaSection({ text }: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 py-24 lg:py-32">
      <Image src="/BF_MOZ_2025-36.jpg.jpeg" alt="Pink background" fill className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-black/55" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-4xl rounded-[2rem] border border-[#e9d7a4]/60 bg-[#241f24]/75 p-12 text-center text-white shadow-2xl backdrop-blur"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#e9d7a4]">{text.cta.badge}</p>
        <h3 className="mb-4 font-serif text-4xl italic lg:text-5xl">{text.cta.title}</h3>
        <p className="mx-auto mb-8 max-w-xl text-white/85">{text.cta.description}</p>
        <Button asChild className="bg-[#d2918f] px-8 text-white hover:bg-[#bf7e7b]">
          <Link href="/rsvp">{text.cta.button}</Link>
        </Button>
      </motion.div>
    </section>
  )
}
