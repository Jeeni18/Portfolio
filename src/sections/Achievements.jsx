import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ExternalLink } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { achievements } from '../data/content'
import { useModalA11y } from '../hooks/useModalA11y'


function eventName(title) {
  const parts = title.split(' — ')
  return parts.length > 1 ? parts[parts.length - 1] : title
}

function CertificateModal({ item, onClose }) {
  const dialogRef = useModalA11y(onClose)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-wine-deep/80 backdrop-blur-[2px] flex items-center justify-center p-4"
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
          className="tone-light relative w-full max-w-2xl bg-paper border border-ink/10 rounded-[2px] shadow-soft overflow-hidden outline-none"
        >
          <button
            onClick={onClose}
            aria-label="Close certificate"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-paper hover:bg-wine hover:text-cream border border-ink/15 flex items-center justify-center text-ink transition-all"
          >
            <X size={14} />
          </button>

          <div className="relative bg-cream flex items-center justify-center p-4 min-h-[260px]">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="max-h-[400px] w-auto rounded-sm object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 py-10 text-ink/60">
                <item.icon size={28} className="text-ink" />
                <p className="font-mono text-xs">Certificate not yet uploaded</p>
              </div>
            )}
          </div>

          <div className="p-6 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="api-label">
                  {item.badge} · {item.year}
                </span>
              </div>
              <h3 id="achievement-modal-heading" className="font-display text-ink text-xl leading-snug mb-1">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-ink/60">{item.project}</p>
            </div>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 border border-ink/15 hover:bg-wine hover:text-cream hover:border-wine text-ink font-mono text-xs tracking-wide transition-all duration-200"
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

// Award seal: lifted-cream disc, wine outer ring, dusty inner hairline.
function Seal({ item, index, onClick }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const clickable = !!item.image

  const Tag = clickable ? motion.button : motion.div

  return (
    <Tag
      ref={ref}
      type={clickable ? 'button' : undefined}
      onClick={clickable ? () => onClick(item) : undefined}
      aria-label={clickable ? `View certificate: ${eventName(item.title)}` : undefined}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex-shrink-0 w-[144px] h-[144px] rounded-full flex flex-col items-center justify-center text-center px-5 bg-paper border border-wine transition-colors duration-200 ${
        clickable ? 'cursor-pointer hover:bg-wine' : ''
      }`}
    >
      <span
        className="absolute inset-[7px] rounded-full pointer-events-none border border-dusty group-hover:border-cream/30 transition-colors"
        aria-hidden="true"
      />
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose group-hover:text-cream/70 transition-colors">{item.badge}</span>
      <span className="font-display text-[16px] text-ink group-hover:text-cream mt-1 leading-tight transition-colors">
        {eventName(item.title)}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose group-hover:text-cream/70 mt-1.5 transition-colors">{item.year}</span>
    </Tag>
  )
}

function FinalistRow({ item, onClick }) {
  const clickable = !!item.image
  const Tag = clickable ? 'button' : 'div'

  return (
    <Tag
      type={clickable ? 'button' : undefined}
      onClick={clickable ? () => onClick(item) : undefined}
      className={`w-full text-left flex items-start gap-5 py-5 border-t border-ink/15 ${
        clickable ? 'group cursor-pointer' : ''
      }`}
    >
      <span className="mt-2 w-4 h-px bg-wine flex-shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <p className="font-mono text-[11px] text-rose uppercase tracking-wider mb-1">
          {item.badge} · {item.year}
        </p>
        <h3 className="font-display text-xl text-ink leading-snug group-hover:text-wine transition-colors duration-150">{item.title}</h3>
        <p className="font-body text-ink/75 text-sm leading-relaxed mt-1">{item.description}</p>
      </div>
    </Tag>
  )
}

export default function Achievements() {
  const [selectedItem, setSelectedItem] = useState(null)

  const wins = achievements.items.filter((item) => item.badge === 'Winner')
  const others = achievements.items.filter((item) => item.badge !== 'Winner')

  return (
    <SectionWrapper id="achievements">
      <SectionTitle
        apiLabel="GET /awards"
        index="06"
        title="Achievements"
        subtitle={achievements.sectionSubtitle}
      />

      <div className="flex flex-wrap justify-center gap-5 pb-14 mb-4">
        {wins.map((item, i) => (
          <Seal key={item.title} item={item} index={i} onClick={setSelectedItem} />
        ))}
      </div>

      <div>
        {others.map((item) => (
          <FinalistRow key={item.title} item={item} onClick={setSelectedItem} />
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
