import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ExternalLink } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { achievements } from '../data/content'
import { useModalA11y } from '../hooks/useModalA11y'

function CertificateModal({ item, onClose }) {
  const dialogRef = useModalA11y(onClose)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4"
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-modal-heading"
          tabIndex={-1}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-ink-900 border border-ink-700 rounded-md overflow-hidden outline-none"
        >
          <button
            onClick={onClose}
            aria-label="Close certificate"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-sm bg-ink-800 hover:bg-ink-700 border border-ink-700 flex items-center justify-center text-ink-400 hover:text-ink-100 transition-all"
          >
            <X size={14} />
          </button>

          <div className="relative bg-ink-950 flex items-center justify-center p-4 min-h-[260px]">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="max-h-[400px] w-auto rounded-sm object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 py-10 text-ink-500">
                <item.icon size={28} className="text-rust-500" />
                <p className="font-mono text-xs">Certificate not yet uploaded</p>
              </div>
            )}
          </div>

          <div className="p-6 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-rust-500 tracking-wide uppercase">
                  {item.badge} · {item.year}
                </span>
              </div>
              <h3 id="achievement-modal-heading" className="font-display font-semibold text-ink-100 text-base leading-snug mb-1">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-ink-500">{item.project}</p>
            </div>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 border border-ink-700 hover:border-rust-500 text-ink-300 hover:text-rust-500 font-mono text-xs tracking-wide transition-all duration-200"
              >
                <ExternalLink size={13} />
                View Certificate
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function AchievementCard({ item, index, onClick }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      aria-label={`View certificate: ${item.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(item)
        }
      }}
      className="card rounded-md overflow-hidden cursor-pointer"
    >
      <div className="relative h-32 overflow-hidden bg-ink-900 flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover object-top opacity-80"
          />
        ) : (
          <item.icon size={22} className="text-ink-700" />
        )}

        <div className="absolute top-3 right-3 text-xs font-mono px-2 py-1 bg-ink-950/80 border border-ink-700 text-rust-500 uppercase tracking-wide">
          {item.badge}
        </div>
        <span className="absolute top-3 left-4 font-mono text-xs text-ink-400 tracking-wide uppercase">
          {item.year}
        </span>
      </div>

      <div className="relative z-10 p-5">
        <div className="flex items-start gap-3 mb-2">
          <item.icon size={14} className="text-rust-500 mt-1 flex-shrink-0" />
          <h3 className="font-display font-semibold text-ink-100 text-sm leading-snug">
            {item.title}
          </h3>
        </div>

        <p className="font-mono text-xs text-ink-500 mb-1.5 ml-[26px]">{item.project}</p>
        <p className="font-body text-ink-400 text-[13px] leading-relaxed ml-[26px]">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Achievements() {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <SectionWrapper id="achievements">
      <SectionTitle
        title="Achievements"
        subtitle={achievements.sectionSubtitle}
      />

      <div className="grid md:grid-cols-3 gap-4">
        {achievements.items.map((item, i) => (
          <AchievementCard
            key={item.title}
            item={item}
            index={i}
            onClick={setSelectedItem}
          />
        ))}
      </div>

      {selectedItem && (
        <CertificateModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </SectionWrapper>
  )
}
