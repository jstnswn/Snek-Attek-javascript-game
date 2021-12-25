import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, getSnakeLength  } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';
import { generateMessage } from './message.js';
import { postScore, compareLeaderboard, displayTopScoreForm } from './leaderboard.js';

let lastRenderTime = 0;
let gameOver = false;
let collisionOverride = false;
const gameBoard = document.getElementById('game-board')

// TESTIGN READSCORE HERE:
// console.log(readScore())


async function main(currentTime) {
  if (gameOver) {
    let snakeLength = getSnakeLength()
    const isHighScore = await compareLeaderboard(snakeLength);
    // await displayTopScoreForm(snakeLength);
    if (isHighScore) {
      displayTopScoreForm();
    } else if (confirm(generateMessage(snakeLength))) {
      window.location = '/';
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  keepScore();
  update();
  draw();
}
window.requestAnimationFrame(main);

function keepScore() {
  const scoreDiv = document.getElementById('snake-length');
  let currentScore = document.createTextNode(`${getSnakeLength()}`)
  scoreDiv.innerHTML = '';
  scoreDiv.appendChild(currentScore);
}

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  if (collisionOverride) {
    gameOver = outsideGrid(getSnakeHead());
  } else {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
  }
}

export function gameOverOverride(boolean) {
  collisionOverride = boolean;
}
