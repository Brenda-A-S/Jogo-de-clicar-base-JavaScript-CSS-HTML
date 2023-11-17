import SmashGame from "./engine.js";
import Modal from './modal.js'

const squares = document.querySelectorAll('.square');
const enemy = document.querySelector('.enemy');
const time = document.querySelector('#time');
const score = document.querySelector('#score');
const btn = document.querySelector('#play');

const modal = new Modal('#open', '#close', '#modalPlay', '.container-modal', '#title', '#text');
const game = new SmashGame(squares, enemy, time, score, btn, modal);

game.initGame();

modal.init();