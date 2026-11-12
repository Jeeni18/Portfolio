import React, { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import Avatar from './Avatar'
import Desk from './Desk'

const SCREEN_W = 0.29
const SCREEN_H = 0.155
const CANVAS_W = 320
const CANVAS_H = 172

const WALK_DURATION = 2.0
const ARRIVE_DURATION = 0.4
const SETTLE_T = WALK_DURATION + ARRIVE_DURATION
const START_X = -1.9
const STAND_POSITION = [0.1, 0, 0.32]
const IDLE_SHOULDER = -0.12
const IDLE_ELBOW = 0.2

const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (x) => Math.max(0, Math.min(1, x))

function ScreenTexture({ lines, active, reducedMotion }) {
  const startedRef = useRef(false)
  const fullText = useMemo(() => lines.join('\n'), [lines])

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
    ctx.fillStyle = '#FFFDF8'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
    ctx.fillStyle = '#493744'
    ctx.font = '20px "JetBrains Mono", monospace'
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
    if (!active) {
      if (!startedRef.current) draw('', false)
      return
    }
    if (startedRef.current) return
    startedRef.current = true

    if (reducedMotion) {
      draw(fullText, true)
      return
    }

    let i = 0
    const speed = 30
    const tick = () => {
      i += 1
      draw(fullText.slice(0, i), true)
      if (i < fullText.length) {
        setTimeout(tick, speed)
      } else {
        const blink = () => {
          draw(fullText, Math.floor(state.clock.elapsedTime * 2) % 2 === 0)
          requestAnimationFrame(blink)
        }
        blink()
      }
    }
    tick()
  })

  return (
    <mesh position={[0, 0, 0.001]}>
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

function Rig({ reducedMotion, onTypingStart }) {
  const rig = useRef({})
  const typingTriggeredRef = useRef(false)

  useFrame((state) => {
    const r = rig.current
    if (!r.root) return

    if (reducedMotion) {
      r.root.position.set(STAND_POSITION[0], 0, STAND_POSITION[2])
      r.root.rotation.y = 0.25
      r.hipL.rotation.x = 0
      r.hipR.rotation.x = 0
      r.kneeL.rotation.x = 0
      r.kneeR.rotation.x = 0
      r.shoulderL.rotation.x = IDLE_SHOULDER
      r.shoulderR.rotation.x = IDLE_SHOULDER
      r.elbowL.rotation.x = IDLE_ELBOW
      r.elbowR.rotation.x = IDLE_ELBOW
      r.torso.position.y = 0.5
      if (!typingTriggeredRef.current) {
        typingTriggeredRef.current = true
        onTypingStart()
      }
      return
    }

    const t = state.clock.elapsedTime

    if (t < WALK_DURATION) {
      const p = easeInOutCubic(clamp01(t / WALK_DURATION))
      const cycle = t * 7
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
      r.elbowL.rotation.x = 0.3
      r.elbowR.rotation.x = 0.3

      r.torso.position.y = 0.5
      r.head.rotation.z = Math.sin(cycle * 0.5) * 0.03
    } else if (t < SETTLE_T) {
      const q = easeInOutCubic(clamp01((t - WALK_DURATION) / ARRIVE_DURATION))

      r.root.position.set(STAND_POSITION[0], 0, STAND_POSITION[2])
      r.root.rotation.y = lerp(0.35, 0.25, q)

      r.hipL.rotation.x = lerp(0.1, 0, q)
      r.hipR.rotation.x = lerp(-0.1, 0, q)
      r.kneeL.rotation.x = lerp(0.15, 0, q)
      r.kneeR.rotation.x = lerp(0.15, 0, q)

      r.shoulderL.rotation.x = lerp(-0.1, IDLE_SHOULDER, q)
      r.shoulderR.rotation.x = lerp(0.1, IDLE_SHOULDER, q)
      r.elbowL.rotation.x = lerp(0.3, IDLE_ELBOW, q)
      r.elbowR.rotation.x = lerp(0.3, IDLE_ELBOW, q)

      r.torso.position.y = 0.5
      r.head.rotation.z = 0
    } else {
      if (!typingTriggeredRef.current) {
        typingTriggeredRef.current = true
        onTypingStart()
      }

      const breathe = Math.sin(t * 1.3) * 0.006
      const sway = Math.sin(t * 0.5) * 0.04

      r.root.position.set(STAND_POSITION[0], breathe, STAND_POSITION[2])
      r.root.rotation.y = 0.25 + sway * 0.3

      r.hipL.rotation.x = 0
      r.hipR.rotation.x = 0
      r.kneeL.rotation.x = 0
      r.kneeR.rotation.x = 0

      r.shoulderL.rotation.x = IDLE_SHOULDER + sway * 0.2
      r.shoulderR.rotation.x = IDLE_SHOULDER - sway * 0.2
      r.elbowL.rotation.x = IDLE_ELBOW
      r.elbowR.rotation.x = IDLE_ELBOW

      r.torso.position.y = 0.5
      r.head.rotation.z = Math.sin(t * 0.6) * 0.025
    }
  })

  return <Avatar rig={rig} />
}

export default function HeroScene({ reducedMotion, lines }) {
  const [typingActive, setTypingActive] = useState(false)

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
        <Desk screenContent={<ScreenTexture lines={lines} active={typingActive} reducedMotion={reducedMotion} />} />
        <Rig reducedMotion={reducedMotion} onTypingStart={() => setTypingActive(true)} />
        <ContactShadows position={[0, 0.001, 0]} opacity={0.35} scale={3} blur={2.4} far={1} color="#493744" />
      </group>
    </Canvas>
  )
}
