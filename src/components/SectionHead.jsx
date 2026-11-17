import React from 'react'

// Section opener: mono rose label "0X — name", then (optionally) a display
// serif heading with a note on the right: an italic word ("departures") or
// the board index ("03 / 07").
export default function SectionHead({ number, name, title, note, index, id }) {
  return (
    <div className="s-head">
      <p className="s-label">{number} — {name}</p>
      {title && (
        <div className="flex items-end justify-between gap-6">
          <h2 id={id} className="s-title">{title}</h2>
          {note && <p className="s-note pb-[0.1em]" aria-hidden="true">{note}</p>}
          {index && <p className="s-index pb-[0.35em]" aria-hidden="true">{index}</p>}
        </div>
      )}
    </div>
  )
}
