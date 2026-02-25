'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import apiClient from '@/lib/api-client'
import type { MarketingCopy } from '@/lib/marketing-copy'

interface RsvpFormProps {
  text: MarketingCopy
}

export function RsvpForm({ text }: RsvpFormProps) {
  const [loading, setLoading] = useState(false)
  const [showBestie, setShowBestie] = useState(true)
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

  const update = (field: keyof typeof form, value: string) => setForm((s) => ({ ...s, [field]: value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await apiClient.post('/api/clients', {
        firstName: form.firstName,
        lastName: form.lastName,
        birthDate: form.birthDate,
        email: form.email,
        phone: form.phone,
        bestieFirstName: showBestie ? form.bestieFirstName || undefined : undefined,
        bestieLastName: showBestie ? form.bestieLastName || undefined : undefined,
        bestiePhone: showBestie ? form.bestiePhone || undefined : undefined,
      })
      toast.success(text.form.success)
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
    } catch {
      toast.error(text.form.error)
    } finally {
      setLoading(false)
    }
  }

  const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#f14ca4]'
  const inputClass = 'h-12 rounded-2xl border-[#f5d8e9] bg-[#fbf8fb] text-[#7b6f82] placeholder:text-[#a397af] focus-visible:ring-[#f5b8da]'

  return (
    <form onSubmit={submit} className="flex h-full min-h-[620px] flex-col">
      <div className="grid grow gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>{text.form.firstName}</label>
          <Input className={inputClass} placeholder="Maria" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>{text.form.lastName}</label>
          <Input className={inputClass} placeholder="Santos" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>{text.form.birthDate}</label>
          <Input className={inputClass} type="date" aria-label={text.form.birthDate} value={form.birthDate} onChange={(e) => update('birthDate', e.target.value)} required />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>{text.form.email}</label>
          <Input className={inputClass} type="email" placeholder="maria@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>{text.form.phone}</label>
          <Input className={inputClass} placeholder="+258 84 000 0000" value={form.phone} onChange={(e) => update('phone', e.target.value)} required />
        </div>

        <div className="md:col-span-2 flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setShowBestie((s) => !s)}
            className="rounded-full border border-[#f5d8e9] bg-[#fff5fb] px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#f14ca4] transition hover:bg-[#ffeefd]"
          >
            × {showBestie ? text.form.removeBestie : text.form.addBestie}
          </button>
        </div>

        {showBestie && (
          <>
            <div>
              <label className={labelClass}>{text.form.bestieFirstName}</label>
              <Input className={inputClass} placeholder="Ana" value={form.bestieFirstName} onChange={(e) => update('bestieFirstName', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{text.form.bestieLastName}</label>
              <Input className={inputClass} placeholder="Costa" value={form.bestieLastName} onChange={(e) => update('bestieLastName', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>{text.form.bestiePhone}</label>
              <Input className={inputClass} placeholder="+258 84 000 0000" value={form.bestiePhone} onChange={(e) => update('bestiePhone', e.target.value)} />
            </div>
          </>
        )}
      </div>

      <div className="mt-7 border-t border-[#f5d8e9] pt-5">
        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-2xl bg-linear-to-r from-[#ff0f86] to-[#ff2f98] font-serif text-2xl italic text-white shadow-[0_12px_32px_rgba(255,17,138,0.35)] hover:from-[#f0087b] hover:to-[#f52a91]"
        >
          {loading ? text.form.submitting : text.form.submit}
        </Button>
      </div>
    </form>
  )
}
