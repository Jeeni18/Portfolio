import * as THREE from 'three'

// Elbow + arm values for her animations (walk, idle, wave, sit, type).
//
// On her rig the elbow is a hinge about its local x-axis, and a NEGATIVE
// rotation flexes the forearm forward -- the natural way. Her original
// values were all positive, which bent every elbow backwards (it only
// showed once the camera saw her from the side). These are the same bends
// with the correct sign; the wave additionally twists the raised arm a
// quarter-turn about its own axis so the hinge faces forward and the
// forearm rises toward her head instead of swinging behind it.

export const IDLE_ELBOW = -0.2   // was 0.2
export const WALK_ELBOW = -0.3   // was 0.3
export const SEAT_ELBOW = -0.55  // was 0.55: forearms forward over her lap
export const TAP_ELBOW = -0.6    // was 0.6: forearm forward toward the laptop

export const WAVE_LIFT = 2.0     // upper arm raised out to the side
export const WAVE_SHOULDER_X = -0.15
export const WAVE_TWIST = Math.PI / 2  // turns the elbow hinge to face forward
export const WAVE_ELBOW = -0.8   // forearm up, fingers vertical, hand beside her head
// Forearm roll (pronation) about its own length: turns the palm from facing
// her head to facing the viewer, thumb toward her head, fingers up.
export const WAVE_ROLL = -Math.PI / 2
// The wave itself: side to side from the elbow and wrist (together about
// +/-20 deg of hand tilt), two full swings while the arm is up.
export const WAVE_SWING_ELBOW = 0.2
export const WAVE_SWING_WRIST = 0.15
export const WAVE_SWINGS = 2

const lerp = (a, b, t) => a + (b - a) * t
const euler = new THREE.Euler(0, 0, 0, 'ZYX')

// Her wave, blended in by `lift` (0..1); `swing` (-1..1) is the side-to-side
// wave. The shoulder is a quaternion (twist about the arm, then the lift) so
// it never depends on the shoulder's default Euler order; the elbow bends
// (x) then rolls the forearm (y); `wrist` is the hand's group at the cuff.
export function setWaveArm(shoulder, elbow, wrist, lift, swing, idleShoulder) {
  euler.set(lerp(idleShoulder, WAVE_SHOULDER_X, lift), WAVE_TWIST * lift, lift * WAVE_LIFT, 'ZYX')
  shoulder.quaternion.setFromEuler(euler)
  elbow.rotation.set(lerp(IDLE_ELBOW, WAVE_ELBOW, lift) + swing * WAVE_SWING_ELBOW * lift, WAVE_ROLL * lift, 0)
  if (wrist) wrist.rotation.set(0, 0, swing * WAVE_SWING_WRIST * lift)
}
