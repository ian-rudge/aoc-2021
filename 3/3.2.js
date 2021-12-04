const fs = require('fs').promises;
const { join } = require('path');

const main = async () => {
  const input = await fs.readFile(join(__dirname, 'input.txt'), { encoding: 'utf-8' });
  const report = input.split('\n');
  const rowLength = report[0].split('').length;

  const getNumOccurances = (arr) => {
    // [[num occurance of 0, num occurance of 1]]
    const cols = Array.from({ length: rowLength }).map(() => [0, 0]);
    arr.forEach((line) => {
      const row = line.split('');
      row.forEach((x, idx) => {
        cols[idx][parseInt(x, 10)]++;
      });
    });
    return cols;
  };

  let o2Gen = report.slice();
  let co2Gen = report.slice();

  for (let i = 0; i < rowLength; i++) {
    const o2NumOcc = getNumOccurances(o2Gen);
    const co2NumOcc = getNumOccurances(co2Gen);

    const commonO2 = o2NumOcc.map(([numOff, numOn]) => {
      return numOn >= numOff ? '1' : '0';
    });
    const commonCO2 = co2NumOcc.map(([numOff, numOn]) => {
      return numOff <= numOn ? '0' : '1';
    });

    const filter = (arr, common) => {
      return arr.filter((line, _, arr) => {
        if (arr.length === 1) return true;
        const bit = line.split('')[i];
        return common[i] === bit;
      });
    };

    o2Gen = filter(o2Gen, commonO2);
    co2Gen = filter(co2Gen, commonCO2);
  }

  console.log(parseInt(o2Gen[0], 2) * parseInt(co2Gen[0], 2));
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
