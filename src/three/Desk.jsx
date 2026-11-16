import React from 'react'
import { SEAT_POSITION } from './layout'

// Hero room: charcoal desk top on thin near-black legs, charcoal chair,
// so she and her laptop are the brightest things in the alcove.
// (Names kept for the geometry below.)
const WOOD = '#29232A'
const WOOD_DARK = '#151116'
const LEG = 0.026
const PLUM = '#3A3139'
const PLUM_DARK = '#29232A'

const DESK_TOP_Y = 0.72
const DESK_X = 0.3
const DESK_Z = -0.32

function DeskLeg({ x, z }) {
  return (
    <mesh position={[x, DESK_TOP_Y / 2, z]} castShadow>
      <boxGeometry args={[LEG, DESK_TOP_Y, LEG]} />
      <meshStandardMaterial color={WOOD_DARK} flatShading />
    </mesh>
  )
}

export default function Desk({ screenContent }) {
  return (
    <group>
      {/* Desk top */}
      <mesh position={[DESK_X, DESK_TOP_Y, DESK_Z]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.04, 0.5]} />
        <meshStandardMaterial color={WOOD} flatShading />
      </mesh>
      <DeskLeg x={DESK_X - 0.44} z={DESK_Z - 0.21} />
      <DeskLeg x={DESK_X + 0.44} z={DESK_Z - 0.21} />
      <DeskLeg x={DESK_X - 0.44} z={DESK_Z + 0.21} />
      <DeskLeg x={DESK_X + 0.44} z={DESK_Z + 0.21} />

      {/* Chair -- seat height tuned to where the character's own leg
          proportions naturally land when seated (see SEAT_HIP/SEAT_KNEE
          in HeroScene.jsx), not an arbitrary chair height */}
      <group position={SEAT_POSITION}>
        <mesh position={[0, 0.26, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.36, 0.04, 0.34]} />
          <meshStandardMaterial color={PLUM} flatShading />
        </mesh>
        <mesh position={[0, 0.49, -0.16]} castShadow>
          <boxGeometry args={[0.36, 0.42, 0.04]} />
          <meshStandardMaterial color={PLUM} flatShading />
        </mesh>
        <mesh position={[-0.15, 0.12, -0.13]} castShadow>
          <boxGeometry args={[0.03, 0.24, 0.03]} />
          <meshStandardMaterial color={PLUM_DARK} flatShading />
        </mesh>
        <mesh position={[0.15, 0.12, -0.13]} castShadow>
          <boxGeometry args={[0.03, 0.24, 0.03]} />
          <meshStandardMaterial color={PLUM_DARK} flatShading />
        </mesh>
        <mesh position={[-0.15, 0.12, 0.13]} castShadow>
          <boxGeometry args={[0.03, 0.24, 0.03]} />
          <meshStandardMaterial color={PLUM_DARK} flatShading />
        </mesh>
        <mesh position={[0.15, 0.12, 0.13]} castShadow>
          <boxGeometry args={[0.03, 0.24, 0.03]} />
          <meshStandardMaterial color={PLUM_DARK} flatShading />
        </mesh>
      </group>

      {/* Laptop */}
      <group position={[DESK_X, DESK_TOP_Y + 0.02, DESK_Z - 0.1]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.34, 0.015, 0.24]} />
          <meshStandardMaterial color={PLUM_DARK} flatShading />
        </mesh>
        <group position={[0, 0.008, -0.11]} rotation={[-0.25, 0, 0]}>
          <mesh position={[0, 0.095, 0]} castShadow>
            <boxGeometry args={[0.34, 0.19, 0.012]} />
            <meshStandardMaterial color={PLUM_DARK} flatShading />
          </mesh>
          <group position={[0, 0.095, 0.008]}>{screenContent}</group>
        </group>
      </group>
    </group>
  )
}
