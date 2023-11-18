import SmashGame from "./engine.js";
import Modal from './modal.js'

const modal = new Modal('#open', '#close', '#modalPlay', '.container-modal', '#title', '#text');
const game = new SmashGame('.square', '.enemy', '#time', '#score', '#play', modal);
modal.init();
game.init();

