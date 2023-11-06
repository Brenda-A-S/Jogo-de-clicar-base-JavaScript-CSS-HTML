import SmashGame from "./engine.js";
import Modal from './modal.js'

const squares = document.querySelectorAll('.square');
const enemy = document.querySelector('.enemy');
const time = document.querySelector('#time');
const score = document.querySelector('#score');
const btn = document.querySelector('#play');

const title = document.querySelector('#title');
const text = document.querySelector('#text');

const btnOpen = document.querySelector('#open');
const btnClose = document.querySelector('#close');
const btnPlay = document.querySelector('#modalPlay');
const containerModal = document.querySelector('.container-modal');

const modal = new Modal(btnOpen, btnClose, btnPlay, containerModal, title, text);
const game = new SmashGame(squares, enemy, time, score, btn, modal);

game.initGame();

modal.initModal();