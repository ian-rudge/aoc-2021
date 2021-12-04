const fs = require('fs').promises;
const { join } = require('path');

const main = async () => {
  const input = await fs.readFile(join(__dirname, 'input.txt'), { encoding: 'utf-8' });
  const commands = input.split('\n');

  const result = commands.reduce(
    (acc, command) => {
      const [direction, num] = command.split(' ');
      const count = parseInt(num, 10);

      switch (direction) {
        case 'forward':
          return { ...acc, x: acc.x + count, y: acc.y + acc.aim * count };
        case 'down':
          return { ...acc, aim: acc.aim + count };
        case 'up':
          return { ...acc, aim: acc.aim - count };
        default:
          return acc;
      }
    },
    {
      x: 0,
      y: 0,
      aim: 0,
    }
  );

  console.log(result.x * result.y);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
