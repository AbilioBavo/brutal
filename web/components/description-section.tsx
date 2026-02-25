'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  }),
}

export function DescriptionSection() {
  return (
    <section id="description" className="relative overflow-hidden px-4 py-28 lg:py-44">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-pink-50/20 to-white"></div>
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ec4899\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="relative mx-auto max-w-7xl">
        
        {/* Section Header — Refined */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-28 text-center"
        >
          <motion.p variants={fadeUp} custom={0} className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-pink-400">
            Brutal Fruit Presents
          </motion.p>
          <motion.h2 variants={fadeUp} custom={0.1} className="mb-6 bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 bg-clip-text font-serif text-5xl font-light italic tracking-wide text-transparent lg:text-7xl">
            Sobre o Evento
          </motion.h2>
          <motion.div variants={fadeUp} custom={0.2} className="mx-auto mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-pink-300 lg:w-24"></div>
            <svg className="h-5 w-5 text-pink-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div className="h-px w-16 bg-linear-to-l from-transparent to-pink-300 lg:w-24"></div>
          </motion.div>
          <motion.p variants={fadeUp} custom={0.3} className="mx-auto max-w-2xl font-light leading-relaxed text-gray-600 lg:text-xl">
            Um brunch exclusivo que celebra a feminilidade, a amizade e o estilo único de cada uma.
          </motion.p>
        </motion.div>

        {/* Event Info — Minimal Luxury Cards */}
        <div className="mx-auto mb-28 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { label: 'Data', value: '28 de Março', icon: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z' },
            { label: 'Horário', value: '12h00 – 18h00', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' },
            { label: 'Local', value: 'Repinga, Maputo', icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
              className="group relative rounded-3xl border border-pink-100/80 bg-white p-10 text-center shadow-[0_4px_40px_rgba(236,72,153,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_60px_rgba(236,72,153,0.15)]"
            >
              {/* Top accent line */}
              <div className="absolute left-1/2 top-0 h-1 w-0 -translate-x-1/2 rounded-b-full bg-linear-to-r from-pink-400 to-rose-400 transition-all duration-500 group-hover:w-16"></div>
              
              <div className="mb-5 flex justify-center">
                <div className="rounded-2xl bg-pink-50 p-4 transition-colors duration-300 group-hover:bg-pink-100">
                  <svg className="h-8 w-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d={item.icon} />
                  </svg>
                </div>
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
                {item.label}
              </p>
              <p className="font-serif text-2xl font-light italic text-gray-900 lg:text-3xl">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dress Code Section — Editorial Style */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-28 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute left-1/4 top-10 h-40 w-40 rounded-full bg-pink-400 blur-[100px]"></div>
            <div className="absolute bottom-10 right-1/4 h-48 w-48 rounded-full bg-rose-400 blur-[100px]"></div>
          </div>

          <div className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-pink-200/60 bg-white/90 p-12 shadow-[0_0_80px_rgba(236,72,153,0.1)] backdrop-blur-sm lg:p-20">
            {/* Header */}
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-pink-400">O que vestir</p>
              <div className="relative inline-block">
                <div className="absolute -left-20 top-1/2 hidden h-px w-16 bg-linear-to-r from-transparent to-pink-300 lg:block"></div>
                <div className="absolute -right-20 top-1/2 hidden h-px w-16 bg-linear-to-l from-transparent to-pink-300 lg:block"></div>
                <h3 className="font-serif text-5xl font-light italic tracking-wide text-gray-900 lg:text-6xl">
                  Dress Code
                </h3>
              </div>
            </div>

            {/* Color Palette — Sophisticated */}
            <div className="mb-14">
              <div className="flex flex-wrap items-end justify-center gap-8 lg:gap-12">
                {[
                  { name: 'Pink', color: 'bg-pink-500', ring: 'ring-pink-200', glow: 'bg-pink-400' },
                  { name: 'Bege', color: 'bg-[#D4B896]', ring: 'ring-[#D4B896]/30', glow: 'bg-[#D4B896]' },
                  { name: 'Vermelho', color: 'bg-red-500', ring: 'ring-red-200', glow: 'bg-red-400' },
                  { name: 'Lilás', color: 'bg-purple-400', ring: 'ring-purple-200', glow: 'bg-purple-400' },
                ].map((swatch, i) => (
                  <motion.div
                    key={swatch.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i, ease: 'easeOut' }}
                    className="group flex flex-col items-center gap-4"
                  >
                    <div className="relative">
                      <div className={`h-20 w-20 rounded-full ${swatch.color} shadow-lg ring-4 ${swatch.ring} transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl lg:h-24 lg:w-24`}></div>
                      <div className={`absolute inset-0 rounded-full ${swatch.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40`}></div>
                    </div>
                    <span className="text-sm font-light tracking-wider text-gray-500 transition-colors duration-300 group-hover:text-gray-800">
                      {swatch.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Elegant Divider */}
            <div className="relative mb-14">
              <div className="h-px bg-linear-to-r from-transparent via-pink-200 to-transparent"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                <svg className="h-6 w-6 text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>

            {/* Style Note */}
            <div className="space-y-8 text-center">
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 lg:text-xl">
                Elegância leve, brunch chic, atitude confiante.<br className="hidden sm:block" />
                Vestidos leves, conjuntos sofisticados ou looks ousados — tudo que faça você se sentir incrível.
              </p>
              <p className="inline-flex items-center gap-3 rounded-full border border-pink-200/80 bg-pink-50/40 px-8 py-3 font-serif text-base italic text-pink-600">
                <span className="text-sm text-pink-300">✦</span>
                Interpreta a paleta à tua maneira
                <span className="text-sm text-pink-300">✦</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Details — Refined List */}
        <div className="mx-auto mb-28 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12 text-center"
          >
            <motion.p variants={fadeUp} custom={0} className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-pink-400">Informações</motion.p>
            <motion.h3 variants={fadeUp} custom={0.1} className="font-serif text-4xl font-light italic text-gray-900 lg:text-5xl">
              Detalhes Importantes
            </motion.h3>
          </motion.div>

          <div className="space-y-4">
            {[
              { icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z', text: 'Evento exclusivo mediante confirmação' },
              { icon: 'M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z', text: 'Entrada apenas com RSVP validado' },
              { icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z', text: 'Chegada recomendada até às 13h00' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
                className="group flex items-center gap-6 rounded-2xl border border-transparent bg-white p-6 transition-all duration-300 hover:border-pink-100 hover:shadow-[0_4px_30px_rgba(236,72,153,0.1)] lg:p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-50 transition-colors duration-300 group-hover:bg-pink-100">
                  <svg className="h-5 w-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d={item.icon} />
                  </svg>
                </div>
                <p className="text-lg font-light text-gray-700 lg:text-xl">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
