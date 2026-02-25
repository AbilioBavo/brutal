'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import type { Locale, MarketingCopy } from '@/lib/marketing-copy'
import { LanguageToggle } from '@/components/language-toggle'

interface HeroSectionProps {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  text: MarketingCopy
}

export function HeroSection({ locale, onLocaleChange, text }: HeroSectionProps) {
  const scrollToDescription = () => {
    document.getElementById('description')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/BF_MOZ_2025-86.jpg.jpeg" alt="Brutal Fruit event" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/45 to-black/70" />

      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col px-4">
        <header className="mt-5 flex items-center justify-between rounded-full border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Image src="/brutal-fruit-logo.svg" alt="Brutal Fruit logo" width={52} height={52} className="rounded-full" />
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#e9d7a4]">{text.nav.event}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle locale={locale} onChange={onLocaleChange} />
            <Button asChild className="hidden bg-[#d2918f] text-white hover:bg-[#c17f7c] sm:inline-flex">
              <Link href="/rsvp">{text.nav.rsvp}</Link>
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col items-start justify-center gap-6 text-white">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.35em] text-[#f1ddb6]">
            {text.hero.eyebrow}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-3xl font-serif text-5xl italic lg:text-7xl">
            {text.hero.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-2xl text-lg text-white/90 lg:text-xl">
            {text.hero.description}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
            <Button onClick={scrollToDescription} className="bg-white text-black hover:bg-white/90">{text.hero.discover}</Button>
            <Button asChild variant="outline" className="border-[#e9d7a4] bg-[#e9d7a4]/10 text-[#f6e9c6] hover:bg-[#e9d7a4]/20">
              <Link href="/rsvp">{text.hero.rsvp}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
