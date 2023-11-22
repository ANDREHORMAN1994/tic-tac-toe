const gameEl = document.querySelector('.container-game');
const eventsEl = document.querySelector('.container-events');
const checkEl = document.querySelector('.check-input');

let ticTacList = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let eventsList = [];
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
    if (block.innerHTML) {
      block.style.cursor = 'not-allowed';
    } else {
      block.style.cursor = 'pointer';
    }
  });
};

const renderEvents = () => {
  if (checkValue) {
    eventsEl.style.display = 'flex';
  }

  eventsEl.innerHTML = '';
  eventsList.forEach((event) => {
    const eventEl = document.createElement('p');
    eventEl.classList.add(event.includes('GANHOU') ? 'event-winner' : 'event');
    eventEl.innerHTML = event;
    eventsEl.appendChild(eventEl);
  });
}

const messageWinner = (message) => {
  eventsList.push(message);
  renderEvents();
};

const resetGame = () => {
  ticTacList = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  eventsList = [];
  eventsEl.innerHTML = '';
  gameEl.innerHTML = '';
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

  if (ticTacList.every((row) => row.every((col) => col !== 0))) {
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
