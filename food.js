import { onSnake, expandSnake, SNAKE_SPEED, snakeBody, powerUpSnake } from './snake.js';
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

export function update() {
  if (onSnake(food)) {
      expandSnake(EXPANSION_RATE + food.modifier);
      if (food.powerUp) {
        powerUpSnake(food.powerUp);
      }
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  if (food.modifier !== undefined) {
    foodElement.classList.add(`modifier${food.modifier}`)
  }
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition;
  if (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
    modifyFruit(newFoodPosition);
  }
  return newFoodPosition;
}

function modifyFruit(fruit) {
  let modifierChance = Math.floor(Math.random() * 50) + 1;
  switch (true) {
    case modifierChance < 7:
      fruit.modifier = 2;
      break;
    case  modifierChance < 11:
      fruit.modifier = 4;
      break;
    case modifierChance > 48:
      fruit.modifier = 9;
      fruit.powerUp = 10;
      break;
    default:
       fruit.modifier = 0;
  }
  return fruit;
}
