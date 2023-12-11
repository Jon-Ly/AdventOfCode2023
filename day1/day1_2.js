const data = require('fs')
  .readFileSync(`${__dirname}\\day1_2.txt`, 'utf8')
  .split('\r');

const dictionary = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
};

let total = 0;

data.forEach((x) => {
  const map = new Map();
  let lowestIndex = -1;
  let highestIndex = -1;

  for (let validDigit of Object.keys(dictionary)) {
    const regex = new RegExp(validDigit, 'g');

    while ((match = regex.exec(x)) !== null) {
      map.set(match.index, dictionary[validDigit] ?? validDigit);

      if (lowestIndex === -1 || match.index < lowestIndex) {
        lowestIndex = match.index;
      }

      if (highestIndex === -1 || match.index > highestIndex) {
        highestIndex = match.index;
      }
    }
  }

  total += Number(map.get(lowestIndex) + map.get(highestIndex));
});

console.log(total);
