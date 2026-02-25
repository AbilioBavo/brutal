'use client'

import type { Locale } from '@/lib/marketing-copy'

interface LanguageToggleProps {
  locale: Locale
  onChange: (value: Locale) => void
}

export function LanguageToggle({ locale, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-white/40 bg-black/20 p-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
      <button
        type="button"
        onClick={() => onChange('pt')}
        className={`rounded-full px-3 py-1 transition ${locale === 'pt' ? 'bg-white text-black' : 'text-white/80'}`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => onChange('en')}
        className={`rounded-full px-3 py-1 transition ${locale === 'en' ? 'bg-white text-black' : 'text-white/80'}`}
      >
        EN
      </button>
    </div>
  )
}
