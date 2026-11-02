import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { X, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'

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

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

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
    'w-full bg-ink-950 border rounded-sm px-4 py-3 font-body text-sm text-ink-100 placeholder-ink-600 outline-none transition-all duration-200'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/75 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-ink-900 border border-ink-700 rounded-md overflow-hidden"
        >
          <div className="flex items-start justify-between p-7 pb-5">
            <div>
              <p className="font-mono text-[10px] text-rust-500 tracking-wide uppercase mb-1">
                Contact
              </p>
              <h2 className="font-display font-semibold text-xl text-ink-100">
                Let's Work Together
              </h2>
              <p className="font-body text-ink-500 text-xs mt-1">
                I'll get back to you within 24 hours.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-ink-800 hover:bg-ink-700 border border-ink-700 flex items-center justify-center text-ink-400 hover:text-ink-100 transition-all"
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
                <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] border border-rust-500/40 flex items-center justify-center">
                  <CheckCircle className="text-rust-500" size={26} />
                </div>
                <h3 className="font-display font-semibold text-ink-100">Message Sent!</h3>
                <p className="font-body text-ink-400 text-sm">
                  Thanks for reaching out. I'll be in touch soon.
                </p>
                <button onClick={onClose} className="mt-3 btn-primary text-xs py-2 px-5">
                  Close
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label className="font-mono text-[10px] text-ink-500 tracking-wide uppercase block mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jeeni Shrestha"
                    className={`${inputBase} ${
                      errors.name ? 'border-red-500/60' : 'border-ink-700 focus:border-rust-500'
                    }`}
                  />
                  {errors.name && <p className="font-mono text-[10px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="font-mono text-[10px] text-ink-500 tracking-wide uppercase block mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className={`${inputBase} ${
                      errors.email ? 'border-red-500/60' : 'border-ink-700 focus:border-rust-500'
                    }`}
                  />
                  {errors.email && <p className="font-mono text-[10px] text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="font-mono text-[10px] text-ink-500 tracking-wide uppercase block mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell me about your project or just say hello..."
                    className={`${inputBase} resize-none ${
                      errors.message ? 'border-red-500/60' : 'border-ink-700 focus:border-rust-500'
                    }`}
                  />
                  {errors.message && <p className="font-mono text-[10px] text-red-400 mt-1">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/5">
                    <AlertCircle size={13} className="text-red-400 flex-shrink-0" />
                    <p className="font-mono text-[11px] text-red-400">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
