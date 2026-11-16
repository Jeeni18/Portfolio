import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { diagherDiagram } from '../data/content'

export default function ArchitectureDiagram() {
  const defaultBox = diagherDiagram.boxes.find((b) => b.default) || diagherDiagram.boxes[0]
  const [selectedId, setSelectedId] = useState(defaultBox.id)
  const selected = diagherDiagram.boxes.find((b) => b.id === selectedId)

  return (
    <div className="border-t border-ink/15 pt-7 mt-8">
      <p className="api-label mb-5">System architecture</p>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
        {diagherDiagram.boxes.map((box, i) => {
          const isSelected = selectedId === box.id
          return (
            <React.Fragment key={box.id}>
              <button
                type="button"
                onClick={() => setSelectedId(box.id)}
                aria-pressed={isSelected}
                className={`flex-1 font-mono text-[13px] px-3 py-4 border text-center rounded-[2px] transition-colors duration-150 ${
                  isSelected
                    ? 'bg-wine text-cream border-wine'
                    : 'bg-transparent text-ink border-ink/20 hover:border-ink/50'
                }`}
              >
                {box.label}
              </button>
              {i < diagherDiagram.boxes.length - 1 && (
                <>
                  <ArrowRight size={16} strokeWidth={1.5} className="hidden md:block text-ink/40 flex-shrink-0" aria-hidden="true" />
                  <ArrowDown size={16} strokeWidth={1.5} className="md:hidden text-ink/40 mx-auto" aria-hidden="true" />
                </>
              )}
            </React.Fragment>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-5"
        >
          <div>
            <p className="font-display text-ink text-xl mb-2">{selected.title}</p>
            <p className="font-body text-ink/80 text-[15px] leading-relaxed">
              {selected.explanation}
            </p>
          </div>
          <pre className="font-mono text-xs text-bone bg-charcoal p-4 rounded-[2px] overflow-x-auto leading-relaxed">
            {selected.code}
          </pre>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
