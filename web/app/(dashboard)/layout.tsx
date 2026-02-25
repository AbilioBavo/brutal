'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard/clients',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
    },
    {
      label: 'Clientes',
      href: '/dashboard/clients',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
  ];

  const isActiveRoute = (href: string) => pathname.startsWith(href);

  return (
    <ProtectedRoute>
      <div className="relative flex h-screen overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 bg-linear-to-br from-white via-pink-50/20 to-rose-50/30" />
        <div
          className="fixed inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ec4899\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />

        {/* Mobile sidebar backdrop */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-out lg:relative lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="relative flex h-full flex-col border-r border-pink-100/60 bg-white/80 backdrop-blur-xl">
            {/* Logo Area */}
            <div className="px-8 pb-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 shadow-[0_4px_12px_rgba(236,72,153,0.3)]">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div>
                  <h1 className="bg-linear-to-r from-pink-600 to-rose-500 bg-clip-text font-serif text-lg font-light italic tracking-wide text-transparent">
                    Pink Table
                  </h1>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-300">
                    Admin Panel
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-linear-to-r from-transparent via-pink-200/60 to-transparent" />

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
              <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-300">
                Menu
              </p>
              {navItems.map((item) => {
                const active = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      active
                        ? 'bg-linear-to-r from-pink-50 to-rose-50 text-pink-600 shadow-[0_2px_12px_rgba(236,72,153,0.08)]'
                        : 'text-gray-500 hover:bg-pink-50/50 hover:text-pink-600'
                    }`}
                  >
                    {active && (
                      <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-linear-to-b from-pink-500 to-rose-500" />
                    )}
                    <span className={active ? 'text-pink-500' : 'text-gray-400 group-hover:text-pink-400'}>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="mx-6 h-px bg-linear-to-r from-transparent via-pink-200/60 to-transparent" />

            {/* User section */}
            <div className="p-6">
              <div className="mb-4 rounded-2xl border border-pink-100/60 bg-linear-to-br from-pink-50/50 to-rose-50/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-pink-500 to-rose-500 font-serif text-sm font-light italic text-white shadow-[0_2px_8px_rgba(236,72,153,0.3)]">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {user?.email}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-pink-400">
                      {user?.role}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                className="w-full rounded-xl border-pink-100 text-gray-500 transition-all duration-300 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Sair
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <header className="relative z-10 flex h-16 items-center gap-4 border-b border-pink-100/60 bg-white/60 px-6 backdrop-blur-xl lg:px-8">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-xl p-2 text-gray-400 transition-all duration-300 hover:bg-pink-50 hover:text-pink-600 lg:hidden"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <div className="flex flex-1 items-center justify-between">
              <div className="lg:hidden">
                <h1 className="bg-linear-to-r from-pink-600 to-rose-500 bg-clip-text font-serif text-lg font-light italic text-transparent">
                  Pink Table
                </h1>
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300">
                  Painel Administrativo
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                  <span className="text-xs text-gray-400">Online</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="relative flex-1 overflow-y-auto p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
