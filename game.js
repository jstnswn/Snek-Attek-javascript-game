import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, getSnakeLength  } from './snake.js';
import { update as updateFood, draw as drawFood } from '/food.js';
import { outsideGrid } from './grid.js';
import { generateMessage } from './message.js';

let lastRenderTime = 0;
let gameOver = false;
let collisionOverride = false;
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    if (confirm(generateMessage(getSnakeLength()))) {
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
