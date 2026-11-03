import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { diagherDiagram } from '../data/content'

export default function ArchitectureDiagram() {
  const defaultBox = diagherDiagram.boxes.find((b) => b.default) || diagherDiagram.boxes[0]
  const [selectedId, setSelectedId] = useState(defaultBox.id)
  const selected = diagherDiagram.boxes.find((b) => b.id === selectedId)

  return (
    <div className="bg-lilac/50 border-2 border-plum p-5 md:p-7 mt-6">
      <p className="api-label mb-4">System architecture</p>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
        {diagherDiagram.boxes.map((box, i) => {
          const isSelected = selectedId === box.id
          return (
            <React.Fragment key={box.id}>
              <button
                type="button"
                onClick={() => setSelectedId(box.id)}
                aria-pressed={isSelected}
                className="flex-1 font-mono text-[13px] sm:text-sm px-3 py-4 border-2 border-plum text-center transition-all duration-150"
                style={
                  isSelected
                    ? { background: 'var(--plum, #493744)', color: '#F7EEDB', boxShadow: '6px 6px 0 #EBC4D5' }
                    : { background: '#FFFDF8', color: '#493744' }
                }
              >
                {box.label}
              </button>
              {i < diagherDiagram.boxes.length - 1 && (
                <>
                  <ArrowRight size={20} className="hidden md:block text-plum flex-shrink-0" aria-hidden="true" />
                  <ArrowDown size={20} className="md:hidden text-plum mx-auto" aria-hidden="true" />
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
          className="mt-6 bg-paper border-2 border-plum p-5"
        >
          <p className="api-label mb-1.5">{selected.title}</p>
          <p className="font-body text-plum/85 text-[15px] leading-relaxed mb-3">
            {selected.explanation}
          </p>
          <pre className="font-mono text-xs text-plum bg-lilac/40 border border-plum/20 p-3 overflow-x-auto">
            {selected.code}
          </pre>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
