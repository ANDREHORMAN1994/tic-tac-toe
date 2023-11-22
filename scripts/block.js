import { ticTacList, verifyWinner } from './game.js';
import { eventsList, renderEvents } from './check.js';

let player = 'X';

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

const handleClick = (id, blockEl) => {
  const [_, row, col] = id.split('-');

  if (ticTacList[row][col] === 0) {
    ticTacList[row][col] = player;

    if (player === 'X') {
      blockEl.appendChild(createImage('../assets/x.png'));
      eventsList.push('Adicionou X');
    } else {
      blockEl.appendChild(createImage('../assets/o.png'));
      eventsList.push('Adicionou O');
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
  createBlock,
};
