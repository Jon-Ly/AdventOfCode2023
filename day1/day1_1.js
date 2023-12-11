const data = require('fs')
  .readFileSync(`${__dirname}\\day1_1.txt`, 'utf8')
  .split('\r');

let total = 0;

data.forEach((x) => {
  const numbers = x.replace(/[^0-9]/g, '').split('');
  total += Number(numbers[0] + numbers[numbers.length - 1]);
});

console.log(total);
