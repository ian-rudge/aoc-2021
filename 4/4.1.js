const fs = require('fs').promises;
const { join } = require('path');
const { chunk } = require('lodash');

const main = async () => {
  const input = await fs.readFile(join(__dirname, 'input.txt'), { encoding: 'utf-8' });
  const data = input.split('\n');

  let [drawNums, ...boardData] = data;

  drawNums = drawNums.split(',').map((v) => parseInt(v, 10));

  boardData = boardData.filter((v) => v);
  boardData = chunk(boardData, 5);

  const MARK = 'X';

  let boards = boardData.map((data) => {
    return data.map((row) => {
      return row
        .split(' ')
        .filter((v) => v)
        .map((v) => parseInt(v, 10));
    });
  });

  const markBoard = (board, num) => {
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === num) {
          row[j] = MARK;
        }
      }
    }
    return board;
  };

  const checkForWin = (board) => {
    // check horizontal
    for (let i = 0; i < board.length; i++) {
      if (board[i].every((v) => v === MARK)) {
        return board;
      }
    }

    // check vertical
    for (let i = 0; i < board.length; i++) {
      const col = [];
      for (let j = 0; j < board[i].length; j++) {
        col.push(board[j][i]);
      }
      if (col.every((v) => v === MARK)) {
        return board;
      }
    }
  };

  while (drawNums.length !== 0) {
    const draw = drawNums.shift();
    boards = boards.map((b) => markBoard(b, draw));

    const winningBoard = boards.find(checkForWin);
    if (winningBoard) {
      const sum = winningBoard.reduce((acc, row) => {
        return (
          acc +
          row.reduce((rowSum, num) => {
            return num !== MARK ? rowSum + num : rowSum;
          }, 0)
        );
      }, 0);

      console.log(sum * draw);
      break;
    }
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
