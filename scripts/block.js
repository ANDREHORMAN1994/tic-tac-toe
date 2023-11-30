import { ticTacList, verifyWinner } from './game.js';
import { eventsList, renderEvents } from './check.js';

let player = 'X';

const changePlayer = () => {
  setTimeout(() => {
    const symbol = prompt('Qual deve começar ? X ou O');
  
    if (symbol?.toLowerCase() === 'x' || symbol?.toLowerCase() === 'o') {
      player = symbol.toUpperCase();
      return;
    }
    
    alert('Escolha inválida! Digite X ou O');
    changePlayer();
  }, 100)
};

const createImage = (path) => {
  const imgEl = document.createElement('img');
  imgEl.classList.add('img-block');
  imgEl.src = path;
  return imgEl;
};

const resetBgBlock = () => {
  const blockList = document.querySelectorAll('.block');
  blockList.forEach((block) => {
    block.style.backgroundColor = '';
    if (block.innerHTML) {
      block.style.cursor = 'not-allowed';
    } else {
      block.style.cursor = 'pointer';
    }
  });
};

const formattingCol = (row, col) => {
  let letter;
  let number;
  console.log(row, col, typeof row, typeof col);

  if (col === '0') letter = 'A';
  if (col === '1') letter = 'B';
  if (col === '2') letter = 'C';
  if (row === '0') number = '1';
  if (row === '1') number = '2';
  if (row === '2') number = '3';

  return `${letter}${number}`;
}

const handleClick = (id, blockEl) => {
  const [_, row, col] = id.split('-');

  if (ticTacList[row][col] === 0) {
    ticTacList[row][col] = player;

    if (player === 'X') {
      blockEl.appendChild(createImage('../assets/x.svg'));
      eventsList.push(`X na posição ${formattingCol(row, col)}`);
    } else {
      blockEl.appendChild(createImage('../assets/o.svg'));
      eventsList.push(`O na posição ${formattingCol(row, col)}`);
    }

    resetBgBlock();
    renderEvents();

    blockEl.style.backgroundColor = 'white';
    player = player === 'X' ? 'O' : 'X';
    verifyWinner();
  }
};

const createBlock = (newElement, classNameList, id) => {
  const blockEl = document.createElement('div');
  blockEl.classList.add(...classNameList, id);
  blockEl.addEventListener('click', () => handleClick(id, blockEl));
  newElement.appendChild(blockEl);
};

export {
  changePlayer,
  createBlock,
};
