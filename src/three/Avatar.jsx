import React, { useLayoutEffect, useRef } from 'react'

const PALETTE = {
  skin: '#E7B98C',
  hair: '#2E222B',
  hairShine: '#3D2E36',
  sweater: '#F2C9D8',
  sweaterRib: '#E8B4C8',
  pants: '#AFD4E8',
  pantsSeam: '#8FBBD6',
  glasses: '#2E222B',
  shoe: '#F6F1E7',
  shoeSole: '#E4D9C7',
  shoeStripe: '#EE9FC0',
  lace: '#FDFBF7',
  blush: '#E7A5A0',
  headband: '#FFFDF8',
}

// A long strand built from two capsule segments joined at a gentle kink,
// so it reads as a soft wave instead of a perfectly straight rod. The
// second segment hangs from a pivot group at the end of the first.
function WavyStrand({ side, radius, length1, length2, x, y, z, tiltZ, tiltX, kinkZ, kinkX, color = PALETTE.hair }) {
  return (
    <group position={[x * side, y, z]} rotation={[tiltX, 0, tiltZ * side]}>
      <mesh position={[0, -length1 / 2, 0]} castShadow>
        <capsuleGeometry args={[radius, length1 - radius * 1.2, 4, 8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <group position={[0, -length1, 0]} rotation={[kinkX, 0, kinkZ * side]}>
        <mesh position={[0, -length2 / 2, 0]} castShadow>
          <capsuleGeometry args={[radius * 0.88, length2 - radius * 1.1, 4, 8]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
      </group>
    </group>
  )
}

// A short face-framing wisp: a rounded capsule root anchored to the head,
// then a second segment tapering to a sharp point, bent in toward the
// face at the kink instead of hanging straight down.
function FaceWisp({ side, radius, length1, length2, x, y, z, tiltZ, tiltX, kinkZ, kinkX, color = PALETTE.hair }) {
  return (
    <group position={[x * side, y, z]} rotation={[tiltX, 0, tiltZ * side]}>
      <mesh position={[0, -length1 / 2, 0]} castShadow>
        <capsuleGeometry args={[radius, length1 - radius * 1.2, 4, 8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <group position={[0, -length1, 0]} rotation={[kinkX, 0, kinkZ * side]}>
        <mesh position={[0, -length2 / 2, 0]} castShadow>
          <cylinderGeometry args={[radius * 0.85, 0, length2, 8]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
      </group>
    </group>
  )
}

// Hair swept back off the forehead (no fringe) -- straight, layered
// strands that overlap the crown cleanly so nothing reads as a separate,
// disconnected piece.
function HairSide({ side }) {
  return (
    <>
      {/* shortest layer -- pulled further to the side and back, off the
          cheek, so more of the face shows. Tops still overlap the
          (slightly enlarged) crown so there's no gap. A gentle kink partway
          down gives it a soft wave instead of a straight rod. */}
      <WavyStrand side={side} radius={0.058} length1={0.26} length2={0.2} x={0.098} y={-0.192} z={-0.063} tiltZ={0.04} tiltX={0.06} kinkZ={-0.16} kinkX={0.08} color={PALETTE.hairShine} />
      {/* mid layer -- fills the gap between the other layers for extra body */}
      <WavyStrand side={side} radius={0.048} length1={0.32} length2={0.26} x={0.1} y={-0.215} z={-0.045} tiltZ={0.045} tiltX={0.1} kinkZ={0.2} kinkX={0.1} />
      {/* longest layer -- falls well past the elbow, toward the hip */}
      <WavyStrand side={side} radius={0.062} length1={0.36} length2={0.3} x={0.093} y={-0.26} z={-0.067} tiltZ={0.03} tiltX={0.09} kinkZ={-0.22} kinkX={0.12} />
      {/* front piece -- starts closer to the back of the head and leans
          forward as it falls, reaching the chest without draping across
          the cheek near the top */}
      <WavyStrand side={side} radius={0.064} length1={0.3} length2={0.26} x={0.095} y={-0.229} z={-0.012} tiltZ={0.06} tiltX={0.13} kinkZ={0.18} kinkX={-0.08} color={PALETTE.hairShine} />
      {/* loose wisps breaking the headband's line at the temple -- rounded
          where they meet the head, tapering to a sharp point that curls
          in toward the face instead of hanging straight. */}
      <FaceWisp side={side} radius={0.016} length1={0.05} length2={0.045} x={0.115} y={0.05} z={0.085} tiltZ={0.08} tiltX={0.3} kinkZ={0.05} kinkX={-0.5} color={PALETTE.hairShine} />
      <FaceWisp side={side} radius={0.014} length1={0.045} length2={0.04} x={0.12} y={0.02} z={0.09} tiltZ={0.1} tiltX={0.32} kinkZ={0.08} kinkX={-0.52} />
    </>
  )
}

// Small ribbon bow clipped in near the part, instead of a full headband.
function Ribbon() {
  return (
    <group position={[-0.065, 0.195, 0.075]} rotation={[-0.3, -0.1, 0.25]}>
      <mesh position={[-0.026, 0, 0]} rotation={[0, 0, 0.5]} scale={[1, 0.62, 0.45]} castShadow>
        <sphereGeometry args={[0.026, 8, 8]} />
        <meshStandardMaterial color={PALETTE.headband} flatShading />
      </mesh>
      <mesh position={[0.026, 0, 0]} rotation={[0, 0, -0.5]} scale={[1, 0.62, 0.45]} castShadow>
        <sphereGeometry args={[0.026, 8, 8]} />
        <meshStandardMaterial color={PALETTE.headband} flatShading />
      </mesh>
      <mesh castShadow>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color={PALETTE.headband} flatShading />
      </mesh>
    </group>
  )
}

function ShoeStripes({ y, z, halfWidth = 0.053 }) {
  return (
    <>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[halfWidth * side, y - 0.009, z]} castShadow>
            <boxGeometry args={[0.004, 0.011, 0.13]} />
            <meshStandardMaterial color={PALETTE.shoeStripe} flatShading />
          </mesh>
          <mesh position={[halfWidth * side, y + 0.009, z]} castShadow>
            <boxGeometry args={[0.004, 0.011, 0.13]} />
            <meshStandardMaterial color={PALETTE.shoeStripe} flatShading />
          </mesh>
        </group>
      ))}
    </>
  )
}

function ShoeLaces({ y, z }) {
  const rungs = [-0.016, 0.006, 0.028]
  return (
    <>
      {/* Lace panel sized to sit on the shoe, not overhang it */}
      <mesh position={[0, y, z]} castShadow>
        <boxGeometry args={[0.09, 0.008, 0.05]} />
        <meshStandardMaterial color={PALETTE.lace} flatShading />
      </mesh>
      {rungs.map((zOff) => (
        <mesh key={zOff} position={[0, y + 0.006, z + zOff]} rotation={[0, 0, 0.5]} castShadow>
          <boxGeometry args={[0.032, 0.006, 0.006]} />
          <meshStandardMaterial color="#C9BFAE" flatShading />
        </mesh>
      ))}
    </>
  )
}

function Face() {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Eyes */}
      <mesh position={[-0.052, 0, 0.138]} scale={[1, 1.1, 0.4]} castShadow>
        <sphereGeometry args={[0.017, 8, 8]} />
        <meshStandardMaterial color={PALETTE.hair} flatShading />
      </mesh>
      <mesh position={[0.052, 0, 0.138]} scale={[1, 1.1, 0.4]} castShadow>
        <sphereGeometry args={[0.017, 8, 8]} />
        <meshStandardMaterial color={PALETTE.hair} flatShading />
      </mesh>

      {/* Eyebrows */}
      <mesh position={[-0.052, 0.04, 0.13]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[0.035, 0.006, 0.006]} />
        <meshStandardMaterial color={PALETTE.hair} flatShading />
      </mesh>
      <mesh position={[0.052, 0.04, 0.13]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.035, 0.006, 0.006]} />
        <meshStandardMaterial color={PALETTE.hair} flatShading />
      </mesh>

      {/* Blush */}
      <mesh position={[-0.085, -0.035, 0.11]} scale={[1, 0.6, 0.3]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshStandardMaterial color={PALETTE.blush} flatShading transparent opacity={0.55} />
      </mesh>
      <mesh position={[0.085, -0.035, 0.11]} scale={[1, 0.6, 0.3]}>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshStandardMaterial color={PALETTE.blush} flatShading transparent opacity={0.55} />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, -0.065, 0.135]}>
        <boxGeometry args={[0.028, 0.006, 0.006]} />
        <meshStandardMaterial color="#8A5A52" flatShading />
      </mesh>
    </group>
  )
}

// A capsule limb segment, optionally rounded into its parent with a joint
// sphere at the pivot so bends read as soft and connected, not boxy.
function Limb({ pivotRef, length, radius = 0.07, color, children, position = [0, 0, 0], jointRadius }) {
  return (
    <group ref={pivotRef} position={position}>
      {jointRadius && (
        <mesh castShadow>
          <sphereGeometry args={[jointRadius, 10, 10]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
      )}
      <mesh position={[0, -length / 2, 0]} castShadow>
        <capsuleGeometry args={[radius, length - radius * 1.6, 4, 8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <group position={[0, -length, 0]}>{children}</group>
    </group>
  )
}

/**
 * Procedural "miniature" figure with rounded, Brookhaven-style proportions.
 * Every joint is exposed as a ref via the `rig` object so a parent
 * useFrame loop can pose it imperatively (no per-frame React re-renders).
 */
export default function Avatar({ rig }) {
  const root = useRef(null)
  const hipL = useRef(null)
  const kneeL = useRef(null)
  const hipR = useRef(null)
  const kneeR = useRef(null)
  const shoulderL = useRef(null)
  const elbowL = useRef(null)
  const shoulderR = useRef(null)
  const elbowR = useRef(null)
  const torso = useRef(null)
  const head = useRef(null)

  useLayoutEffect(() => {
    if (!rig) return
    rig.current = {
      root: root.current,
      hipL: hipL.current,
      kneeL: kneeL.current,
      hipR: hipR.current,
      kneeR: kneeR.current,
      shoulderL: shoulderL.current,
      elbowL: elbowL.current,
      shoulderR: shoulderR.current,
      elbowR: elbowR.current,
      torso: torso.current,
      head: head.current,
    }
  }, [rig])

  const hipHeight = 0.5
  const upperLeg = 0.3
  const lowerLeg = 0.28
  const upperArm = 0.26
  const lowerArm = 0.24

  return (
    <group ref={root}>
      {/* Legs -- light blue flare jeans, fitted through the knee then
          flaring out to the ankle, rounded hip/knee joints */}
      <group position={[-0.075, hipHeight, 0]}>
        <Limb pivotRef={hipL} length={upperLeg} radius={0.066} jointRadius={0.068} color={PALETTE.pants}>
          <group ref={kneeL}>
            <mesh castShadow>
              <sphereGeometry args={[0.057, 10, 10]} />
              <meshStandardMaterial color={PALETTE.pants} flatShading />
            </mesh>
            <mesh position={[0, -lowerLeg / 2, 0]} castShadow>
              <cylinderGeometry args={[0.057, 0.095, lowerLeg - 0.03, 12, 1]} />
              <meshStandardMaterial color={PALETTE.pants} flatShading />
            </mesh>
            {/* Front seam */}
            <mesh position={[0, -lowerLeg / 2, 0.045]} scale={[1, 1, 0.3]} castShadow>
              <cylinderGeometry args={[0.012, 0.014, lowerLeg - 0.05, 4, 1]} />
              <meshStandardMaterial color={PALETTE.pantsSeam} flatShading />
            </mesh>
            {/* Rounded sneaker upper, meeting the jeans hem with no gap */}
            <mesh position={[0, -lowerLeg - 0.03, 0.05]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.78]} castShadow>
              <capsuleGeometry args={[0.058, 0.085, 4, 10]} />
              <meshStandardMaterial color={PALETTE.shoe} flatShading />
            </mesh>
            <ShoeLaces y={-lowerLeg + 0.006} z={0.065} />
            {/* Sole -- same width as the upper, tucked in close underneath */}
            <mesh position={[0, -lowerLeg - 0.065, 0.05]} rotation={[Math.PI / 2, 0, 0]} scale={[0.96, 1, 0.16]} castShadow>
              <capsuleGeometry args={[0.058, 0.085, 4, 10]} />
              <meshStandardMaterial color={PALETTE.shoeSole} flatShading />
            </mesh>
            <ShoeStripes y={-lowerLeg - 0.03} z={0.05} />
          </group>
        </Limb>
      </group>

      <group position={[0.075, hipHeight, 0]}>
        <Limb pivotRef={hipR} length={upperLeg} radius={0.066} jointRadius={0.068} color={PALETTE.pants}>
          <group ref={kneeR}>
            <mesh castShadow>
              <sphereGeometry args={[0.057, 10, 10]} />
              <meshStandardMaterial color={PALETTE.pants} flatShading />
            </mesh>
            <mesh position={[0, -lowerLeg / 2, 0]} castShadow>
              <cylinderGeometry args={[0.057, 0.095, lowerLeg - 0.03, 12, 1]} />
              <meshStandardMaterial color={PALETTE.pants} flatShading />
            </mesh>
            {/* Front seam */}
            <mesh position={[0, -lowerLeg / 2, 0.045]} scale={[1, 1, 0.3]} castShadow>
              <cylinderGeometry args={[0.012, 0.014, lowerLeg - 0.05, 4, 1]} />
              <meshStandardMaterial color={PALETTE.pantsSeam} flatShading />
            </mesh>
            {/* Rounded sneaker upper, meeting the jeans hem with no gap */}
            <mesh position={[0, -lowerLeg - 0.03, 0.05]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.78]} castShadow>
              <capsuleGeometry args={[0.058, 0.085, 4, 10]} />
              <meshStandardMaterial color={PALETTE.shoe} flatShading />
            </mesh>
            <ShoeLaces y={-lowerLeg + 0.006} z={0.065} />
            {/* Sole -- same width as the upper, tucked in close underneath */}
            <mesh position={[0, -lowerLeg - 0.065, 0.05]} rotation={[Math.PI / 2, 0, 0]} scale={[0.96, 1, 0.16]} castShadow>
              <capsuleGeometry args={[0.058, 0.085, 4, 10]} />
              <meshStandardMaterial color={PALETTE.shoeSole} flatShading />
            </mesh>
            <ShoeStripes y={-lowerLeg - 0.03} z={0.05} />
          </group>
        </Limb>
      </group>

      {/* Torso -- oversized chunky-knit crewneck sweater, drapes loose and
          independent of the body underneath instead of hugging it */}
      <group ref={torso} position={[0, hipHeight, 0]}>
        {/* Rounded shoulder/chest volume */}
        <mesh position={[0, 0.34, 0]} castShadow>
          <capsuleGeometry args={[0.15, 0.05, 4, 12]} />
          <meshStandardMaterial color={PALETTE.sweater} flatShading />
        </mesh>
        {/* Loose A-line drape -- noticeably wider at the hem than at the chest */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.225, 0.32, 14, 1]} />
          <meshStandardMaterial color={PALETTE.sweater} flatShading />
        </mesh>
        {/* Ribbed hem */}
        <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.225, 0.024, 6, 20]} />
          <meshStandardMaterial color={PALETTE.sweaterRib} flatShading />
        </mesh>
        {/* Short neck so the head doesn't float off the shoulders */}
        <mesh position={[0, 0.46, 0]} castShadow>
          <capsuleGeometry args={[0.046, 0.02, 4, 8]} />
          <meshStandardMaterial color={PALETTE.skin} flatShading />
        </mesh>
        {/* Ribbed crewneck collar, sitting loose off the neck */}
        <mesh position={[0, 0.415, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.08, 0.02, 6, 16]} />
          <meshStandardMaterial color={PALETTE.sweaterRib} flatShading />
        </mesh>

        {/* Arms -- slim sleeves, just enough drape to not hug the arm,
            tapering to ribbed cuffs. The oversized look stays on the body,
            not the arms. */}
        <group position={[-0.155, 0.33, 0]}>
          <Limb pivotRef={shoulderL} length={upperArm} radius={0.052} jointRadius={0.055} color={PALETTE.sweater}>
            <group ref={elbowL}>
              <mesh castShadow>
                <sphereGeometry args={[0.046, 10, 10]} />
                <meshStandardMaterial color={PALETTE.sweater} flatShading />
              </mesh>
              <mesh position={[0, -lowerArm / 2, 0]} castShadow>
                <capsuleGeometry args={[0.044, lowerArm - 0.07, 4, 8]} />
                <meshStandardMaterial color={PALETTE.sweater} flatShading />
              </mesh>
              {/* Ribbed cuff, gathered in tight at the wrist */}
              <mesh position={[0, -lowerArm + 0.03, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <torusGeometry args={[0.036, 0.014, 6, 12]} />
                <meshStandardMaterial color={PALETTE.sweaterRib} flatShading />
              </mesh>
              <mesh position={[0, -lowerArm - 0.018, 0]} scale={[0.78, 1.25, 0.82]} castShadow>
                <sphereGeometry args={[0.026, 8, 8]} />
                <meshStandardMaterial color={PALETTE.skin} flatShading />
              </mesh>
            </group>
          </Limb>
        </group>

        <group position={[0.155, 0.33, 0]}>
          <Limb pivotRef={shoulderR} length={upperArm} radius={0.052} jointRadius={0.055} color={PALETTE.sweater}>
            <group ref={elbowR}>
              <mesh castShadow>
                <sphereGeometry args={[0.046, 10, 10]} />
                <meshStandardMaterial color={PALETTE.sweater} flatShading />
              </mesh>
              <mesh position={[0, -lowerArm / 2, 0]} castShadow>
                <capsuleGeometry args={[0.044, lowerArm - 0.07, 4, 8]} />
                <meshStandardMaterial color={PALETTE.sweater} flatShading />
              </mesh>
              {/* Ribbed cuff, gathered in tight at the wrist */}
              <mesh position={[0, -lowerArm + 0.03, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <torusGeometry args={[0.036, 0.014, 6, 12]} />
                <meshStandardMaterial color={PALETTE.sweaterRib} flatShading />
              </mesh>
              <mesh position={[0, -lowerArm - 0.018, 0]} scale={[0.78, 1.25, 0.82]} castShadow>
                <sphereGeometry args={[0.026, 8, 8]} />
                <meshStandardMaterial color={PALETTE.skin} flatShading />
              </mesh>
            </group>
          </Limb>
        </group>

        {/* Head */}
        <group ref={head} position={[0, 0.58, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.15, 14, 14]} />
            <meshStandardMaterial color={PALETTE.skin} flatShading />
          </mesh>

          <Face />

          {/* Hair: crown + back volume -- full coverage, swept back off the
              forehead, no fringe. Covers the temples/sides so the long
              strands below plug into one continuous mass with no gap. */}
          <mesh position={[0, 0.05, -0.03]} castShadow>
            <sphereGeometry args={[0.17, 12, 12]} />
            <meshStandardMaterial color={PALETTE.hair} flatShading />
          </mesh>

          {/* A soft poof of volume rising just behind the headband, like
              hair that naturally puffs up over a band instead of lying
              flat against the scalp. */}
          <mesh position={[0, 0.185, -0.05]} scale={[1.5, 0.3, 0.9]} castShadow>
            <sphereGeometry args={[0.07, 10, 10]} />
            <meshStandardMaterial color={PALETTE.hair} flatShading />
          </mesh>

          <mesh position={[0, -0.335, -0.1]} rotation={[0.08, 0, 0]} castShadow>
            <capsuleGeometry args={[0.13, 0.34, 4, 8]} />
            <meshStandardMaterial color={PALETTE.hair} flatShading />
          </mesh>
          <mesh position={[0, -0.18, -0.2]} rotation={[0.18, 0, 0]} castShadow>
            <capsuleGeometry args={[0.135, 0.2, 4, 8]} />
            <meshStandardMaterial color={PALETTE.hairShine} flatShading />
          </mesh>

          {/* Long, straight, layered hair reaching toward the hip. Swept
              back off the forehead (no bangs), with one section brought
              to the front over the shoulder. Tops overlap the crown so
              every strand reads as part of one connected head of hair. */}
          <HairSide side={-1} />
          <HairSide side={1} />

          {/* Small ribbon bow clipped in near the part, matching the
              wavy-hair reference photo instead of a full headband */}
          <Ribbon />

          {/* Glasses (thin wire frames) */}
          <group position={[0, -0.01, 0.15]}>
            <mesh position={[-0.052, 0, 0]}>
              <torusGeometry args={[0.034, 0.005, 6, 20]} />
              <meshStandardMaterial color={PALETTE.glasses} flatShading />
            </mesh>
            <mesh position={[0.052, 0, 0]}>
              <torusGeometry args={[0.034, 0.005, 6, 20]} />
              <meshStandardMaterial color={PALETTE.glasses} flatShading />
            </mesh>
            <mesh position={[0, 0.003, -0.003]}>
              <boxGeometry args={[0.022, 0.005, 0.005]} />
              <meshStandardMaterial color={PALETTE.glasses} flatShading />
            </mesh>
            <mesh position={[-0.11, 0.006, -0.02]} rotation={[0, 0.5, 0]}>
              <boxGeometry args={[0.07, 0.005, 0.005]} />
              <meshStandardMaterial color={PALETTE.glasses} flatShading />
            </mesh>
            <mesh position={[0.11, 0.006, -0.02]} rotation={[0, -0.5, 0]}>
              <boxGeometry args={[0.07, 0.005, 0.005]} />
              <meshStandardMaterial color={PALETTE.glasses} flatShading />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}
