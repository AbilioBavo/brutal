'use client'

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="border-t border-pink-900/20 bg-gray-950 px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-7xl text-center"
      >
        <p className="font-serif text-sm font-light italic tracking-wide text-gray-500">
          &copy; {new Date().getFullYear()} Brutal Fruit — Pink Table. All rights reserved.
        </p>
      </motion.div>
    </footer>
  )
}
