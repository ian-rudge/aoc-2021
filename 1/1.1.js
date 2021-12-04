const fs = require('fs').promises;
const { join } = require('path');

const main = async () => {
  const input = await fs.readFile(join(__dirname, 'input.txt'), { encoding: 'utf-8' });
  const nums = input.split('\n').map((v) => parseInt(v, 10));

  let count = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) count++;
  }

  console.log(count);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
