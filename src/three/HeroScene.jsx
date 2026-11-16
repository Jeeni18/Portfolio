import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import Avatar from './Avatar'
import Desk from './Desk'
import { T, timeline, progress } from '../hooks/introTimeline'

const SCREEN_W = 0.29
const SCREEN_H = 0.155
const CANVAS_W = 320
const CANVAS_H = 172

const START_X = -1.6
const STAND_POSITION = [0.1, 0, 0.32]
const IDLE_SHOULDER = -0.12
const IDLE_ELBOW = 0.2

// Seated pose -- the torso height is a fixed offset from `root`, decoupled
// from the leg chain, so sitting means lowering root.position.y (and x/z
// toward the chair) while bending hip+knee together. Values picked so the
// feet land near the floor and the knees clear the desk; tuned by eye
// against the actual chair/desk geometry in Desk.jsx, not derived to hit
// an exact seat height.
const SEAT_ROOT = [0.08, -0.22, 0.12]
const SEAT_HIP = -1.3
const SEAT_KNEE = 1.2
const SEAT_SHOULDER = -0.05
const SEAT_ELBOW = 0.55

// Quick reach toward the laptop after sitting. The laptop sits to her
// right and slightly behind, so the right arm lifts sideways (z, like the
// wave but lower), eases a touch back (x), and the elbow folds toward the
// keyboard -- then everything returns to the lap.
const TAP_SHOULDER_X = -0.35
const TAP_SHOULDER_Z = 1.35
const TAP_ELBOW = 0.6

const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (x) => Math.max(0, Math.min(1, x))

// Laptop screen. Types the same text as the projector screen, driven by
// the shared timeline, and also publishes its own on-canvas pixel
// position every frame so the DOM beam can start exactly from it.
function ScreenTexture({ lines, reducedMotion }) {
  const meshRef = useRef()
  const lastDrawRef = useRef({ chars: -1, cursor: null })
  const worldPos = useMemo(() => new THREE.Vector3(), [])
  const fullText = useMemo(() => lines.join('\n'), [lines])
  const { camera, size } = useThree()

  const { canvas, texture } = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = CANVAS_W
    canvas.height = CANVAS_H
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return { canvas, texture }
  }, [])

  const draw = (text, showCursor) => {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#FAF6F0'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
    ctx.fillStyle = '#29232A'
    ctx.font = '20px "IBM Plex Mono", monospace'
    ctx.textBaseline = 'top'
    const textLines = text.split('\n')
    textLines.forEach((line, i) => ctx.fillText(line, 14, 14 + i * 28))
    if (showCursor) {
      const lastLine = textLines[textLines.length - 1] || ''
      const width = ctx.measureText(lastLine).width
      ctx.fillRect(14 + width + 2, 14 + (textLines.length - 1) * 28, 10, 20)
    }
    texture.needsUpdate = true
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.getWorldPosition(worldPos)
      worldPos.project(camera)
      timeline.setLaptopPx(((worldPos.x + 1) / 2) * size.width, ((1 - worldPos.y) / 2) * size.height)
    }

    const t = timeline.getT()
    const typed = progress(t, T.LAPTOP_TYPE_START, T.LAPTOP_TYPE_END - T.LAPTOP_TYPE_START)
    const chars = Math.round(typed * fullText.length)
    const started = t >= T.LAPTOP_TYPE_START
    const cursor = started && (reducedMotion || Math.floor(state.clock.elapsedTime * 2) % 2 === 0)

    const prev = lastDrawRef.current
    if (prev.chars === chars && prev.cursor === cursor) return
    lastDrawRef.current = { chars, cursor }
    draw(fullText.slice(0, chars), cursor)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0.001]}>
      <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

function CameraAim({ target }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.lookAt(...target)
  })
  return null
}

// Pose per timeline phase. Reads `t` from the shared intro timeline; the
// timeline owns its own clock so skip/replay/reduced-motion all work the
// same way here and in the DOM.
function Rig({ reducedMotion }) {
  const rig = useRef({})

  useFrame((state) => {
    const r = rig.current
    if (!r.root) return

    // The sequence starts on the first rendered frame, so the walk never
    // runs while the canvas is still loading. No-op if Hero already
    // decided to show the final state.
    timeline.start()

    const t = timeline.getT()
    const clock = state.clock.elapsedTime

    if (t < T.WALK_END) {
      const p = easeInOutCubic(clamp01(t / T.WALK_END))
      const cycle = t * 11
      const swing = Math.sin(cycle) * 0.55
      const armSwing = Math.sin(cycle) * 0.4

      r.root.position.set(lerp(START_X, STAND_POSITION[0], p), Math.abs(Math.sin(cycle * 2)) * 0.012, lerp(-0.1, STAND_POSITION[2], p))
      r.root.rotation.y = 0.35

      r.hipL.rotation.x = swing
      r.hipR.rotation.x = -swing
      r.kneeL.rotation.x = Math.max(0, Math.sin(cycle)) * 0.9
      r.kneeR.rotation.x = Math.max(0, -Math.sin(cycle)) * 0.9

      r.shoulderL.rotation.x = -armSwing
      r.shoulderR.rotation.x = armSwing
      r.shoulderR.rotation.z = 0
      r.elbowL.rotation.x = 0.3
      r.elbowR.rotation.x = 0.3

      r.torso.position.y = 0.5
      r.head.rotation.x = 0
      r.head.rotation.z = Math.sin(cycle * 0.5) * 0.03
    } else if (t < T.ARRIVE_END) {
      const q = easeInOutCubic(progress(t, T.WALK_END, T.ARRIVE_END - T.WALK_END))

      r.root.position.set(STAND_POSITION[0], 0, STAND_POSITION[2])
      r.root.rotation.y = lerp(0.35, 0.25, q)

      r.hipL.rotation.x = lerp(0.1, 0, q)
      r.hipR.rotation.x = lerp(-0.1, 0, q)
      r.kneeL.rotation.x = lerp(0.15, 0, q)
      r.kneeR.rotation.x = lerp(0.15, 0, q)

      r.shoulderL.rotation.x = lerp(-0.1, IDLE_SHOULDER, q)
      r.shoulderR.rotation.x = lerp(0.1, IDLE_SHOULDER, q)
      r.shoulderR.rotation.z = 0
      r.elbowL.rotation.x = lerp(0.3, IDLE_ELBOW, q)
      r.elbowR.rotation.x = lerp(0.3, IDLE_ELBOW, q)

      r.torso.position.y = 0.5
      r.head.rotation.x = 0
      r.head.rotation.z = 0
    } else if (t < T.WAVE_END) {
      // Stand still and give a friendly wave with the right arm before
      // sitting down -- rise, hold with a few side-to-side oscillations,
      // then lower back to neutral so the sit transition starts clean.
      const w = progress(t, T.ARRIVE_END, T.WAVE_END - T.ARRIVE_END)
      const rise = easeInOutCubic(clamp01(w / 0.3))
      const lower = easeInOutCubic(clamp01((w - 0.72) / 0.28))
      const lift = rise * (1 - lower)
      const waveCycle = Math.sin(t * 16) * 0.22 * lift

      r.root.position.set(STAND_POSITION[0], 0, STAND_POSITION[2])
      r.root.rotation.y = 0.25

      r.hipL.rotation.x = 0
      r.hipR.rotation.x = 0
      r.kneeL.rotation.x = 0
      r.kneeR.rotation.x = 0

      r.shoulderL.rotation.x = IDLE_SHOULDER
      r.elbowL.rotation.x = IDLE_ELBOW

      r.shoulderR.rotation.x = lerp(IDLE_SHOULDER, -0.15, lift)
      r.shoulderR.rotation.z = lift * 2.0 + waveCycle
      r.elbowR.rotation.x = lerp(IDLE_ELBOW, 1.3, lift)

      r.torso.position.y = 0.5
      r.head.rotation.x = 0
      r.head.rotation.z = 0
    } else if (t < T.SIT_END) {
      // Sit down: lower + pull the root toward the chair while bending
      // hip and knee together, since the torso is a sibling of the legs
      // (not their child) and won't follow a hip bend on its own.
      const s = easeInOutCubic(progress(t, T.WAVE_END, T.SIT_END - T.WAVE_END))

      r.root.position.set(
        lerp(STAND_POSITION[0], SEAT_ROOT[0], s),
        lerp(0, SEAT_ROOT[1], s),
        lerp(STAND_POSITION[2], SEAT_ROOT[2], s)
      )
      r.root.rotation.y = 0.25

      r.hipL.rotation.x = lerp(0, SEAT_HIP, s)
      r.hipR.rotation.x = lerp(0, SEAT_HIP, s)
      r.kneeL.rotation.x = lerp(0, SEAT_KNEE, s)
      r.kneeR.rotation.x = lerp(0, SEAT_KNEE, s)

      r.shoulderL.rotation.x = lerp(IDLE_SHOULDER, SEAT_SHOULDER, s)
      r.shoulderR.rotation.x = lerp(IDLE_SHOULDER, SEAT_SHOULDER, s)
      r.shoulderR.rotation.z = lerp(r.shoulderR.rotation.z, 0, s)
      r.elbowL.rotation.x = lerp(IDLE_ELBOW, SEAT_ELBOW, s)
      r.elbowR.rotation.x = lerp(IDLE_ELBOW, SEAT_ELBOW, s)

      r.torso.position.y = 0.5
      r.head.rotation.x = 0
      r.head.rotation.z = 0
    } else if (t < T.TAP_END) {
      // Tap the laptop: a single out-and-back reach with the right arm,
      // peaking at the moment the projector screen starts rolling down.
      const k = progress(t, T.SIT_END, T.TAP_END - T.SIT_END)
      const bump = Math.sin(k * Math.PI)

      r.root.position.set(SEAT_ROOT[0], SEAT_ROOT[1], SEAT_ROOT[2])
      r.root.rotation.y = 0.25

      r.hipL.rotation.x = SEAT_HIP
      r.hipR.rotation.x = SEAT_HIP
      r.kneeL.rotation.x = SEAT_KNEE
      r.kneeR.rotation.x = SEAT_KNEE

      r.shoulderL.rotation.x = SEAT_SHOULDER
      r.shoulderR.rotation.x = lerp(SEAT_SHOULDER, TAP_SHOULDER_X, bump)
      r.shoulderR.rotation.z = TAP_SHOULDER_Z * bump
      r.elbowL.rotation.x = SEAT_ELBOW
      r.elbowR.rotation.x = lerp(SEAT_ELBOW, TAP_ELBOW, bump)

      r.torso.position.y = 0.5
      r.head.rotation.x = bump * 0.12
      r.head.rotation.z = 0
    } else {
      // Seated idle. Still for reduced-motion users; otherwise a tiny
      // breathe + sway so she doesn't look frozen once the intro is done.
      const live = reducedMotion ? 0 : 1
      const breathe = Math.sin(clock * 1.3) * 0.006 * live
      const sway = Math.sin(clock * 0.5) * 0.03 * live

      r.root.position.set(SEAT_ROOT[0], SEAT_ROOT[1] + breathe, SEAT_ROOT[2])
      r.root.rotation.y = 0.25 + sway * 0.2

      r.hipL.rotation.x = SEAT_HIP
      r.hipR.rotation.x = SEAT_HIP
      r.kneeL.rotation.x = SEAT_KNEE
      r.kneeR.rotation.x = SEAT_KNEE

      r.shoulderL.rotation.x = SEAT_SHOULDER + sway * 0.15
      r.shoulderR.rotation.x = SEAT_SHOULDER - sway * 0.15
      r.shoulderR.rotation.z = 0
      r.elbowL.rotation.x = SEAT_ELBOW
      r.elbowR.rotation.x = SEAT_ELBOW

      r.torso.position.y = 0.5
      r.head.rotation.x = 0
      r.head.rotation.z = Math.sin(clock * 0.6) * 0.02 * live
    }
  })

  return <Avatar rig={rig} />
}

export default function HeroScene({ reducedMotion, lines }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [1.5, 1.7, 3.7], fov: 27 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.65} color="#FFFDF8" />
      <directionalLight position={[2, 3, 2]} intensity={1.1} color="#FFF3E0" castShadow />
      <directionalLight position={[-2, 1.5, -1]} intensity={0.35} color="#D8DCEB" />
      <CameraAim target={[0.0, 0.68, 0.0]} />

      <group position={[-0.25, 0, 0]}>
        <Desk screenContent={<ScreenTexture lines={lines} reducedMotion={reducedMotion} />} />
        <Rig reducedMotion={reducedMotion} />
        <ContactShadows position={[0, 0.001, 0]} opacity={0.35} scale={3} blur={2.4} far={1} color="#35101E" />
      </group>
    </Canvas>
  )
}
