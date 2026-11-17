// Workspace layout, fitted to her own proportions (measured from the model in
// Avatar.roundArms.jsx; heights are above the floor she stands on):
//   knee to floor (back of knee, feet flat) ... 0.297   (knee pivot 0.354)
//   seated, on the 0.32 seat (thighs 6 deg down to the knee, shins vertical):
//     hips 0.386, top of thighs 0.45 at the hip / 0.425 near the knee,
//     elbow (upper arm vertical) 0.486, eyes ~0.97,
//     top of head (headband) in her typing pose ... 1.20
//   sweater front at desk height ............... 0.20 in front of her hips
// All positions are in the workspace group's local space (see HeroScene.jsx).

// The floor: her soles when she stands (her root is at y = 0, her feet reach
// below it). The desk, chair and shadows all stand on this.
export const FLOOR_Y = -0.154
// Her legs (Avatar): thigh length + radius, knee pivot to the bottom of her
// sole. With the shins vertical her knees are KNEE_TO_SOLE above the floor.
export const THIGH = 0.3
export const THIGH_RADIUS = 0.066
export const KNEE_TO_SOLE = 0.354
export const KNEE_TO_FLOOR = 0.297

// Chair seat top: 108% of her knee-to-floor height, so her hips sit a little
// above her knees and her feet stay flat.
export const SEAT_HEIGHT = 0.32
// Desktop: 0.60 above the floor (chosen visually, option D, over the 0.504
// that 42% of her seated height gave); the underside clears the top of her
// thighs by ~13 cm.
export const SEATED_HEIGHT = 1.2
export const DESK_HEIGHT = 0.6
export const DESK_TOP_THICKNESS = 0.016
// Desk 18% wider and deeper than the first fitted version (0.5 x 0.75),
// with slightly thicker legs; laptop 12% larger.
export const DESK_SCALE = 1.18
export const DESK_LEG = 0.03

// Her hips when seated at the desk (after scooting in); the chair is centred
// a little behind them. She sits facing slightly to the right (yaw 0.25).
export const SEAT_HIP_FINAL = [0.08, 0.2]
// Her hair and sweater reach up to 0.31 behind her hips (measured over all
// her seated motions: the hair swings back when she looks down at the
// screen), so the backrest's front face sits 0.325 behind them.
export const CHAIR = {
  behindHip: 0.0825,  // seat centre behind her hips
  width: 0.4,
  depth: 0.545,       // front edge 0.19 ahead of her hips (carries her thighs); back edge 0.355 behind
  seat: 0.035,        // seat thickness
  back: 0.4,          // backrest height above the seat: up to her shoulders (0.72 above the floor)
  backThickness: 0.03,
  leg: 0.022,
}
// She pulls the chair in this far after sitting: she sits down with it
// pulled out, since standing in front of it there's no room before the desk.
export const SCOOT = 0.33
export const SEAT_POSITION = [SEAT_HIP_FINAL[0], 0, SEAT_HIP_FINAL[1] - SCOOT - CHAIR.behindHip]

// Desk: front edge just in front of her tummy when she's scooted in, so her
// wrists rest just past it; long and narrow, running away from her.
// How far her sweater reaches in front of her hips at height h above the
// floor, seated (measured: 0.200 at 0.50, 0.192 at 0.54, 0.179 at 0.60; it
// narrows toward her chest).
export const sweaterFront = (h) => Math.max(0.15, 0.2 - (h - 0.5) * 0.21)
export const DESK = { x: 0.16, frontZ: +(SEAT_HIP_FINAL[1] + sweaterFront(DESK_HEIGHT) + 0.015).toFixed(3), width: 0.5 * DESK_SCALE, length: 0.75 * DESK_SCALE }
// Laptop: near the front edge, centred on her hands; `scale` enlarges the
// whole model (base, screen and screen content) by 12%.
export const LAPTOP = { x: 0.16, frontZ: DESK.frontZ + 0.01, depth: 0.24, width: 0.34, baseH: 0.015, openTilt: 0.28, scale: 1.12 }
