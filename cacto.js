import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const CACTO_INTERVAL_MIN = 500
const CACTO_INTERVAL_MAX = 2500
const worldElem = document.querySelector("[data-world]")

let nextCactoTime
export function setupCacto() {
  nextCactoTime = CACTO_INTERVAL_MIN
  document.querySelectorAll("[data-cacto]").forEach(cacto => {
    cacto.remove()
  })
}

export function updateCacto(delta, speedScale) {
  document.querySelectorAll("[data-cacto]").forEach(cacto => {
    incrementCustomProperty(cacto, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(cacto, "--left") <= -100) {
      cacto.remove()
    }
  })

  if (nextCactoTime <= 0) {
    createCacto()
    nextCactoTime =
      randomNumberBetween(CACTO_INTERVAL_MIN, CACTO_INTERVAL_MAX) / speedScale
  }
  nextCactoTime -= delta
}

export function getCactoRects() {
  return [...document.querySelectorAll("[data-cacto]")].map(cacto => {
    return cacto.getBoundingClientRect()
  })
}

function createCacto() {
  const cacto = document.createElement("img")
  cacto.dataset.cacto = true
  cacto.src = "img/cacto-1.png"
  cacto.classList.add("cacto")
  setCustomProperty(cacto, "--left", 100)
  worldElem.append(cacto)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
