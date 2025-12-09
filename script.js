// Darkmode

const themeBtn = document.getElementById("theme-btn");

function setTheme(dark) {
  if (dark) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

const saved = localStorage.getItem("theme");
setTheme(saved === "dark");

themeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const dark = document.body.classList.contains("dark");
  setTheme(!dark);
});

// JOGO
import { updateTerreno, setupTerreno } from "./terreno.js"
import { updateJaguar, setupJaguar, getJaguarRect, setJaguarLose } from "./jaguar.js"
import { updateCacto, setupCacto, getCactoRects } from "./cacto.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001
const HIGH_SCORE_STORAGE_KEY = "jaguarRunnerHighScore"

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const highScoreElem = document.querySelector("[data-high-score]")
const gameOverElem = document.querySelector("[data-game-over]")
const restartIconElem = document.querySelector("[data-restart-icon]") 

export const jumpSound = new Audio("sounds/jump.mp3") 
const loseSound = new Audio("sounds/lose.mp3") 
const milestoneSound = new Audio("sounds/milestone.mp3") 

// Variáveis de controle de pontuação
let highScore = getStoredHighScore()
let scoreMilestone = 100

function getStoredHighScore() {
  const storedScore = localStorage.getItem(HIGH_SCORE_STORAGE_KEY)
  return storedScore ? parseFloat(storedScore) : 0
}

function formatScore(value) {
    return String(Math.floor(value)).padStart(5, '0')
}

function updateHighScoreDisplay() {
    highScoreElem.textContent = "HI " + formatScore(highScore)
}
// ---------------------------------------------------------------------

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

updateHighScoreDisplay()

let lastTime
let speedScale
let score

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateTerreno(delta, speedScale)
  updateJaguar(delta, speedScale)
  updateCacto(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const jaguarRect = getJaguarRect()
  return getCactoRects().some(rect => isCollision(rect, jaguarRect))
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  const previousScore = Math.floor(score)
  score += delta * 0.01
  const currentScore = Math.floor(score)
  
  scoreElem.textContent = formatScore(currentScore)

  if (currentScore >= scoreMilestone && previousScore < scoreMilestone) {
    milestoneSound.currentTime = 0
    milestoneSound.play()
    scoreMilestone += 100
  }
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  scoreMilestone = 100

  highScore = getStoredHighScore()
  updateHighScoreDisplay() 
  
  setupTerreno()
  setupJaguar()
  setupCacto()
 
  startScreenElem.classList.add("hide")
  gameOverElem.classList.add("hide") 
  restartIconElem.classList.add("hide")
  
  window.requestAnimationFrame(update)
}

function handleLose() {
  setJaguarLose()

  startScreenElem.classList.add("hide") 

  gameOverElem.classList.remove("hide") 
  restartIconElem.classList.remove("hide") 

  loseSound.currentTime = 0 
  loseSound.play()

  const finalScore = Math.floor(score)
  if (finalScore > highScore) {
    highScore = finalScore
    localStorage.setItem(HIGH_SCORE_STORAGE_KEY, highScore)
    updateHighScoreDisplay()
  }
 
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
  }, 100)
}

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}