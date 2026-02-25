'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import apiClient from '@/lib/api-client'

export function RsvpForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phone: '',
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
      })
      toast.success('RSVP enviado com sucesso!')
      setForm({ firstName: '', lastName: '', birthDate: '', email: '', phone: '' })
    } catch {
      toast.error('Não foi possível enviar o RSVP. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
      <Input placeholder="Nome" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required />
      <Input placeholder="Apelido" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required />
      <Input type="date" value={form.birthDate} onChange={(e) => update('birthDate', e.target.value)} required />
      <Input type="email" placeholder="Email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
      <Input className="md:col-span-2" placeholder="Telefone" value={form.phone} onChange={(e) => update('phone', e.target.value)} required />
      <Button type="submit" disabled={loading} className="md:col-span-2 bg-[#d2918f] text-white hover:bg-[#bf7e7b]">
        {loading ? 'A enviar...' : 'Confirmar RSVP'}
      </Button>
    </form>
  )
}
