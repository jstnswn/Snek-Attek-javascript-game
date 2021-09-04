import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, getSnakeLength  } from './snake.js';
import { update as updateFood, draw as drawFood } from '/food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    if (confirm(`Yous snake was ${getSnakeLength()} snake bits, Press ok to restart.`)) {
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
  const scoreDiv = document.getElementById('score');
  let currentScore = document.createTextNode(`snek length: ${getSnakeLength()}`)
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
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
