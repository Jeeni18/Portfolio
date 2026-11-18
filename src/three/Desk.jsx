import React from 'react'
import { FLOOR_Y, SEAT_POSITION, SEAT_HEIGHT, DESK_HEIGHT, DESK_TOP_THICKNESS, DESK, LAPTOP, CHAIR, DESK_LEG } from './layout'

// Hero room: charcoal desk top on thin near-black legs, charcoal chair,
// so she and her laptop are the brightest things in the alcove. Sized to
// her proportions (see layout.js) and standing on her floor (FLOOR_Y).
// Dark theme (as always) and light theme ("Rose quartz and mauve": the
// desk and chair in plum, legs and laptop in deep plum).
const COLORS = {
  dark: { wood: '#29232A', woodDark: '#151116', chair: '#3A3139', chairDark: '#29232A' },
  light: { wood: '#3B2230', woodDark: '#2A1822', chair: '#3B2230', chairDark: '#2A1822' },
}

// Thin, straight legs in proportion to the desk's height (DESK_LEG, layout.js).
const LEG_INSET = 0.03

function Box({ position, size, color }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  )
}

// `chairRef`: the chair's group, so she can scoot it in to type.
export default function Desk({ screenContent, chairRef = null, light = false }) {
  const c = light ? COLORS.light : COLORS.dark
  const deskCz = DESK.frontZ + DESK.length / 2
  const legH = DESK_HEIGHT - DESK_TOP_THICKNESS
  const legX = DESK.width / 2 - LEG_INSET
  const legZ = DESK.length / 2 - LEG_INSET
  const seatLegH = SEAT_HEIGHT - CHAIR.seat
  const cx = CHAIR.width / 2 - 0.02
  const cz = CHAIR.depth / 2 - 0.02
  return (
    <group position={[0, FLOOR_Y, 0]}>
      {/* Desk top + legs */}
      <Box position={[DESK.x, DESK_HEIGHT - DESK_TOP_THICKNESS / 2, deskCz]} size={[DESK.width, DESK_TOP_THICKNESS, DESK.length]} color={c.wood} />
      {[-1, 1].map((sx) => [-1, 1].map((sz) => (
        <Box key={`${sx}${sz}`} position={[DESK.x + sx * legX, legH / 2, deskCz + sz * legZ]} size={[DESK_LEG, legH, DESK_LEG]} color={c.woodDark} />
      )))}

      {/* Laptop: same size as before, near the desk's front edge, screen
          at the far side tilted back (~106 deg open), facing her. Built
          facing +z and turned round, as before. */}
      <group position={[LAPTOP.x, DESK_HEIGHT + (LAPTOP.baseH / 2) * LAPTOP.scale, LAPTOP.frontZ + (LAPTOP.depth / 2) * LAPTOP.scale]} rotation={[0, Math.PI, 0]} scale={LAPTOP.scale}>
        <Box position={[0, 0, 0]} size={[LAPTOP.width, LAPTOP.baseH, LAPTOP.depth]} color={c.chairDark} />
        <group position={[0, 0.008, -(LAPTOP.depth / 2 - 0.01)]} rotation={[-LAPTOP.openTilt, 0, 0]}>
          <Box position={[0, 0.095, 0]} size={[LAPTOP.width, 0.19, 0.012]} color={c.chairDark} />
          <group position={[0, 0.095, 0.008]}>{screenContent}</group>
        </group>
      </group>

      {/* Chair: seat a little above her knee height (hips just above her
          knees, feet flat), deep enough to carry her thighs, backrest up to
          her shoulders and clear of her hair. It starts pulled out; she scoots it in
          (chairRef) to type. */}
      <group ref={chairRef} position={[SEAT_POSITION[0], 0, SEAT_POSITION[2]]}>
        <Box position={[0, SEAT_HEIGHT - CHAIR.seat / 2, 0]} size={[CHAIR.width, CHAIR.seat, CHAIR.depth]} color={c.chair} />
        <Box
          position={[0, SEAT_HEIGHT + CHAIR.back / 2, -CHAIR.depth / 2 + CHAIR.backThickness / 2]}
          size={[CHAIR.width, CHAIR.back, CHAIR.backThickness]}
          color={c.chair}
        />
        {[-1, 1].map((sx) => [-1, 1].map((sz) => (
          <Box key={`${sx}${sz}`} position={[sx * cx, seatLegH / 2, sz * cz]} size={[CHAIR.leg, seatLegH, CHAIR.leg]} color={c.chairDark} />
        )))}
      </group>
    </group>
  )
}
