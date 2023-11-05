import SmashGame from "./engine.js";
const squares = document.querySelectorAll('.square');
const enemy = document.querySelector('.enemy');
const time = document.querySelector('#time');
const score = document.querySelector('#score');
const btn = document.querySelector('#play');

const game = new SmashGame(squares, enemy, time, score, btn);
game.startGame();
