import React, { forwardRef } from 'react'

// A departure board (plain CSS in index.css: .board, .board__meta,
// .board__leg, .board__handle): #121013 face inside a 4px #35101E frame,
// rose meta labels top and bottom, blades in between, optional legs down
// to the floor (each with a contact shadow) and an optional handle on the
// right edge.
//
// The board is a size container, so children can size type in `cqw`
// (percent of the board's width) and keep the reference proportions at
// any viewport size. The ref is the board element, so a parent can move
// it (the hero slides it in with a transform).
const Board = forwardRef(function Board({
  label,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  legs = false,
  legHeight = 0,
  handleTop = null,
  className = '',
  bodyClassName = '',
  metaClassName = '',
  topClassName = '',
  bottomClassName = '',
  style,
  children,
}, ref) {
  return (
    <section ref={ref} aria-label={label} className={`board relative ${className}`} style={style}>
      {(topLeft || topRight) && (
        <div className={`board__meta ${metaClassName} ${topClassName}`}>
          <span>{topLeft}</span>
          <span className="whitespace-nowrap">{topRight}</span>
        </div>
      )}

      <div className={`flex-1 flex flex-col ${bodyClassName}`}>{children}</div>

      {(bottomLeft || bottomRight) && (
        <div className={`board__meta ${metaClassName} ${bottomClassName}`}>
          <span>{bottomLeft}</span>
          <span className="whitespace-nowrap">{bottomRight}</span>
        </div>
      )}

      {legs && legHeight > 0 && (
        <>
          {['25%', '75%'].map((left) => (
            <React.Fragment key={left}>
              <span aria-hidden="true" className="board__leg" style={{ left, height: legHeight }} />
              <span aria-hidden="true" className="board__leg-shadow" style={{ left, top: `calc(100% + ${legHeight - 3}px)` }} />
            </React.Fragment>
          ))}
        </>
      )}

      {handleTop !== null && <span aria-hidden="true" className="board__handle" style={{ top: handleTop }} />}
    </section>
  )
})

export default Board
