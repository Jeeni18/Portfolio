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
    'w-full bg-cream border rounded-[2px] px-4 py-3 font-body text-sm text-ink placeholder-ink/40 outline-none focus-visible:outline-none transition-colors duration-200'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-wine-deep/80 backdrop-blur-[2px] flex items-center justify-center p-4"
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
          className="tone-light relative w-full max-w-md bg-paper border border-ink/10 rounded-[2px] shadow-soft overflow-hidden outline-none"
        >
          <div className="flex items-start justify-between p-7 pb-5">
            <div>
              <p className="api-label mb-1">
                POST /contact
              </p>
              <h2 id="contact-modal-heading" className="font-display text-ink text-2xl">
                {contact.heading}
              </h2>
              <p className="font-body text-ink/60 text-xs mt-1">
                {contact.subtext}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close contact form"
              className="w-8 h-8 rounded-full bg-paper hover:bg-wine hover:text-cream border border-ink/15 flex items-center justify-center text-ink transition-all"
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
                <div className="w-14 h-14 rounded-full bg-cream border border-ink/15 flex items-center justify-center">
                  <CheckCircle className="text-ink" size={26} />
                </div>
                <h3 className="font-display text-ink text-xl">Message Sent!</h3>
                <p className="font-body text-ink/70 text-sm">
                  Thanks for reaching out. I&rsquo;ll be in touch soon.
                </p>
                <button onClick={onClose} className="mt-3 btn-primary text-xs py-2 px-5">
                  Close
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="contact-name" className="font-mono text-xs text-ink/70 tracking-wide uppercase block mb-1.5">
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
                      errors.name ? 'border-wine' : 'border-ink/20 focus:border-wine'
                    }`}
                  />
                  {errors.name && <p id="contact-name-error" className="font-mono text-xs text-wine mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact-email" className="font-mono text-xs text-ink/70 tracking-wide uppercase block mb-1.5">
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
                      errors.email ? 'border-wine' : 'border-ink/20 focus:border-wine'
                    }`}
                  />
                  {errors.email && <p id="contact-email-error" className="font-mono text-xs text-wine mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="font-mono text-xs text-ink/70 tracking-wide uppercase block mb-1.5">
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
                      errors.message ? 'border-wine' : 'border-ink/20 focus:border-wine'
                    }`}
                  />
                  {errors.message && <p id="contact-message-error" className="font-mono text-xs text-wine mt-1">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 border border-wine/40 bg-wine/5">
                    <AlertCircle size={13} className="text-wine flex-shrink-0" />
                    <p className="font-mono text-[11px] text-wine">
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
