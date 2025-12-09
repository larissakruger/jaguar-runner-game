import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const terrenoElems = document.querySelectorAll("[data-terreno]")

export function setupTerreno() {
  setCustomProperty(terrenoElems[0], "--left", 0)
  setCustomProperty(terrenoElems[1], "--left", 300)
}

export function updateTerreno(delta, speedScale) {
  terrenoElems.forEach(terreno => {
    incrementCustomProperty(terreno, "--left", delta * speedScale * SPEED * -1)

    if (getCustomProperty(terreno, "--left") <= -300) {
      incrementCustomProperty(terreno, "--left", 600)
    }
  })
}
