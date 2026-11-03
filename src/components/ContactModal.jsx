import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { X, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { contact } from '../data/content'
import { useModalA11y } from '../hooks/useModalA11y'

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_t52sujt',
  TEMPLATE_ID: 'template_mlgeyk8',
  PUBLIC_KEY: 'Du2MdfwYGUtseKjUp',
}

export default function ContactModal({ onClose }) {
  const formRef = useRef()
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const dialogRef = useModalA11y(onClose)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const inputBase =
    'w-full bg-cream border-2 rounded-sm px-4 py-3 font-body text-sm text-plum placeholder-plum/40 transition-all duration-200'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-plum-dark/70 flex items-center justify-center p-4"
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-heading"
          tabIndex={-1}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-paper border-2 border-plum rounded-sm overflow-hidden outline-none"
        >
          <div className="flex items-start justify-between p-7 pb-5">
            <div>
              <p className="api-label mb-1">
                POST /contact
              </p>
              <h2 id="contact-modal-heading" className="font-display text-plum text-2xl">
                {contact.heading}
              </h2>
              <p className="font-body text-plum/60 text-xs mt-1">
                {contact.subtext}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close contact form"
              className="w-8 h-8 rounded-full bg-cream hover:bg-rose border-2 border-plum flex items-center justify-center text-plum transition-all"
            >
              <X size={14} />
            </button>
          </div>

          <div className="px-7 pb-7">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 py-8 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-lilac border-2 border-plum flex items-center justify-center">
                  <CheckCircle className="text-plum" size={26} />
                </div>
                <h3 className="font-display text-plum text-xl">Message Sent!</h3>
                <p className="font-body text-plum/70 text-sm">
                  Thanks for reaching out. I&rsquo;ll be in touch soon.
                </p>
                <button onClick={onClose} className="mt-3 btn-primary text-xs py-2 px-5">
                  Close
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="contact-name" className="font-mono text-xs text-plum/70 tracking-wide uppercase block mb-1.5">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jeeni Shrestha"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`${inputBase} ${
                      errors.name ? 'border-red-500/60' : 'border-plum/30 focus:border-plum'
                    }`}
                  />
                  {errors.name && <p id="contact-name-error" className="font-mono text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact-email" className="font-mono text-xs text-plum/70 tracking-wide uppercase block mb-1.5">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={`${inputBase} ${
                      errors.email ? 'border-red-500/60' : 'border-plum/30 focus:border-plum'
                    }`}
                  />
                  {errors.email && <p id="contact-email-error" className="font-mono text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="font-mono text-xs text-plum/70 tracking-wide uppercase block mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell me about your project or just say hello..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`${inputBase} resize-none ${
                      errors.message ? 'border-red-500/60' : 'border-plum/30 focus:border-plum'
                    }`}
                  />
                  {errors.message && <p id="contact-message-error" className="font-mono text-xs text-red-600 mt-1">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 border-2 border-red-500/40 bg-red-500/5">
                    <AlertCircle size={13} className="text-red-600 flex-shrink-0" />
                    <p className="font-mono text-[11px] text-red-600">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader size={14} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
