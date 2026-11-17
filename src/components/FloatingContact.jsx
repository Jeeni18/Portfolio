import React from 'react'
import { MessageCircle } from 'lucide-react'

// Thin outline circle, matching the nav's "contact" button: 1px #D5B7B8
// border, transparent fill, cream icon, fixed bottom-right. Styles are
// plain CSS (.chat-btn in index.css). In the hero it sits in the floor
// band's corner, below the scroll cue and clear of the mini-me.
export default function FloatingContact({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open contact form"
      title="contact"
      className="chat-btn fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center"
    >
      <MessageCircle size={17} strokeWidth={1.5} />
    </button>
  )
}
