const data = require('fs')
  .readFileSync(`${__dirname}\\day3_1.txt`, 'utf8')
  .split('\r');

let total = 0;

const grid = data.map((x) => x.replace('\n', '').split(''));

const symbolRegex = /[^0-9.]/g;

/**
 * Approach: If you see a number, add it to a string.
 * If that number is adjacent to a symbol, mark it as summable.
 * Once you see a period, clear the accumlation.
 * If cleared and the number was marked summable, add it to total.
 * If the right character after a number is a symbol, sum it.
 */

let accumulatedNumber = '';
let isAdjacent = false;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const right =
      grid[i][j + 1] && j + 1 < grid[i].length ? grid[i][j + 1] : '';
    const rightHasSymbol = symbolRegex.test(right);
    if (
      (grid[i][j] === '.' || rightHasSymbol) &&
      accumulatedNumber.length > 0
    ) {
      if (rightHasSymbol && grid[i][j] !== '.') {
        accumulatedNumber += grid[i][j];
        isAdjacent = true;
      }

      if (isAdjacent) {
        total += Number(accumulatedNumber);
      }

      accumulatedNumber = '';
      isAdjacent = false;
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

      accumulatedNumber += grid[i][j];

      if (
        symbolRegex.test(bottomLeft) ||
        symbolRegex.test(bottomCenter) ||
        symbolRegex.test(bottomRight) ||
        symbolRegex.test(topLeft) ||
        symbolRegex.test(topCenter) ||
        symbolRegex.test(topRight) ||
        symbolRegex.test(left)
      ) {
        isAdjacent = true;
      }
    }
  }
}

console.log(total);
