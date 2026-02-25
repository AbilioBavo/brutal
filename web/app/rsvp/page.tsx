'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/language-toggle'
import { copy, type Locale } from '@/lib/marketing-copy'
import { RsvpForm } from '@/components/rsvp-form'

export default function RsvpPage() {
  const [locale, setLocale] = useState<Locale>('pt')
  const text = copy[locale]

  return (
    <main className="min-h-screen bg-[#120f13] text-white">
      <section className="relative overflow-hidden px-4 py-20">
        <Image src="/BF_MOZ_2025-43.jpg.jpeg" alt="Brutal Fruit RSVP" fill className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <Button asChild variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <Link href="/">← {text.rsvpPage.back}</Link>
            </Button>
            <LanguageToggle locale={locale} onChange={setLocale} />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#e9d7a4]">{text.rsvpPage.eyebrow}</p>
              <h1 className="mt-3 font-serif text-5xl italic lg:text-6xl">{text.rsvpPage.title}</h1>
              <p className="mt-5 max-w-xl text-white/85">{text.rsvpPage.subtitle}</p>

              <div className="mt-8 rounded-3xl border border-[#e9d7a4]/45 bg-[#1f1820]/70 p-6 backdrop-blur">
                <h2 className="font-serif text-2xl italic">{text.rsvpPage.detailsTitle}</h2>
                <ul className="mt-4 space-y-2 text-white/85">
                  {text.rsvpPage.details.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-3xl border border-[#e9d7a4]/45 bg-[#1f1820]/70 p-6 backdrop-blur">
                <h3 className="font-serif text-2xl italic">{text.rsvpPage.importantInfoTitle}</h3>
                <ul className="mt-4 space-y-2 text-white/85">
                  {text.rsvpPage.importantInfo.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e9d7a4]/45 bg-white p-7 text-black shadow-2xl lg:min-h-[760px]">
              <RsvpForm text={text} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
