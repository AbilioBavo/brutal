export type Locale = 'pt' | 'en'

export interface MarketingCopy {
  nav: { event: string; rsvp: string }
  hero: { eyebrow: string; title: string; description: string; discover: string; rsvp: string }
  description: {
    title: string
    subtitle: string
    dressCodeTitle: string
    dressCodeSubtitle: string
    dressCodePaletteNote: string
    dressCodeColors: string[]
  }
  cta: { badge: string; title: string; description: string; button: string }
  footer: { rights: string; note: string }
  rsvpPage: {
    eyebrow: string
    title: string
    subtitle: string
    detailsTitle: string
    details: string[]
    importantInfoTitle: string
    importantInfo: string[]
    back: string
  }
  form: {
    firstName: string
    lastName: string
    birthDate: string
    email: string
    phone: string
    bestieFirstName: string
    bestieLastName: string
    bestiePhone: string
    submit: string
    submitting: string
    success: string
    error: string
  }
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
      dressCodeTitle: 'O que vestir • Dress Code',
      dressCodeSubtitle: 'Elegância fresca com atitude Brutal: tons suaves, acabamentos premium e confiança.',
      dressCodePaletteNote: 'Interprete a paleta à sua maneira.',
      dressCodeColors: ['Rosa blush', 'Champagne dourado', 'Vermelho sofisticado', 'Lilás suave'],
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
      importantInfoTitle: 'Informações importantes',
      importantInfo: [
        'Evento exclusivo mediante confirmação',
        'Entrada apenas com RSVP validado',
        'Chegada recomendada até às 13h00',
      ],
      back: 'Voltar',
    },
    form: {
      firstName: 'Nome',
      lastName: 'Apelido',
      birthDate: 'Data de nascimento',
      email: 'Email',
      phone: 'Telefone',
      bestieFirstName: 'Nome da bestie',
      bestieLastName: 'Apelido da bestie',
      bestiePhone: 'Telefone da bestie',
      submit: 'Confirmar RSVP',
      submitting: 'A enviar...',
      success: 'RSVP enviado com sucesso!',
      error: 'Não foi possível enviar o RSVP. Tente novamente.',
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
      dressCodeTitle: 'What to wear • Dress Code',
      dressCodeSubtitle: 'Fresh elegance with Brutal attitude: soft tones, premium finishes and confidence.',
      dressCodePaletteNote: 'Interpret the palette in your own way.',
      dressCodeColors: ['Blush pink', 'Golden champagne', 'Sophisticated red', 'Soft lilac'],
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
      importantInfoTitle: 'Important information',
      importantInfo: [
        'Exclusive event subject to confirmation',
        'Entry only with validated RSVP',
        'Recommended arrival by 13:00',
      ],
      back: 'Back',
    },
    form: {
      firstName: 'First name',
      lastName: 'Last name',
      birthDate: 'Birth date',
      email: 'Email',
      phone: 'Phone',
      bestieFirstName: 'Bestie first name',
      bestieLastName: 'Bestie last name',
      bestiePhone: 'Bestie phone',
      submit: 'Confirm RSVP',
      submitting: 'Submitting...',
      success: 'RSVP submitted successfully!',
      error: 'Could not submit RSVP. Please try again.',
    },
  },
}
