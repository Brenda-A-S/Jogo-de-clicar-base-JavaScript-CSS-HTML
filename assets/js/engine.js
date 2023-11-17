export default class SmashGame {
    constructor(squares, enemy, time, score, modal) {
        //valores pegos para manipular dom
        this.squares = document.querySelectorAll(squares);
        this.enemy = document.querySelector(enemy);
        this.time = document.querySelector(time);
        this.score = document.querySelector(score);
        this.modal = modal;

        this.gameSpeed = 1000; // add velocidade dos intervalos uniforme
        this.hitPosition = 0; // add guardar posição do 'enemy'
        this.result = 0; // add guardar score
        this.currentTime = 0; // add tempo restante

        this.timerId; // add intervalo pra mudar o 'enemy' 
        this.countdownTimer; // add intervalo pra diminuir o tempo
        this.gameRunning = false; //add pra tentar fazer a velocidade do intervalo não aumentar

        if (this.title === undefined) this.title = 'Você venceu!';
        else this.title = title;
        if (this.text === undefined) this.text = `Sua pontuação foi de: ${this.result}`;
        else this.text = text;
        if (this.btnText === undefined) this.btnText = 'Jogar novamente!';
        else this.btnText = btn;

        this.countdown = this.countdown.bind(this);
        this.selectRandomSquare = this.selectRandomSquare.bind(this);
        
        this.startGame = this.startGame.bind(this);
        this.addGameEvents = this.addGameEvents.bind(this);
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
    //metódo para setar titulo e texto para modal de resultado
    setResultContent(title, text, btn) {
        this.title = title;
        this.text = text;
        this.btnText = btn;
    }
    //método para abrir o resultado na modal
    openResult() {
        this.modal.newHTMLModal(this.title, this.text, this.btnText);
        this.modal.toggleModal();
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
    // método para adicionar eventos
    addGameEvents() {
        this.modal.btnPlay.addEventListener('click', () => {
            if (this.gameRunning) return
            this.startGame();
        });
        this.modal.btnPlay.addEventListener('click', () => {
            this.startGame();
        })
    }
    // método para iniciar o jogo ao clique no botão de play
    init() {
        this.addGameEvents();
        return this;
    }
}

