const data = require('fs')
  .readFileSync(`${__dirname}\\day3_2.txt`, 'utf8')
  .split('\r');

let total = 0;

const grid = data.map((x) => x.replace('\n', '').split(''));

const cogSymbol = /[*]/g;

const cogToNumbers = new Map();
let cogPositions = [];
let accumulatedNumber = '';

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (/[^0-9]/g.test(grid[i][j]) && accumulatedNumber.length > 0) {
      // output += `${accumulatedNumber}\n`;
      for (const cogPosition of cogPositions) {
        const existingCogPosition = cogToNumbers.get(cogPosition);
        if (existingCogPosition) {
          cogToNumbers.set(cogPosition, [Number(accumulatedNumber), ...existingCogPosition]);
        } else {
          cogToNumbers.set(cogPosition, [Number(accumulatedNumber)]);
        }
      }

      cogPositions = [];
      accumulatedNumber = '';
      continue;
    }

    if (grid[i][j] === '.') {
      continue;
    }

    if (/[0-9]/g.test(grid[i][j])) {
      const bottomLeft = grid[i + 1] && j > 0 ? grid[i + 1][j - 1] : '';
      const bottomCenter = grid[i + 1] ? grid[i + 1][j] : '';
      const bottomRight =
        grid[i + 1] && j + 1 < grid[i].length ? grid[i + 1][j + 1] : '';
      const topLeft = grid[i - 1] && j > 0 ? grid[i - 1][j - 1] : '';
      const topCenter = grid[i - 1] ? grid[i - 1][j] : '';
      const topRight =
        grid[i - 1] && j + 1 < grid[i].length ? grid[i - 1][j + 1] : '';
      const left = grid[i][j - 1] ? grid[i][j - 1] : '';
      const right = grid[i][j + 1] ? grid[i][j + 1] : '';

      accumulatedNumber += grid[i][j];

      if (bottomLeft === '*' & cogPositions.indexOf(`${i + 1}, ${j - 1}`) === -1) {
        cogPositions.push(`${i + 1}, ${j - 1}`);
      }

      if (bottomCenter === '*' && !cogPositions.includes(`${i + 1}, ${j}`)) {
        cogPositions.push(`${i + 1}, ${j}`);
      }

      if (bottomRight === '*' && !cogPositions.includes(`${i + 1}, ${j + 1}`)) {
        cogPositions.push(`${i + 1}, ${j + 1}`);
      }

      if (topLeft === '*' && !cogPositions.includes(`${i - 1}, ${j - 1}`)) {
        cogPositions.push(`${i - 1}, ${j - 1}`);
      }

      if (topCenter === '*' && !cogPositions.includes(`${i - 1}, ${j}`)) {
        cogPositions.push(`${i - 1}, ${j}`);
      }

      if (topRight === '*' && !cogPositions.includes(`${i - 1}, ${j + 1}`)) {
        cogPositions.push(`${i - 1}, ${j + 1}`);
      }

      if (left === '*' && !cogPositions.includes(`${i}, ${j - 1}`)) {
        cogPositions.push(`${i}, ${j - 1}`);
      }

      if (right === '*' && !cogPositions.includes(`${i}, ${j + 1}`)) {
        cogPositions.push(`${i}, ${j + 1}`);
      }
    }
  }
}

for(const cogPosition of cogToNumbers.keys()) {
  const data = cogToNumbers.get(cogPosition);

  if (data.length === 2) {
    total += data[0] * data[1];
  }
}

console.log(total);
