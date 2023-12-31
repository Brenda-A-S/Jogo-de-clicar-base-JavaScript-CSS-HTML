export default class SmashGame {
    constructor(squares, enemy, time, score, btn, modal) {
        //valores pegos para manipular dom
        this.squares = document.querySelectorAll(squares);
        this.enemy = document.querySelector(enemy);
        this.time = document.querySelector(time);
        this.score = document.querySelector(score);
        this.btn = document.querySelector(btn);
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

        this.startGame = this.startGame.bind(this);
        this.addGameEvents = this.addGameEvents.bind(this);
    }
    // método que limpa intervalos 
    clearIntervals() {
        clearInterval(this.countdownTimer);
        clearInterval(this.timerId);
        clearInterval(this.timerId);
    }
    // método que reseta intervalo atual 
    resetCurrentInterval() {
        clearInterval(this.timerId);
        this.timerId = setInterval(this.selectRandomSquare, this.gameSpeed);
    }
    // metódo que toca um som
    playSound(audioName) {
        let audio = new Audio(`assets/audio/${audioName}.mp3`);
        audio.volume = 0.2;
        audio.play();
    }
    // método pra diminuir tempo e chamar função de reset
    countdown() {
        if (this.currentTime > 0) {
            this.currentTime--;
            this.time.textContent = this.currentTime;
        }
        if (this.currentTime <= 0) {
            this.endGame();
        }
    }
    // método pra resetar jogo ao fim do tempo
    endGame() {
        this.openResult();
        this.clearIntervals();
        this.removeEnemyEvent();
        this.score.textContent = this.result;
        this.gameRunning = false;
    }
    // método pra selecionar o quadrado aleatório
    selectRandomSquare() {
        if (this.currentTime > 0) {
            this.hitPosition = null;
            this.squares.forEach(square => square.classList.remove('enemy'));
            let randomNum = Math.floor(Math.random() * 9);
            this.hitPosition = randomNum;
            this.squares[randomNum].classList.add('enemy');
        }
    }
    // método que adiciona evento de verificar inimigo
    addEnemyEvent() {
        if (this.gameRunning) {
            return;
        }

        this.gameRunning = true;
        this.squares.forEach(square => {
            square.addEventListener('click', () => {
                this.verifyEnemy(square);
            });
        });
    }
    // método que remove evento de verificar inimigo
    removeEnemyEvent() {
        this.gameRunning = true;
        this.squares.forEach(square => {
            square.removeEventListener('click', () => {
                this.verifyEnemy(square);
            });
        });
    }
    // método para verificar se acertou o inimigo
    verifyEnemy(square) {
        if (this.hitPosition === +square.id) {
            if (this.currentTime > 0) {
                this.playSound('punch');
                this.result++;
            }
            this.score.textContent = this.result;
            this.selectRandomSquare();
            this.resetCurrentInterval();
        }
    }
    //método para abrir o resultado na modal
    openResult() {
        this.modal.newHTMLModal('Fim de jogo!', `Sua pontuação foi de: ${this.result}`, 'Jogar novamente!');
        this.modal.containerModal.classList.add('active');
    }
    // método para inciar jogo
    startGame() {
        // this.playSound('time');
        this.addEnemyEvent();
        this.currentTime = 15;
        this.score.textContent = 0;
        this.result = 0;
        this.resetCurrentInterval();
        this.countdownTimer = setInterval(this.countdown, this.gameSpeed);
    }
    // método para adicionar eventos
    addGameEvents() {
        this.btn.addEventListener('click', () => {
            if (this.gameRunning) return
            this.startGame();
        });
        this.modal.btnPlay.addEventListener('click', () => {
            if (this.gameRunning) return
            this.startGame();
        });
    }
    // método para iniciar o jogo ao clique no botão de play
    init() {
        this.addGameEvents();
        return this;
    }
}

