export function generateMessage(snakeLength) {
  const msg1 =
  `"Snake... answer me, Snake... Snaaake!"
    - Otacon`;
  const msg2 =
  `Snek ate ${snakeLength - 1}-too many fruits`;
  const msg3 =
  `A ${snakeLength}-foot snek was last seen getting coiled in it's own gluttony`;
  const msg4 =
  `"Aw sneks..."
    - a ${snakeLength}-foot long snek`
  const msg5 =
  `"That last fruit hurt"
    - a confused snek`
  const finalMsg = [msg1, msg2, msg3, msg4, msg5];
  console.log(finalMsg)
  let ranIndex = Math.floor(Math.random() * 5);
  return finalMsg[ranIndex];
}
