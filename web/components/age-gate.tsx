'use client'

import { useState, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

const AGE_VERIFIED_KEY = 'age_verified'

function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

// Use useSyncExternalStore to read localStorage without useEffect + setState
const subscribe = () => () => {} // localStorage doesn't emit events we need
const getAgeVerified = () => localStorage.getItem(AGE_VERIFIED_KEY)
const getAgeVerifiedServer = () => null

export function AgeGate({ children }: { children: React.ReactNode }) {
  const ageVerified = useSyncExternalStore(subscribe, getAgeVerified, getAgeVerifiedServer)
  const [dismissed, setDismissed] = useState(false)
  const [dateValue, setDateValue] = useState('')
  const [error, setError] = useState('')

  const showGate = !ageVerified && !dismissed

  const handleVerify = () => {
    setError('')

    if (!dateValue) {
      setError('Por favor, insere a tua data de nascimento')
      return
    }

    const birthDate = new Date(dateValue)
    if (isNaN(birthDate.getTime())) {
      setError('Data inválida')
      return
    }

    const age = calculateAge(birthDate)

    if (age < 18) {
      setError('Deves ter pelo menos 18 anos para aceder a este site')
      return
    }

    localStorage.setItem(AGE_VERIFIED_KEY, 'true')
    setDismissed(true)
  }

  return (
    <>
      {children}

      <AnimatePresence>
        {showGate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 px-4 backdrop-blur-xl"
          >
            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-pink-100/60 bg-white shadow-[0_20px_80px_rgba(236,72,153,0.2)]"
            >
              {/* Top accent */}
              <div className="absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 rounded-b-full bg-linear-to-r from-pink-400 to-rose-400" />

              <div className="px-10 pb-10 pt-12 text-center">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50">
                  <svg className="h-8 w-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>

                {/* Title */}
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-pink-400">
                  Verificação de Idade
                </p>
                <h2 className="mb-2 bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 bg-clip-text font-serif text-3xl font-light italic tracking-wide text-transparent">
                  Bem-vinda
                </h2>
                <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                  <div className="h-px w-10 bg-linear-to-r from-transparent to-pink-300" />
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-300" />
                  <div className="h-px w-10 bg-linear-to-l from-transparent to-pink-300" />
                </div>
                <p className="mb-8 text-sm font-light text-gray-500">
                  Este evento é exclusivo para maiores de 18 anos.<br />
                  Confirma a tua data de nascimento para continuar.
                </p>

                {/* Date Input */}
                <div className="mb-6">
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-400">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={dateValue}
                    onChange={(e) => {
                      setDateValue(e.target.value)
                      setError('')
                    }}
                    max={new Date().toISOString().split('T')[0]}
                    className="mx-auto h-12 w-full rounded-xl border border-pink-100 bg-pink-50/30 px-4 text-center font-light text-gray-800 transition-all focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mb-4 text-sm text-red-500"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Button */}
                <Button
                  onClick={handleVerify}
                  className="h-12 w-full rounded-xl bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 font-serif text-base font-light italic tracking-wide text-white shadow-[0_4px_20px_rgba(236,72,153,0.3)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(236,72,153,0.4)]"
                >
                  Confirmar Idade
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
