import SmashGame from "./engine.js";
import Modal from './modal.js'

const modal = new Modal('#open', '#close', '#modalPlay', '.container-modal', '#title', '#text');
modal.init();

const game = new SmashGame('.square', '.enemy', '#time', '#score', '#play', modal);
game.initGame();

