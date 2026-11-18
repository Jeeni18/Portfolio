import React, { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

// Thin outline circle, matching the nav's "contact" button: 1px #D5B7B8
// border, transparent fill, cream icon, fixed bottom-right. Styles are
// plain CSS (.chat-btn in index.css). In the hero it sits in the floor
// band's corner, below the scroll cue and clear of the mini-me.
//
// It must never cover content. From 1024px up every section keeps its
// right edge clear of it (.s-col). Below that the columns are too narrow
// to give up a gutter, so it shows only while the hero is on screen (the
// nav menu and the contact section stay available further down).
const WIDE = '(min-width: 1024px)'

export default function FloatingContact({ onClick }) {
  const [heroInView, setHeroInView] = useState(true)
  const [wide, setWide] = useState(() => window.matchMedia(WIDE).matches)

  useEffect(() => {
    const mq = window.matchMedia(WIDE)
    const sync = () => setWide(mq.matches)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return undefined
    // "In view" = the hero still covers the bottom 100px of the screen,
    // where the button sits: About's top edge is still below that line
    // (the same as the hero's bottom edge, and right while the sticky hero
    // is being covered).
    const about = document.getElementById('about')
    const probe = () => setHeroInView((about || hero).getBoundingClientRect()[about ? 'top' : 'bottom'] > window.innerHeight - 100)
    window.addEventListener('scroll', probe, { passive: true })
    window.addEventListener('resize', probe)
    probe()
    return () => {
      window.removeEventListener('scroll', probe)
      window.removeEventListener('resize', probe)
    }
  }, [])

  if (!wide && !heroInView) return null

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
