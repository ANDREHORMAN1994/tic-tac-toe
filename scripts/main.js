const gameEl = document.querySelector('.container-game');
const eventsEl = document.querySelector('.container-events');
const checkEl = document.querySelector('.check-input');
const ticTacList = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
const eventsList = [];
let player = 'X';
let checkValue = false;

const createImage = (path) => {
  const imgEl = document.createElement('img');
  imgEl.classList.add('img-block');
  imgEl.src = path;
  return imgEl;
}

const resetBgBlock = () => {
  const blockList = document.querySelectorAll('.block');
  blockList.forEach((block) => {
    block.style.backgroundColor = '';
  });
};

const renderEvents = () => {
  if (checkValue) {
    eventsEl.style.display = 'flex';
  }

  eventsEl.innerHTML = '';
  eventsList.forEach((event) => {
    const eventEl = document.createElement('p');
    eventEl.classList.add('event');
    eventEl.innerHTML = event;
    eventsEl.appendChild(eventEl);
  });
}



const handleClick = (id, blockEl) => {
  const [row, col] = id.split('-');
  resetBgBlock();
  blockEl.style.backgroundColor = 'white';

  if (ticTacList[row][col] === 0) {
    ticTacList[row][col] = player;

    if (player === 'X') {
      eventsList.push('Adicionou X');
      blockEl.appendChild(createImage('../assets/x.png'));
    } else {
      eventsList.push('Adicionou O');
      blockEl.appendChild(createImage('../assets/o.png'));
    }

    renderEvents();
    player = player === 'X' ? 'O' : 'X';
  }
}

const createBlock = (newElement, classNameList, id) => {
  const blockEl = document.createElement('div');
  blockEl.classList.add(...classNameList, id);
  blockEl.addEventListener('click', () => handleClick(id, blockEl));
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

const handleCheck = () => {
  checkEl.addEventListener('click', () => {
    checkValue = checkEl.checked;
    if (checkEl.checked && eventsList.length > 0) {
      eventsEl.style.display = 'flex';
    } else {
      eventsEl.style.display = 'none';
    }
  })
};

window.onload = () => {
  createTicTac();
  handleCheck();
}
