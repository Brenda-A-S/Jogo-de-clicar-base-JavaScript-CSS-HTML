import SmashGame from "./engine.js";
import Modal from './modal.js'

// jogo
const squares = document.querySelectorAll('.square');
const enemy = document.querySelector('.enemy');
const time = document.querySelector('#time');
const score = document.querySelector('#score');
const btn = document.querySelector('#play');

const game = new SmashGame(squares, enemy, time, score, btn);
game.startGame();


const btnOpen = document.querySelector('#open');
const btnClose = document.querySelector('#close');
const containerModal = document.querySelector('.container-modal');

const modal = new Modal(btnOpen, btnClose, containerModal);
modal.createModal()