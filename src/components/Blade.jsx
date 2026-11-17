import React from 'react'

// One whole-word blade of the departure board. Static: the board's content
// is "printed" on it; the board itself moves (see Hero.jsx), never the text.
//
// Styles are plain CSS in index.css (.blade, .blade--<variant>): the hinge
// line is the blade's ::after, above the background and below the text.
// Text contrast (WCAG): cream on charcoal 11.6:1, cream on burgundy 9.8:1,
// dusty pink on charcoal 8.4:1, burgundy on cream 9.8:1, cream on oxblood
// 14:1, cream on rose 4.9:1, burgundy on dusty pink 5.8:1.
//
//   variant    cream | dark | status | plum | rose | dusty
//   secondary  dusty-pink text instead of the variant's text colour
//   center     centre the text
const VARIANTS = ['cream', 'dark', 'status', 'plum', 'rose', 'dusty']

export default function Blade({
  variant = 'dark',
  text,
  secondary = false,
  center = false,
  as: Tag = 'div',
  className = '',
  textClassName = '',
  ...rest
}) {
  const v = VARIANTS.includes(variant) ? variant : 'dark'
  const tone = `blade--${v}${secondary ? ' blade--secondary' : ''}`
  const layer = `blade-layer${center ? ' blade-layer--center' : ''} ${textClassName}`

  return (
    <Tag className={`blade ${tone} ${className}`} {...rest}>
      <span className={layer}>{text}</span>
    </Tag>
  )
}
