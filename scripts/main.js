const gameEl = document.querySelector('.container-game');
const ticTacList = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

const handleClick = (value) => {
  console.log(value);
}

const createBlock = (newElement, classNameList, col) => {
  const blockEl = document.createElement('div');
  blockEl.addEventListener('click', () => handleClick(col));
  blockEl.classList.add(...classNameList);
  newElement.appendChild(blockEl);
}

const createTicTac = () => {
  ticTacList.forEach((row, rowIndex) => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');

    row.forEach((col, colIndex) => {
      if (rowIndex === 2 && colIndex === 2) {
        createBlock(rowEl, ['block'], `${rowIndex}-${colIndex}`);
      } else {
        if (rowIndex === 2) {
          createBlock(rowEl, ['block', 'border-right'], `${rowIndex}-${colIndex}`);
        } else {
          if (colIndex !== 2) {
            createBlock(rowEl, ['block', 'border-right', 'border-bottom' ], `${rowIndex}-${colIndex}`);
          } else {
            createBlock(rowEl, ['block', 'border-bottom' ], `${rowIndex}-${colIndex}`);
          }
        }
      }
    });

    gameEl.appendChild(rowEl);
  });
}

window.onload = () => {
  createTicTac();
}
