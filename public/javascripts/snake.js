import { getInputDirection } from "./input.js";
import { gameOverOverride } from "./game.js";

export let SNAKE_SPEED = 10;
export let snakeBody = [ { x: 11, y: 11 } ];
let newSegments = 0;
let powerUp = null;
let powerUpWeight = 0;
let timer1;
let timer2;
let timer3;

export function update() {
  addSegments();

  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach(segment => {
  const snakeElement = document.createElement('div');
  snakeElement.style.gridRowStart = segment.y;
  snakeElement.style.gridColumnStart = segment.x;
  snakeElement.classList.add('snake');

  if (powerUp) {
    snakeElement.classList.add(`snake-${powerUp}`);
  } else {
    snakeElement.classList.remove(`snake-${powerUp}`);
  }
  gameBoard.appendChild(snakeElement)
  })
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position)
  })
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }
  newSegments = 0;
}

export function getSnakeLength() {
  return snakeBody.length;
}

export function powerUpSnake(power, weight) {
  if (weight >= powerUpWeight) {
    powerUpWeight = weight;
    powerUp = power;
  }
  switch (power) {
    case 'mega':
      makeMegaSnake(power);
      break;
    case 'ghost':
      makeGhostSnake(power);
      break;
    case 'speed':
      makeSpeedSnake(power);
  }
}

function makeMegaSnake(power) {
  clearTimeout(timer1);
  SNAKE_SPEED = 20;
    timer1 = setTimeout(() => {
      SNAKE_SPEED = 10;
      snakeBody = snakeBody.slice(0, snakeBody.length - 6);
      if (powerUp === power) {
        powerUp = null;
        powerUpWeight = 0;
      }
    }, 5000);
}

function makeGhostSnake(power) {
  powerUp = power;
  clearTimeout(timer2);
    gameOverOverride(true);
    timer2 = setTimeout(() => {
      if(powerUp === power) {
        powerUp = null;
        powerUpWeight = 0;
      }
      gameOverOverride(false);
    }, 5000);
}

function makeSpeedSnake(power) {
  clearTimeout(timer3);
  SNAKE_SPEED = 17;
  timer3 = setTimeout(() => {
    SNAKE_SPEED = 10;
  }, 5000);
}
