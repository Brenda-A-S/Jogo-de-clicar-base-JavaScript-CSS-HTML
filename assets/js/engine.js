import Modal from './modal.js'

export default class SmashGame {
    constructor(squares, enemy, time, score, btn, modal) {
        //valores pegos para manipular dom
        this.squares = squares;
        this.enemy = enemy;
        this.time = time;
        this.score = score;
        this.btn = btn;
        this.modal = modal;

        this.gameSpeed = 1000; // add velocidade dos intervalos uniforme
        this.hitPosition = 0; // add guardar posição do 'enemy'
        this.result = 0; // add guardar score
        this.currentTime = 0; // add tempo restante

        this.timerId; // add intervalo pra mudar o 'enemy' 
        this.countdownTimer; // add intervalo pra diminuir o tempo
        this.gameRunning = false; //add pra tentar fazer a velocidade do intervalo não aumentar

        this.countdown = this.countdown.bind(this);
        this.selectRandomSquare = this.selectRandomSquare.bind(this);
        this.verifyEnemy = this.verifyEnemy.bind(this);
        this.openResult = this.openResult.bind(this);
        this.startGame = this.startGame.bind(this);
        this.initGame = this.initGame.bind(this);
    }
    //método pra diminuir tempo e resetar jogo
    countdown() {
        if (this.currentTime > 0) {
            this.currentTime--;
            this.time.textContent = this.currentTime;
        }
        if (this.currentTime <= 0) {
            this.openResult();
            clearInterval(this.countdownTimer);
            clearInterval(this.timerId);
            clearInterval(this.timerId);
            !this.verifyEnemy();
            this.score.textContent = this.result;
            this.gameRunning = false;
        }
    }
    // método pra selecionar o quadrado aleatório
    selectRandomSquare() {
        if (this.currentTime > 0) {
            this.squares.forEach(square => square.classList.remove('enemy'));
            let randomNum = Math.floor(Math.random() * 9);
            this.hitPosition = randomNum;
            this.squares[randomNum].classList.add('enemy');
        }
    }
    // método para verificar se acertou o inimigo
    verifyEnemy() {
        if (this.gameRunning) {
            return; // controla o fluxo do jogo pra não incrementar a velocidade de intervalo
        }

        this.gameRunning = true;
        this.squares.forEach(square => {
            square.addEventListener('click', () => {
                if (this.hitPosition === +square.id) {
                    if (this.currentTime > 0) {
                        this.result++;
                    }
                    this.score.textContent = this.result;
                    this.hitPosition = null;
                    this.selectRandomSquare();
                    clearInterval(this.timerId); //limpa o intervalo atual se acerta o hit pro hit não sobrepor o outro intervalo, pra não bugar a alteração de quadrado e não ficar 1 click por segundo
                    this.timerId = setInterval(this.selectRandomSquare, this.gameSpeed); // depois seta um novo intervalo pra ficar alterando inimigo novamente
                }
            });
        });
    }
    openResult() {
        this.modal.newHTMLModal("Fim de Jogo", this.result, 'Jogar Novamente!')
        this.modal.container.classList.add('active')
    }
    // método de inicializações
    startGame() {
        this.verifyEnemy();
        this.currentTime = 10;
        score.textContent = 0;
        this.result = 0;
        clearInterval(this.timerId); // limpa intervalo remanescente do click
        this.timerId = setInterval(this.selectRandomSquare, this.gameSpeed);
        this.countdownTimer = setInterval(this.countdown, this.gameSpeed);
    }
    // método para iniciar o jogo ao clique no botão de play
    initGame() {
        this.btn.addEventListener('click', () => {
            if (this.gameRunning) return
            this.startGame();
        });
        this.modal.btnPlay.addEventListener('click', () => {
            this.startGame();
        })
    }
}

