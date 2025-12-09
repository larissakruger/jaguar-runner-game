import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

import { jumpSound } from "./script.js" 

const jaguarElem = document.querySelector("[data-jaguar]")
const JUMP_SPEED = 0.5
const GRAVITY = 0.0015
const JAGUAR_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let jaguarFrame
let currentFrameTime
let yVelocity
export function setupJaguar() {
  isJumping = false
  jaguarFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(jaguarElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateJaguar(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getJaguarRect() {
  return jaguarElem.getBoundingClientRect()
}

export function setJaguarLose() {
  jaguarElem.src = "img/jaguar-perdeu.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    jaguarElem.src = `img/jaguar-parado.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    jaguarFrame = (jaguarFrame + 1) % JAGUAR_FRAME_COUNT
    jaguarElem.src = `img/jaguar-andando-${jaguarFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(jaguarElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(jaguarElem, "--bottom") <= 0) {
    setCustomProperty(jaguarElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
  
  jumpSound.currentTime = 0 
  jumpSound.play() 
}