import React from 'react'

const COLORS = {
  lilac: 'rgba(216, 220, 235, 0.8)',
  rose: 'rgba(235, 196, 213, 0.8)',
}

export default function WashiTape({ className = '', color = 'lilac', rotate = -3, width = 64, height = 24, center = false }) {
  const transform = center
    ? `translateX(-50%) rotate(${rotate}deg)`
    : `rotate(${rotate}deg)`

  return (
    <div
      aria-hidden="true"
      className={`washi-tape ${className}`}
      style={{
        background: COLORS[color] || color,
        width,
        height,
        transform,
      }}
    />
  )
}
