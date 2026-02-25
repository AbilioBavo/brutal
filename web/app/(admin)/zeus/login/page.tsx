'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/ui/field';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard/clients');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    try {
      await login({ email, password });
    } catch {
      // Error toast is shown by the login function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-pink-50/40 to-rose-50/60" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ec4899\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-200/30 blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-rose-200/30 blur-[120px]" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="overflow-hidden rounded-3xl border border-pink-100/80 bg-white/90 shadow-[0_4px_60px_rgba(236,72,153,0.1)] backdrop-blur-sm">
          {/* Header */}
          <div className="relative px-10 pb-2 pt-12 text-center">
            {/* Top accent */}
            <div className="absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 rounded-b-full bg-linear-to-r from-pink-400 to-rose-400" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50">
                <svg className="h-8 w-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-pink-400">
                Admin Access
              </p>
              <h1 className="mb-2 bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 bg-clip-text font-serif text-3xl font-light italic tracking-wide text-transparent">
                Brutal Pink Table
              </h1>
              <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-linear-to-r from-transparent to-pink-300" />
                <div className="h-1.5 w-1.5 rounded-full bg-pink-300" />
                <div className="h-px w-12 bg-linear-to-l from-transparent to-pink-300" />
              </div>
              <p className="text-sm font-light text-gray-500">
                Entre com suas credenciais para acessar o painel
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="px-10 pb-12 pt-6"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field orientation="vertical">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-xl border-pink-100 bg-pink-50/30 px-4 text-gray-800 placeholder:text-gray-400 focus:border-pink-300 focus:ring-pink-200"
                />
              </Field>

              <Field orientation="vertical">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={isLoading}
                  className="h-12 rounded-xl border-pink-100 bg-pink-50/30 px-4 text-gray-800 placeholder:text-gray-400 focus:border-pink-300 focus:ring-pink-200"
                />
              </Field>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className="h-12 w-full rounded-xl bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 font-serif text-base font-light italic tracking-wide text-white shadow-[0_4px_20px_rgba(236,72,153,0.3)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(236,72,153,0.4)] disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Entrando...
                    </span>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center font-serif text-xs font-light italic tracking-wide text-gray-400"
        >
          &copy; {new Date().getFullYear()} Brutal Fruit — Pink Table
        </motion.p>
      </motion.div>
    </div>
  );
}
