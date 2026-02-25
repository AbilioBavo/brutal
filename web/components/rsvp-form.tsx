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
        bestieFirstName: form.bestieFirstName || undefined,
        bestieLastName: form.bestieLastName || undefined,
        bestiePhone: form.bestiePhone || undefined,
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

  return (
    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
      <Input placeholder={text.form.firstName} value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required />
      <Input placeholder={text.form.lastName} value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required />
      <Input type="date" aria-label={text.form.birthDate} value={form.birthDate} onChange={(e) => update('birthDate', e.target.value)} required />
      <Input type="email" placeholder={text.form.email} value={form.email} onChange={(e) => update('email', e.target.value)} required />
      <Input className="md:col-span-2" placeholder={text.form.phone} value={form.phone} onChange={(e) => update('phone', e.target.value)} required />

      <div className="mt-1 md:col-span-2 h-px bg-[#e6d4b7]/70" />

      <Input placeholder={text.form.bestieFirstName} value={form.bestieFirstName} onChange={(e) => update('bestieFirstName', e.target.value)} />
      <Input placeholder={text.form.bestieLastName} value={form.bestieLastName} onChange={(e) => update('bestieLastName', e.target.value)} />
      <Input className="md:col-span-2" placeholder={text.form.bestiePhone} value={form.bestiePhone} onChange={(e) => update('bestiePhone', e.target.value)} />

      <Button type="submit" disabled={loading} className="md:col-span-2 bg-[#d2918f] text-white hover:bg-[#bf7e7b]">
        {loading ? text.form.submitting : text.form.submit}
      </Button>
    </form>
  )
}
