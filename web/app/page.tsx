'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/hero-section'
import { DescriptionSection } from '@/components/description-section'
import { GallerySection } from '@/components/gallery-section'
import { DressCodeSection } from '@/components/dress-code-section'
import { CtaSection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { AgeGate } from '@/components/age-gate'
import { AgeBadge } from '@/components/age-badge'
import { copy, type Locale } from '@/lib/marketing-copy'

export default function Page() {
  const [locale, setLocale] = useState<Locale>('pt')
  const text = copy[locale]

  return (
    <AgeGate>
      <main className="min-h-screen bg-[#fffaf8]">
        <AgeBadge />
        <HeroSection locale={locale} onLocaleChange={setLocale} text={text} />
        <CtaSection text={text} />
        <DescriptionSection text={text} />
        <DressCodeSection text={text} />
        <GallerySection />
        <Footer text={text} />
      </main>
    </AgeGate>
  )
}
