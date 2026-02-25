'use client'

import Image from 'next/image'
import type { MarketingCopy } from '@/lib/marketing-copy'

interface FooterProps {
  text: MarketingCopy
}

export function Footer({ text }: FooterProps) {
  return (
    <footer className="border-t border-[#3a3138] bg-[#171318] px-4 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 md:items-center">
        <div className="flex items-center gap-3">
          <Image src="/brutal-fruit-logo.svg" alt="Brutal Fruit" width={56} height={56} className="rounded-full" />
          <div>
            <p className="font-serif text-xl italic">Brutal Fruit Spritzer</p>
            <p className="text-xs uppercase tracking-[0.25em] text-[#e9d7a4]">Pink Table</p>
          </div>
        </div>
        <div className="text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Brutal Fruit. {text.footer.rights}</p>
        </div>
        <div className="text-sm text-[#e9d7a4] md:text-right">{text.footer.note}</div>
      </div>
    </footer>
  )
}
