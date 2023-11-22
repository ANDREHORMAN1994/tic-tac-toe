import { createTicTac } from './game.js';
import { handleCheck } from './check.js';

window.onload = () => {
  createTicTac();
  handleCheck();
};
