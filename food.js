import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

export function update() {
  if (onSnake(food)) {
    if (food.modifier !== undefined) {
      expandSnake(EXPANSION_RATE + 2);
    } else {
      expandSnake(EXPANSION_RATE);
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
    foodElement.classList.add('modifier')
  }
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition;
  if (newFoodPosition == null || onSnake(newFoodPosition)) {
    let modifierChance = Math.floor(Math.random() * 20);
    newFoodPosition = randomGridPosition();
    if (modifierChance === 10) {
      newFoodPosition.modifier = 1;
    }
  }
  return newFoodPosition;
}
