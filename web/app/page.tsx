'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/hero-section'
import { DescriptionSection } from '@/components/description-section'
import { GallerySection } from '@/components/gallery-section'
import { CtaSection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { AgeGate } from '@/components/age-gate'
import { RsvpDialog } from '@/components/rsvp-dialog'

export default function Page() {
  const [rsvpOpen, setRsvpOpen] = useState(false)

  return (
    <AgeGate>
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Description Section */}
        <DescriptionSection />

        {/* Gallery Section */}
        <GallerySection />

        {/* CTA Section */}
        <CtaSection onRsvpClick={() => setRsvpOpen(true)} />

        {/* Footer */}
        <Footer />

        {/* RSVP Dialog */}
        <RsvpDialog open={rsvpOpen} onOpenChange={setRsvpOpen} />
      </main>
    </AgeGate>
  )
}
