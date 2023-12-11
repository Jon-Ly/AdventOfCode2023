const data = require('fs')
  .readFileSync(`${__dirname}\\day2_2.txt`, 'utf8')
  .split('\r');

let total = 0;

data.forEach((x) => {
  const gameNumber = x.split(':')[0].split(' ')[1];
  const clueString = x.split(':')[1];

  const clues = clueString.split(';');

  const map = new Map();

  map.set('red', 0);
  map.set('green', 0);
  map.set('blue', 0);

  clues.forEach((clue) => {
    const colorAmounts = clue.split(',');

    colorAmounts.forEach((ca) => {
      const amount = Number(ca.trim().split(' ')[0]);
      const color = ca.trim().split(' ')[1].trim();

      if (map.get(color) < amount) {
        map.set(color, amount);
      }
    });
  });

  total += Number(map.get('red') * map.get('green') * map.get('blue'));
});

console.log(total);
