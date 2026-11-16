import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { hero } from '../data/content'

export default function PolaroidPhoto() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="tone-light" style={{ perspective: "1200px" }}>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? 'Show photo side of polaroid' : 'Flip polaroid to see a few facts about Jeeni'}
        className="relative block w-[240px] h-[300px] md:w-[270px] md:h-[335px] rounded-sm"
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front: photo */}
          <div
            aria-hidden={flipped}
            className="absolute inset-0 bg-paper border border-ink/15 p-3.5 pb-9"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'none',
              boxShadow: '0 1px 2px rgba(53,16,30,0.06), 0 14px 36px rgba(53,16,30,0.08)',
            }}
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src={hero.photo}
                alt="Jeeni Shrestha"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-rose text-center absolute bottom-3 left-0 right-0">
              {hero.photoCaption}
            </p>
          </div>

          {/* Back: handwritten facts */}
          <div
            aria-hidden={!flipped}
            className="absolute inset-0 bg-paper border border-ink/15 p-6 flex flex-col justify-center gap-3"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: '0 1px 2px rgba(53,16,30,0.06), 0 14px 36px rgba(53,16,30,0.08)',
            }}
          >
            {hero.polaroidBackFacts.map((fact, i) => (
              <p key={i} className="font-display text-xl text-ink leading-snug text-center">
                {fact}
              </p>
            ))}
          </div>
        </motion.div>
      </button>
    </div>
  )
}
