import { handleCheck } from './check.js';
import { createTicTac } from './game.js';
import { changePlayer } from './block.js';

window.onload = () => {
  createTicTac();
  changePlayer();
  handleCheck();
};
