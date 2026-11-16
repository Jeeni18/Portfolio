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

function HairStrand({ side, radius, length, x, y, z, tiltZ, tiltX, color = PALETTE.hair }) {
  return (
    <mesh position={[x * side, y, z]} rotation={[tiltX, 0, tiltZ * side]} castShadow>
      <capsuleGeometry args={[radius, length, 4, 8]} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
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
          (slightly enlarged) crown so there's no gap. */}
      <HairStrand side={side} radius={0.046} length={0.448} x={0.16} y={-0.215} z={-0.09} tiltZ={0.04} tiltX={0.06} color={PALETTE.hairShine} />
      {/* longest layer -- falls well past the elbow, toward the hip */}
      <HairStrand side={side} radius={0.048} length={0.634} x={0.175} y={-0.285} z={-0.08} tiltZ={0.03} tiltX={0.09} />
      {/* front piece -- starts closer to the back of the head and leans
          forward as it falls, reaching the chest without draping across
          the cheek near the top */}
      <HairStrand side={side} radius={0.046} length={0.538} x={0.15} y={-0.235} z={0.0} tiltZ={0.06} tiltX={0.13} color={PALETTE.hairShine} />
    </>
  )
}

function Headband() {
  return (
    <mesh position={[0, 0.05, -0.03]} rotation={[0.85, 0, 0]} scale={[0.6, 0.6, 1.7]} castShadow>
      <torusGeometry args={[0.295, 0.011, 8, 24, Math.PI]} />
      <meshStandardMaterial color={PALETTE.headband} flatShading />
    </mesh>
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
      {/* Eyes -- slightly wider, softer almond shape than a plain vertical
          oval, with a small catchlight on each so they read with depth
          instead of flat dark blobs */}
      <mesh position={[-0.052, 0, 0.138]} scale={[1.05, 0.95, 0.42]} castShadow>
        <sphereGeometry args={[0.017, 8, 8]} />
        <meshStandardMaterial color={PALETTE.hair} flatShading />
      </mesh>
      <mesh position={[0.052, 0, 0.138]} scale={[1.05, 0.95, 0.42]} castShadow>
        <sphereGeometry args={[0.017, 8, 8]} />
        <meshStandardMaterial color={PALETTE.hair} flatShading />
      </mesh>
      <mesh position={[-0.047, 0.005, 0.1465]}>
        <sphereGeometry args={[0.0045, 6, 6]} />
        <meshStandardMaterial color="#FFFDF8" flatShading />
      </mesh>
      <mesh position={[0.047, 0.005, 0.1465]}>
        <sphereGeometry args={[0.0045, 6, 6]} />
        <meshStandardMaterial color="#FFFDF8" flatShading />
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

      {/* Nose -- a small soft bump, same skin tone, for subtle definition */}
      <mesh position={[0, -0.028, 0.144]} scale={[0.55, 0.85, 0.6]}>
        <sphereGeometry args={[0.013, 8, 8]} />
        <meshStandardMaterial color={PALETTE.skin} flatShading />
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

      {/* Mouth -- a gentle curved smile instead of a flat straight line */}
      <mesh position={[0, -0.033, 0.137]} rotation={[0, 0, -2.0208]}>
        <torusGeometry args={[0.032, 0.0035, 6, 12, 0.9]} />
        <meshStandardMaterial color="#8A5A52" flatShading />
      </mesh>
    </group>
  )
}

// Anatomical-ish hand: a flattened palm paddle, four fingers of varying
// length with a knuckle bump where each meets the palm, and an angled
// thumb attached to the side rather than a single blob or stiff rods.
function Hand({ side }) {
  const fingers = [
    { x: -0.027, len: 0.029, radius: 0.0075, tilt: -0.09 }, // index
    { x: -0.009, len: 0.035, radius: 0.0085, tilt: -0.02 }, // middle -- longest & thickest
    { x: 0.009, len: 0.032, radius: 0.0078, tilt: 0.03 }, // ring
    { x: 0.027, len: 0.023, radius: 0.0062, tilt: 0.14 }, // pinky -- shortest & thinnest
  ]
  return (
    <group position={[0, -0.006, 0.004]}>
      {/* Palm -- fuller, flattened, rounded paddle shape */}
      <mesh scale={[1.35, 1.05, 0.62]} castShadow>
        <capsuleGeometry args={[0.022, 0.017, 4, 8]} />
        <meshStandardMaterial color={PALETTE.skin} flatShading />
      </mesh>

      {fingers.map((f, i) => (
        <group key={i} position={[f.x, -0.026, 0.008]} rotation={[0.14, 0, f.tilt]}>
          {/* Knuckle -- soft, slightly bulged transition from palm into finger */}
          <mesh castShadow>
            <sphereGeometry args={[f.radius * 1.15, 6, 6]} />
            <meshStandardMaterial color={PALETTE.skin} flatShading />
          </mesh>
          <mesh position={[0, -f.len / 2, 0]} castShadow>
            <capsuleGeometry args={[f.radius, Math.max(f.len - f.radius * 1.6, f.radius), 4, 6]} />
            <meshStandardMaterial color={PALETTE.skin} flatShading />
          </mesh>
        </group>
      ))}

      {/* Thumb -- clearly offset beyond the finger row, shorter, thicker,
          angled out from the side of the palm so it reads as its own digit */}
      <group position={[0.036 * side, 0.002, 0.018]} rotation={[0.42, 0, 0.78 * side]}>
        <mesh castShadow>
          <sphereGeometry args={[0.0098, 6, 6]} />
          <meshStandardMaterial color={PALETTE.skin} flatShading />
        </mesh>
        <mesh position={[0, -0.012, 0]} castShadow>
          <capsuleGeometry args={[0.0084, 0.013, 4, 6]} />
          <meshStandardMaterial color={PALETTE.skin} flatShading />
        </mesh>
      </group>
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
  const upperArm = 0.23
  const lowerArm = 0.17

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
        {/* Rounded shoulder/chest volume -- lowered so it doesn't crowd the
            neck, which flattens the shoulder silhouette where it pokes
            above the A-line drape */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <capsuleGeometry args={[0.15, 0.05, 4, 12]} />
          <meshStandardMaterial color={PALETTE.sweater} flatShading />
        </mesh>
        {/* Loose A-line drape -- noticeably wider at the hem than at the chest */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.225, 0.32, 14, 1]} />
          <meshStandardMaterial color={PALETTE.sweater} flatShading />
        </mesh>
        {/* Subtle fabric fold partway down the drape */}
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.205, 0.006, 6, 20]} />
          <meshStandardMaterial color={PALETTE.sweaterRib} flatShading />
        </mesh>
        {/* Ribbed hem */}
        <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.225, 0.024, 6, 20]} />
          <meshStandardMaterial color={PALETTE.sweaterRib} flatShading />
        </mesh>
        {/* Neck -- top stays fixed under the jaw; extended downward so its
            base is solidly embedded in the chest capsule below, with no
            gap between the neck and the torso. Same skin colour and
            material as the head; segment count raised to match the
            head sphere's smoothness so flat-shaded facets don't catch
            light differently and read as a different skin tone. */}
        <mesh position={[0, 0.443, 0]} castShadow>
          <capsuleGeometry args={[0.046, 0.054, 8, 16]} />
          <meshStandardMaterial color={PALETTE.skin} flatShading />
        </mesh>
        {/* Ribbed crewneck collar -- a clean, modest ring right at the base
            of the neck, low enough to leave the neck itself visible */}
        <mesh position={[0, 0.398, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.072, 0.014, 6, 16]} />
          <meshStandardMaterial color={PALETTE.sweaterRib} flatShading />
        </mesh>

        {/* Arms -- oversized dropped-shoulder sleeves with a smooth, flat
            transition from the torso, tapering through the forearm to a
            flared cuff opening and gathered rib at the wrist. */}
        <group position={[-0.16, 0.33, 0]} rotation={[0, 0, -0.2]}>
          <Limb pivotRef={shoulderL} length={upperArm} radius={0.05} jointRadius={0.06} color={PALETTE.sweater}>
            <group ref={elbowL}>
              <mesh castShadow>
                <sphereGeometry args={[0.043, 10, 10]} />
                <meshStandardMaterial color={PALETTE.sweater} flatShading />
              </mesh>
              <mesh position={[0, -lowerArm / 2, 0]} castShadow>
                <capsuleGeometry args={[0.041, lowerArm - 0.07, 4, 8]} />
                <meshStandardMaterial color={PALETTE.sweater} flatShading />
              </mesh>
              {/* Forearm fold crease */}
              <mesh position={[0, -lowerArm * 0.45, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <torusGeometry args={[0.039, 0.005, 6, 12]} />
                <meshStandardMaterial color={PALETTE.sweaterRib} flatShading />
              </mesh>
              {/* Flared cuff opening, just above the gathered rib */}
              <mesh position={[0, -lowerArm + 0.048, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <torusGeometry args={[0.046, 0.007, 6, 12]} />
                <meshStandardMaterial color={PALETTE.sweater} flatShading />
              </mesh>
              {/* Ribbed cuff, gathered in tight at the wrist */}
              <mesh position={[0, -lowerArm + 0.03, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <torusGeometry args={[0.036, 0.014, 6, 12]} />
                <meshStandardMaterial color={PALETTE.sweaterRib} flatShading />
              </mesh>
              <group position={[0, -lowerArm, 0]}>
                <Hand side={-1} />
              </group>
            </group>
          </Limb>
        </group>

        <group position={[0.16, 0.33, 0]} rotation={[0, 0, 0.2]}>
          <Limb pivotRef={shoulderR} length={upperArm} radius={0.05} jointRadius={0.06} color={PALETTE.sweater}>
            <group ref={elbowR}>
              <mesh castShadow>
                <sphereGeometry args={[0.043, 10, 10]} />
                <meshStandardMaterial color={PALETTE.sweater} flatShading />
              </mesh>
              <mesh position={[0, -lowerArm / 2, 0]} castShadow>
                <capsuleGeometry args={[0.041, lowerArm - 0.07, 4, 8]} />
                <meshStandardMaterial color={PALETTE.sweater} flatShading />
              </mesh>
              {/* Forearm fold crease */}
              <mesh position={[0, -lowerArm * 0.45, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <torusGeometry args={[0.039, 0.005, 6, 12]} />
                <meshStandardMaterial color={PALETTE.sweaterRib} flatShading />
              </mesh>
              {/* Flared cuff opening, just above the gathered rib */}
              <mesh position={[0, -lowerArm + 0.048, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <torusGeometry args={[0.046, 0.007, 6, 12]} />
                <meshStandardMaterial color={PALETTE.sweater} flatShading />
              </mesh>
              {/* Ribbed cuff, gathered in tight at the wrist */}
              <mesh position={[0, -lowerArm + 0.03, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <torusGeometry args={[0.036, 0.014, 6, 12]} />
                <meshStandardMaterial color={PALETTE.sweaterRib} flatShading />
              </mesh>
              <group position={[0, -lowerArm, 0]}>
                <Hand side={1} />
              </group>
            </group>
          </Limb>
        </group>

        {/* Head */}
        <group ref={head} position={[0, 0.58, 0]}>
          {/* The head is a full sphere, so parts of its surface always face
              away from both lights and fall back to ambient-only shading,
              reading darker overall than the neck's small, mostly
              front-facing capsule. A touch of matching emissive lifts that
              shadowed falloff so the face's skin tone reads as evenly as
              the neck's, without touching geometry or the scene lights. */}
          <mesh castShadow>
            <sphereGeometry args={[0.15, 14, 14]} />
            <meshStandardMaterial color={PALETTE.skin} flatShading emissive={PALETTE.skin} emissiveIntensity={0.18} />
          </mesh>

          <Face />

          {/* Hair: crown + back volume -- full coverage, swept back off the
              forehead, no fringe. Covers the temples/sides so the long
              strands below plug into one continuous mass with no gap. */}
          <mesh position={[0, 0.05, -0.03]} castShadow>
            <sphereGeometry args={[0.182, 12, 12]} />
            <meshStandardMaterial color={PALETTE.hair} flatShading />
          </mesh>
          <mesh position={[0, -0.335, -0.1]} rotation={[0.08, 0, 0]} castShadow>
            <capsuleGeometry args={[0.095, 0.34, 4, 8]} />
            <meshStandardMaterial color={PALETTE.hair} flatShading />
          </mesh>
          <mesh position={[0, -0.18, -0.2]} rotation={[0.18, 0, 0]} castShadow>
            <capsuleGeometry args={[0.1, 0.2, 4, 8]} />
            <meshStandardMaterial color={PALETTE.hairShine} flatShading />
          </mesh>

          {/* Long, straight, layered hair reaching toward the hip. Swept
              back off the forehead (no bangs), with one section brought
              to the front over the shoulder. Tops overlap the crown so
              every strand reads as part of one connected head of hair. */}
          <HairSide side={-1} />
          <HairSide side={1} />
          {/* Fill strand -- the left side's hair narrows away from the
              head faster than the neck does, leaving a sliver of bald
              coverage near the jaw/shoulder transition. This single
              extra strand, matching the others in colour, material and
              tilt, closes that gap without touching the right side. */}
          <HairStrand side={-1} radius={0.042} length={0.11} x={0.1} y={-0.155} z={-0.07} tiltZ={0.05} tiltX={0.08} />

          {/* Plain headband -- no clips or sparkles, matching the real
              reference photo's simple cream band */}
          <Headband />

          {/* Glasses -- thin round wire frames */}
          <group position={[0, -0.01, 0.15]}>
            <mesh position={[-0.052, 0, 0]}>
              <torusGeometry args={[0.034, 0.0038, 8, 28]} />
              <meshStandardMaterial color={PALETTE.glasses} flatShading />
            </mesh>
            <mesh position={[0.052, 0, 0]}>
              <torusGeometry args={[0.034, 0.0038, 8, 28]} />
              <meshStandardMaterial color={PALETTE.glasses} flatShading />
            </mesh>
            {/* Bridge -- spans cleanly between the inner lens edges */}
            <mesh position={[0, 0.003, -0.003]}>
              <boxGeometry args={[0.028, 0.0038, 0.0038]} />
              <meshStandardMaterial color={PALETTE.glasses} flatShading />
            </mesh>
            <mesh position={[-0.11, 0.006, -0.02]} rotation={[0, 0.5, 0]}>
              <boxGeometry args={[0.07, 0.0038, 0.0038]} />
              <meshStandardMaterial color={PALETTE.glasses} flatShading />
            </mesh>
            <mesh position={[0.11, 0.006, -0.02]} rotation={[0, -0.5, 0]}>
              <boxGeometry args={[0.07, 0.0038, 0.0038]} />
              <meshStandardMaterial color={PALETTE.glasses} flatShading />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}
