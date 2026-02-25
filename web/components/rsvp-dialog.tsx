'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import apiClient from '@/lib/api-client'

interface RsvpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type FormState = 'idle' | 'submitting' | 'success'

export function RsvpDialog({ open, onOpenChange }: RsvpDialogProps) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [showBestie, setShowBestie] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phone: '',
    bestieFirstName: '',
    bestieLastName: '',
    bestiePhone: '',
  })

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}

    if (!form.firstName.trim()) errs.firstName = 'Obrigatório'
    if (!form.lastName.trim()) errs.lastName = 'Obrigatório'
    if (!form.birthDate) errs.birthDate = 'Obrigatório'
    if (!form.email.trim()) errs.email = 'Obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email inválido'
    if (!form.phone.trim()) errs.phone = 'Obrigatório'

    if (form.birthDate) {
      const bd = new Date(form.birthDate)
      const today = new Date()
      let age = today.getFullYear() - bd.getFullYear()
      const m = today.getMonth() - bd.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) age--
      if (age < 18) errs.birthDate = 'Deves ter pelo menos 18 anos'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setFormState('submitting')

    try {
      const payload: Record<string, string> = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        birthDate: new Date(form.birthDate).toISOString(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      }

      if (showBestie) {
        if (form.bestieFirstName.trim()) payload.bestieFirstName = form.bestieFirstName.trim()
        if (form.bestieLastName.trim()) payload.bestieLastName = form.bestieLastName.trim()
        if (form.bestiePhone.trim()) payload.bestiePhone = form.bestiePhone.trim()
      }

      await apiClient.post('/api/clients', payload)
      setFormState('success')
    } catch (err: unknown) {
      setFormState('idle')
      const error = err as { response?: { data?: { message?: string } } }
      const msg = error?.response?.data?.message || 'Erro ao registar. Tenta novamente.'
      toast.error(msg)
    }
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset on close after a small delay
      setTimeout(() => {
        setFormState('idle')
        setShowBestie(false)
        setErrors({})
        setForm({
          firstName: '',
          lastName: '',
          birthDate: '',
          email: '',
          phone: '',
          bestieFirstName: '',
          bestieLastName: '',
          bestiePhone: '',
        })
      }, 300)
    }
    onOpenChange(isOpen)
  }

  const inputClass = (field: string) =>
    `h-11 w-full rounded-xl border px-4 text-sm font-light text-gray-800 transition-all focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-red-200'
        : 'border-pink-100 bg-pink-50/30 focus:border-pink-300 focus:ring-pink-200'
    }`

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0">
        <AnimatePresence mode="wait">
          {formState === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' as const }}
              className="flex flex-col items-center px-10 py-16 text-center"
            >
              {/* Success checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-pink-500 to-rose-500 shadow-[0_8px_30px_rgba(236,72,153,0.35)]"
              >
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </motion.div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-pink-400">
                Confirmado
              </p>
              <h3 className="mb-3 bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 bg-clip-text font-serif text-2xl font-light italic text-transparent">
                See You There!
              </h3>
              <p className="mb-8 max-w-xs text-sm font-light text-gray-500">
                A tua presença está confirmada. Estamos ansiosos para te receber à Pink Table.
              </p>
              <Button
                onClick={() => handleClose(false)}
                className="rounded-xl bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 px-8 py-2.5 font-serif text-sm font-light italic text-white shadow-[0_4px_16px_rgba(236,72,153,0.3)]"
              >
                Fechar
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader className="pt-10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50">
                  <svg className="h-7 w-7 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <DialogTitle>Fazer RSVP</DialogTitle>
                <DialogDescription>
                  Preenche os teus dados para garantir o teu lugar à mesa
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5 px-8 pb-8 pt-4">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-pink-400">
                      Primeiro Nome
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      placeholder="Maria"
                      className={inputClass('firstName')}
                      disabled={formState === 'submitting'}
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-pink-400">
                      Apelido
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      placeholder="Santos"
                      className={inputClass('lastName')}
                      disabled={formState === 'submitting'}
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Birth date */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-pink-400">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => updateField('birthDate', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className={inputClass('birthDate')}
                    disabled={formState === 'submitting'}
                  />
                  {errors.birthDate && <p className="mt-1 text-xs text-red-500">{errors.birthDate}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-pink-400">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="maria@email.com"
                    className={inputClass('email')}
                    disabled={formState === 'submitting'}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-pink-400">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+258 84 000 0000"
                    className={inputClass('phone')}
                    disabled={formState === 'submitting'}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                {/* Bestie divider */}
                <div className="relative pt-2">
                  <div className="h-px bg-linear-to-r from-transparent via-pink-200/60 to-transparent" />
                  <button
                    type="button"
                    onClick={() => setShowBestie(!showBestie)}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-100 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-pink-400 transition-all hover:border-pink-200 hover:bg-pink-50"
                  >
                    {showBestie ? '✕ Remover Bestie' : '💗 Traz a tua Bestie'}
                  </button>
                </div>

                {/* Bestie fields */}
                <AnimatePresence>
                  {showBestie && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' as const }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-pink-300">
                            Nome da Bestie
                          </label>
                          <input
                            type="text"
                            value={form.bestieFirstName}
                            onChange={(e) => updateField('bestieFirstName', e.target.value)}
                            placeholder="Ana"
                            className={inputClass('bestieFirstName')}
                            disabled={formState === 'submitting'}
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-pink-300">
                            Apelido da Bestie
                          </label>
                          <input
                            type="text"
                            value={form.bestieLastName}
                            onChange={(e) => updateField('bestieLastName', e.target.value)}
                            placeholder="Costa"
                            className={inputClass('bestieLastName')}
                            disabled={formState === 'submitting'}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-pink-300">
                          Telefone da Bestie
                        </label>
                        <input
                          type="tel"
                          value={form.bestiePhone}
                          onChange={(e) => updateField('bestiePhone', e.target.value)}
                          placeholder="+258 84 000 0000"
                          className={inputClass('bestiePhone')}
                          disabled={formState === 'submitting'}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="h-12 w-full rounded-xl bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 font-serif text-base font-light italic tracking-wide text-white shadow-[0_4px_20px_rgba(236,72,153,0.3)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(236,72,153,0.4)] disabled:opacity-50"
                  >
                    {formState === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        A registar...
                      </span>
                    ) : (
                      'Confirmar Presença'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
