const data = require('fs')
  .readFileSync(`${__dirname}\\day2_1.txt`, 'utf8')
  .split('\r');

let total = 0;

data.forEach((x) => {
  const gameNumber = x.split(':')[0].split(' ')[1];
  const clueString = x.split(':')[1];

  const clues = clueString.split(';');

  let validGame = true;

  for(const clue of clues) {
    const colorAmounts = clue.split(',');

    for(const ca of colorAmounts) {
      const amount = Number(ca.trim().split(' ')[0]);
      const color = ca.trim().split(' ')[1].trim();

      if (color === 'red' && amount > 12) {
        validGame = false;
      } else if (color === 'green' && amount > 13) {
        validGame = false;
      } else if (color === 'blue' && amount > 14) {
        validGame = false;
      }

      if (!validGame) {
        break;
      }
    }

    if (!validGame) {
      break;
    }
  }

  if (validGame) {
    total += Number(gameNumber);
  }
});

console.log(total);
