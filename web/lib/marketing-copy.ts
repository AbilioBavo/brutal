export type Locale = 'pt' | 'en'

export interface MarketingCopy {
  nav: { event: string; rsvp: string }
  hero: { eyebrow: string; title: string; description: string; discover: string; rsvp: string }
  description: { title: string; subtitle: string }
  cta: { badge: string; title: string; description: string; button: string }
  footer: { rights: string; note: string }
  rsvpPage: { eyebrow: string; title: string; subtitle: string; detailsTitle: string; details: string[] }
}

export const copy: Record<Locale, MarketingCopy> = {
  pt: {
    nav: { event: 'Pink Table 2026', rsvp: 'Fazer RSVP' },
    hero: {
      eyebrow: 'Brutal Fruit Spritzer apresenta',
      title: 'Hey Bestie... The Pink Table is Back',
      description:
        'A nossa mesa favorita está de volta — mais feminina, mais vibrante e pronta para um brunch inesquecível.',
      discover: 'Descubra Mais',
      rsvp: 'Garantir Presença',
    },
    description: {
      title: 'Sobre o Evento',
      subtitle: 'Um brunch exclusivo que celebra a feminilidade, a amizade e o estilo único de cada uma.',
    },
    cta: {
      badge: 'Garanta a sua presença',
      title: 'Reserve o seu lugar',
      description: 'Confirma já a tua presença para viver uma experiência premium com Brutal Fruit.',
      button: 'Fazer RSVP',
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      note: 'Apenas para maiores de 18 anos. Beba com responsabilidade.',
    },
    rsvpPage: {
      eyebrow: 'RSVP Oficial',
      title: 'Confirme a sua presença',
      subtitle: 'Uma experiência elegante espera por si. Preencha o formulário para concluir o RSVP.',
      detailsTitle: 'O que inclui',
      details: ['Welcome drink Brutal Fruit', 'Lounge premium e photo moments', 'Confirmação por email em minutos'],
    },
  },
  en: {
    nav: { event: 'Pink Table 2026', rsvp: 'RSVP Now' },
    hero: {
      eyebrow: 'Brutal Fruit Spritzer presents',
      title: 'Hey Bestie... The Pink Table is Back',
      description: 'Our favorite table is back — bolder, brighter and ready for an unforgettable brunch.',
      discover: 'Discover More',
      rsvp: 'Secure Your Spot',
    },
    description: {
      title: 'About the Event',
      subtitle: 'An exclusive brunch celebrating femininity, friendship and personal style.',
    },
    cta: {
      badge: 'Secure your presence',
      title: 'Reserve your seat',
      description: 'Confirm your attendance now for a premium Brutal Fruit experience.',
      button: 'RSVP Now',
    },
    footer: {
      rights: 'All rights reserved.',
      note: '18+ only. Enjoy responsibly.',
    },
    rsvpPage: {
      eyebrow: 'Official RSVP',
      title: 'Confirm your attendance',
      subtitle: 'An elegant experience awaits. Complete the form below to finalize your RSVP.',
      detailsTitle: 'What is included',
      details: ['Brutal Fruit welcome drink', 'Premium lounge and photo moments', 'Email confirmation within minutes'],
    },
  },
}
