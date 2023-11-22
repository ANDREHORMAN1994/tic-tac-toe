import { messageWinner, resetEventsList } from './check.js';
import { createBlock } from './block.js';

const gameEl = document.querySelector('.container-game');
let ticTacList = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

const resetGame = () => {
  const eventsEl = document.querySelector('.container-events');
  ticTacList = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  eventsEl.innerHTML = '';
  gameEl.innerHTML = '';
  resetEventsList();
  createTicTac();
};

const opacityBlock = (blockClass, option,) => {
  const blockClassList = [...blockClass[option]];
  if (blockClassList.length > 3) blockClassList.shift();

  blockClassList
    .forEach((c) => {
      const blockEl = document.querySelector(`.${c}`);
      const imgEl = blockEl.children[0];
      blockEl.style.backgroundColor = '';
      imgEl.style.backgroundColor = 'white';
      imgEl.style.opacity = '0.5';
    });
};

const verifyWinner = () => {
  let winner = '';
  const blockClass = {
    rowX: [],
    rowO: [],
    colX: [],
    colO: [],
    digX: [],
    digO: [],
  };

  // VERIFICA LINHAS E COLUNAS
  ticTacList.forEach((row, rowIndex) => {
    const verifyRowsX = row.every((col, colIndex) => {
      if (col === 'X') blockClass['rowX'] = [...blockClass['rowX'], `id-${rowIndex}-${colIndex}`];
      return col === 'X';
    });

    const verifyRowsO = row.every((col, colIndex) => {
      if (col === 'O') blockClass['rowO'] = [...blockClass['rowO'], `id-${rowIndex}-${colIndex}`];
      return col === 'O';
    });

    const verifyColsX = row.every((_col, colIndex) => {
      const result = ticTacList[colIndex][rowIndex] === 'X';
      if (result) blockClass['colX'] = [...blockClass['colX'], `id-${colIndex}-${rowIndex}`];
      return result;
    });

    const verifyColsO = row.every((_col, colIndex) => {
      const result = ticTacList[colIndex][rowIndex] === 'O';
      if (result) blockClass['colO'] = [...blockClass['colO'], `id-${colIndex}-${rowIndex}`];
      return result;
    });

    if (verifyRowsX) {
      opacityBlock(blockClass, 'rowX');
      winner = 'X';
    } else if (verifyRowsO) {
      opacityBlock(blockClass, 'rowO');
      winner = 'O';
    } else if (verifyColsX) {
      opacityBlock(blockClass, 'colX');
      winner = 'X';
    } else if (verifyColsO) {
      opacityBlock(blockClass, 'colO');
      winner = 'O';
    }
  });

  // VERIFICA DIAGONAIS
  if ((ticTacList[0][0] === 'X' && ticTacList[1][1] === 'X' && ticTacList[2][2] === 'X')) {
    blockClass['digX'] = ['id-0-0', 'id-1-1', 'id-2-2'];
    opacityBlock(blockClass, 'digX');
    winner = 'X';
  } else if ((ticTacList[0][2] === 'X' && ticTacList[1][1] === 'X' && ticTacList[2][0] === 'X')) {
    blockClass['digX'] = ['id-0-2', 'id-1-1', 'id-2-0'];
    opacityBlock(blockClass, 'digX');
    winner = 'X';
  } else if (ticTacList[0][0] === 'O' && ticTacList[1][1] === 'O' && ticTacList[2][2] === 'O') {
    blockClass['digO'] = ['id-0-0', 'id-1-1', 'id-2-2'];
    opacityBlock(blockClass, 'digO');
    winner = 'O';
  } else if (ticTacList[0][2] === 'O' && ticTacList[1][1] === 'O' && ticTacList[2][0] === 'O') {
    blockClass['digO'] = ['id-0-2', 'id-1-1', 'id-2-0'];
    opacityBlock(blockClass, 'digO');
    winner = 'O';
  }

  if (ticTacList.every((row) => row.every((col) => col !== 0)) && !winner) {
    messageWinner(`EMPATE!`);

    setTimeout(() => {
      alert(`EMPATE!`);
      resetGame();
    }, 100);
  }

  if (winner) {
    messageWinner(`${winner} GANHOU!`);

    setTimeout(() => {
      alert(`O vencedor é ${winner}`);
      resetGame();
    }, 100);
  }
};

const createTicTac = () => {
  ticTacList.forEach((row, rowIndex) => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');

    row.forEach((_col, colIndex) => {
      if (rowIndex === 2 && colIndex === 2) {
        createBlock(rowEl, ['block'], `id-${rowIndex}-${colIndex}`);
      } else {
        if (rowIndex === 2) {
          createBlock(rowEl, ['block', 'border-right'], `id-${rowIndex}-${colIndex}`);
        } else {
          if (colIndex !== 2) {
            createBlock(rowEl, ['block', 'border-right', 'border-bottom'], `id-${rowIndex}-${colIndex}`);
          } else {
            createBlock(rowEl, ['block', 'border-bottom'], `id-${rowIndex}-${colIndex}`);
          }
        }
      }
    });

    gameEl.appendChild(rowEl);
  });
};

export {
  ticTacList,
  verifyWinner,
  createTicTac,
};
