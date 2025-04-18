// src/components/ContactForm.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useDebounce from '@/hooks/useDebounce'

const DRAFT_KEY = 'contactFormDraft'

export default function ContactForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [shake, setShake] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    // Debounced values for draft saving
    const debouncedName = useDebounce(name, 500)
    const debouncedEmail = useDebounce(email, 500)
    const debouncedMessage = useDebounce(message, 500)

    // Load draft
    useEffect(() => {
        const saved = localStorage.getItem(DRAFT_KEY)
        if (saved) {
            try {
                const { name, email, message } = JSON.parse(saved)
                setName(name)
                setEmail(email)
                setMessage(message)
            } catch { }
        }
    }, [])

    // Save draft on debounced changes
    useEffect(() => {
        localStorage.setItem(
            DRAFT_KEY,
            JSON.stringify({ name: debouncedName, email: debouncedEmail, message: debouncedMessage })
        )
    }, [debouncedName, debouncedEmail, debouncedMessage])

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !email.trim() || !message.trim()) {
          // ...保持原有的验证与抖动逻辑
          return
        }
        try {
          const res = await fetch(
            'https://formsubmit.co/ajax/592d57d00826cea6277aaa24235f2560',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({ name, email, message })
            }
          )
          const json = await res.json()
          if (json.success) {
            setName('')
            setEmail('')
            setMessage('')
            localStorage.removeItem(DRAFT_KEY)
            alert('Message sent! Thanks for reaching out.')
          } else {
            throw new Error('Failed')
          }
        } catch {
          alert('Send failed—please try again later.')
        }
      }
      

    return (
        <AnimatePresence>
            <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className="glass-card p-8 space-y-6 w-full min-w-400px max-w-[60vw] mx-auto"
                aria-label="Contact form"
            >
                {/* Name Field */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <label className="relative block">
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="glass-input peer placeholder-transparent"
                            placeholder="Name"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-2 peer-valid:text-xs">
                            Name
                        </span>
                    </label>
                </motion.div>

                {/* Email Field */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <label className="relative block">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="glass-input peer placeholder-transparent"
                            placeholder="you@example.com"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-2 peer-valid:text-xs">
                            Email
                        </span>
                    </label>
                </motion.div>

                {/* Message Field */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <label className="relative block">
                        <textarea
                            rows={4}
                            required
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="glass-input peer placeholder-transparent resize-none"
                            placeholder="Your message"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-2 peer-valid:text-xs">
                            Message
                        </span>
                    </label>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn w-full py-3"
                >
                    Send Message
                </motion.button>
            </motion.form>
        </AnimatePresence>
    )
}
