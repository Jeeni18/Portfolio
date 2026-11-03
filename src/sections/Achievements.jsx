import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ExternalLink, Check } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import { achievements } from '../data/content'
import { useModalA11y } from '../hooks/useModalA11y'

const STAMP_FILLS = ['#F7EEDB', '#EBC4D5', '#D8DCEB']
const STAMP_ROTATIONS = [-9, 6, -5, 8, -7, 4, -8, 7, -4, 9]
const STAMP_OFFSETS = [0, 22, -14, 10, -20, 16, -8, 24, -16, 6]

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
        className="fixed inset-0 z-[200] bg-plum-dark/70 flex items-center justify-center p-4"
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
          className="relative w-full max-w-2xl bg-paper border-2 border-plum rounded-sm overflow-hidden outline-none"
        >
          <button
            onClick={onClose}
            aria-label="Close certificate"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-cream hover:bg-rose border-2 border-plum flex items-center justify-center text-plum transition-all"
          >
            <X size={14} />
          </button>

          <div className="relative bg-lilac/30 flex items-center justify-center p-4 min-h-[260px]">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="max-h-[400px] w-auto rounded-sm object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 py-10 text-plum/60">
                <item.icon size={28} className="text-plum" />
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
              <h3 id="achievement-modal-heading" className="font-display text-plum text-xl leading-snug mb-1">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-plum/60">{item.project}</p>
            </div>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 border-2 border-plum hover:bg-plum hover:text-cream text-plum font-mono text-xs tracking-wide transition-all duration-200"
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

function Stamp({ item, index, onClick }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const rotation = STAMP_ROTATIONS[index % STAMP_ROTATIONS.length]
  const offsetY = STAMP_OFFSETS[index % STAMP_OFFSETS.length]
  const fill = STAMP_FILLS[index % STAMP_FILLS.length]
  const clickable = !!item.image

  const Tag = clickable ? motion.button : motion.div

  return (
    <Tag
      ref={ref}
      type={clickable ? 'button' : undefined}
      onClick={clickable ? () => onClick(item) : undefined}
      aria-label={clickable ? `View certificate: ${eventName(item.title)}` : undefined}
      initial={{ scale: 0, opacity: 0 }}
      animate={
        inView
          ? { scale: [1.7, 0.94, 1], opacity: 1, rotate: rotation, y: offsetY }
          : { scale: 0, opacity: 0, rotate: rotation, y: offsetY }
      }
      transition={{ duration: 0.55, delay: index * 0.18, times: [0, 0.65, 1] }}
      className={`relative flex-shrink-0 w-[168px] h-[168px] rounded-full flex flex-col items-center justify-center text-center px-4 ${
        clickable ? 'cursor-pointer' : ''
      }`}
      style={{
        background: fill,
        border: '4px double var(--plum, #493744)',
      }}
    >
      <span
        className="absolute inset-[10px] rounded-full pointer-events-none"
        style={{ border: '1.5px dashed var(--plum, #493744)' }}
        aria-hidden="true"
      />
      <span className="font-mono text-[10px] uppercase tracking-widest text-plum/70">{item.badge}</span>
      <span className="font-mono text-xs uppercase tracking-wide text-plum font-semibold mt-1 leading-tight">
        {eventName(item.title)}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-plum/70 mt-1">{item.year}</span>
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
      className={`w-full text-left flex items-start gap-4 py-4 border-b border-plum/20 ${
        clickable ? 'hover:bg-paper cursor-pointer' : ''
      } transition-colors duration-150 px-2 -mx-2`}
    >
      <span className="mt-1.5 w-5 h-5 rounded-[3px] border-2 border-plum flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <Check size={13} strokeWidth={3} className="text-plum" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-xs text-plum/60 uppercase tracking-wide mb-1">
          {item.badge} · {item.year}
        </p>
        <h3 className="font-hand text-2xl text-plum leading-snug">{item.title}</h3>
        <p className="font-body text-plum/70 text-sm leading-relaxed mt-1">{item.description}</p>
      </div>
    </Tag>
  )
}

export default function Achievements() {
  const [selectedItem, setSelectedItem] = useState(null)

  const wins = achievements.items.filter((item) => item.badge === 'Winner')
  const others = achievements.items.filter((item) => item.badge !== 'Winner')

  return (
    <SectionWrapper id="achievements" band="blush">
      <SectionTitle
        apiLabel="GET /awards"
        title="Achievements"
        subtitle={achievements.sectionSubtitle}
      />

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 pt-6 pb-10 mb-8">
        {wins.map((item, i) => (
          <Stamp key={item.title} item={item} index={i} onClick={setSelectedItem} />
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
