const fs = require('fs').promises;
const { join } = require('path');

const main = async () => {
  const input = await fs.readFile(join(__dirname, 'input.txt'), { encoding: 'utf-8' });
  const nums = input.split('\n').map((v) => parseInt(v, 10));

  let count = 0;
  let prevSum = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < nums.length - 3; i++) {
    const currSum = nums[i + 1] + nums[i + 2] + nums[i + 3];
    if (currSum > prevSum) count++;
    prevSum = currSum;
  }

  console.log(count);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
