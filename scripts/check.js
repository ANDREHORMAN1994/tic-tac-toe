const eventsEl = document.querySelector('.container-events');
const checkEl = document.querySelector('.check-input');

let eventsList = [];
let checkValue = false;

const resetEventsList = () => {
  eventsList = [];
};

const renderEvents = () => {
  if (checkValue) {
    eventsEl.style.display = 'flex';
  }

  eventsEl.innerHTML = '';
  eventsList.forEach((event) => {
    const eventEl = document.createElement('p');
    eventEl.classList.add(
      (event.includes('GANHOU')) || (event.includes('EMPATE')) ? 'event-winner' : 'event'
    );
    eventEl.innerHTML = event;
    eventsEl.appendChild(eventEl);
  });
};

const messageWinner = (message) => {
  eventsList.push(message);
  renderEvents();
};

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

export {
  eventsEl,
  eventsList,
  checkValue,
  renderEvents,
  messageWinner,
  handleCheck,
  resetEventsList,
};
