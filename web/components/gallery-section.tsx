'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const photos = [
  { src: '/BF_MOZ_2025-25.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
  { src: '/BF_MOZ_2025-26.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-2' },
  { src: '/BF_MOZ_2025-33.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
  { src: '/BF_MOZ_2025-36.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
  { src: '/BF_MOZ_2025-41.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-2' },
  { src: '/BF_MOZ_2025-43.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
  { src: '/BF_MOZ_2025-50.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
  { src: '/BF_MOZ_2025-131.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
  { src: '/BF_MOZ_2025-156.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-2' },
  { src: '/BF_MOZ_2025-242.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
  { src: '/BF_MOZ_2025-271.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
  { src: '/BF_MOZ_2025-275.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
  { src: '/BF_MOZ_2025-282.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-2' },
  { src: '/BF_MOZ_2025-300.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
  { src: '/BF_MOZ_2025-316.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
  { src: '/BF_MOZ_2025-370.jpg.jpeg', alt: 'Pink Table Moment', span: 'col-span-1 row-span-1' },
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <>
      <section id="gallery" className="relative overflow-hidden px-4 py-28 lg:py-44">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-b from-white via-gray-50/80 to-white"></div>
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ec4899\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>

        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-20 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-pink-400">
              Momentos Inesquecíveis
            </p>
            <h2 className="mb-6 bg-linear-to-r from-pink-600 via-pink-500 to-rose-500 bg-clip-text font-serif text-5xl font-light italic tracking-wide text-transparent lg:text-7xl">
              Galeria
            </h2>
            <div className="mx-auto mb-8 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-linear-to-r from-transparent to-pink-300 lg:w-24"></div>
              <svg className="h-5 w-5 text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              <div className="h-px w-16 bg-linear-to-l from-transparent to-pink-300 lg:w-24"></div>
            </div>
            <p className="mx-auto max-w-2xl font-light leading-relaxed text-gray-600 lg:text-xl">
              Revive os melhores momentos da Pink Table através das nossas lentes.
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1, ease: 'easeOut' }}
                className="group relative mb-4 cursor-pointer break-inside-avoid overflow-hidden rounded-2xl"
                onClick={() => setSelectedImage(index)}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={800}
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-pink-400/0 transition-all duration-500 group-hover:ring-pink-400/40"></div>

                  {/* Expand icon */}
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
                    <svg className="h-5 w-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
          {/* Close button */}
          <button
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation - Previous */}
          <button
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 lg:left-8"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(selectedImage > 0 ? selectedImage - 1 : photos.length - 1)
            }}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Navigation - Next */}
          <button
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 lg:right-8"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(selectedImage < photos.length - 1 ? selectedImage + 1 : 0)
            }}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl lg:max-w-[75vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[selectedImage].src}
              alt={photos[selectedImage].alt}
              width={1400}
              height={1000}
              className="h-auto max-h-[85vh] w-auto object-contain"
            />
          </motion.div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-5 py-2 text-sm font-light tracking-wider text-white/80 backdrop-blur-sm">
            {selectedImage + 1} / {photos.length}
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
