const fs = require('fs').promises;
const { join } = require('path');

const main = async () => {
  const input = await fs.readFile(join(__dirname, 'input.txt'), { encoding: 'utf-8' });
  const report = input.split('\n');

  // [[num occurance of 0, num occurance of 1]]
  const cols = Array.from({ length: report[0].split('').length }).map(() => [0, 0]);

  report.forEach((line) => {
    const row = line.split('');
    row.forEach((x, idx) => {
      cols[idx][parseInt(x, 10)]++;
    });
  });

  const gamma = cols.map(([numOff, numOn]) => (numOff > numOn ? '0' : '1')).join('');
  const epsilon = cols.map(([numOff, numOn]) => (numOff < numOn ? '0' : '1')).join('');

  const consumption = parseInt(gamma, 2) * parseInt(epsilon, 2);

  console.log(consumption);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
