export default class SmashGame {
    constructor(squares, enemy, time, score, btn) {
        //valores pegos para manipular dom
        this.squares = squares;
        this.enemy = enemy;
        this.time = time;
        this.score = score;
        this.btn = btn;

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
        this.startGame = this.startGame.bind(this);
    }
    //método pra diminuir tempo e resetar jogo
    countdown() {
        if (this.currentTime > 0) {
            this.currentTime--;
            this.time.textContent = this.currentTime;
        }
        if (this.currentTime <= 0) {
            clearInterval(this.countdownTimer);
            clearInterval(this.timerId);
            clearInterval(this.timerId);
            !this.verifyEnemy();
            this.score.textContent = this.result;            
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
    // método para iniciar o jogo ao clique no botão de play
    startGame() {
        this.btn.addEventListener('click', () => { 
            this.verifyEnemy();
            this.currentTime = 5;
            score.textContent = 0;
            this.result = 0;
            clearInterval(this.timerId); // limpa intervalo remanescente do click
            this.timerId = setInterval(this.selectRandomSquare, this.gameSpeed);
            this.countdownTimer = setInterval(this.countdown, this.gameSpeed);
        });
    }
}

