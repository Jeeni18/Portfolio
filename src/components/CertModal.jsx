import React from 'react'
import { motion } from 'framer-motion'
import { useModalA11y } from '../hooks/useModalA11y'

// A certificate, enlarged: the board-black face inside the oxblood frame,
// the certificate as large as the screen allows (never cropped), and its
// name and details underneath. Closes on Escape, the close button or a
// click outside it; focus is trapped inside and returned afterwards.
export default function CertModal({ cert, onClose }) {
  const dialogRef = useModalA11y(onClose)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="cert-modal fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-heading"
        tabIndex={-1}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="cert-modal__panel board relative outline-none"
      >
        <div className="board__meta cert-modal__meta">
          <span>certificate</span>
          <button type="button" onClick={onClose} className="board-control" aria-label="Close certificate">
            close <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="cert-modal__frame">
          <img src={cert.image} alt={`Certificate: ${cert.title}`} />
        </div>

        <div className="cert-modal__caption">
          <h2 id="cert-modal-heading" className="cert-modal__title">{cert.title}</h2>
          <p className="cert-modal__org">{cert.org} · {cert.year}</p>
          <p className="cert-modal__desc">{cert.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
