'use strict';

//======================================TENNIS SVG==================================
/*
Реализовать игру «Теннис» методами SVG
Мяч прыгает по полю, слева и справа ракетки его отбивают.
Размер поля НЕ резиновый, он должен быть задан на уровне JavaScript-кода константами.
Запуск мяча — по кнопке «старт!», при этом мяч вылетает прямо из середины поля 
в случайном направлении под случайным (в разумных пределах) углом.
Управление левой ракеткой — клавишами Shift (вверх) и Ctrl (вниз),
правой ракеткой — «стрелка вверх» и «стрелка вниз». Пока клавиша удерживается, 
ракетка плавно движется; клавиша отпущена — ракетка останавливается.
Если ракетка отбивает мяч — мяч должен отпрыгнуть от ракетки (а не долететь до стенки сквозь ракетку).
Если мяч долетает до левой или правой стенки — засчитывается гол (ведётся подсчёт очков) 
и до следующего нажатия «старт!» мяч остановлен возле самой стенки, прикоснувшись к ней.
Никаких «волшебных констант» в коде не использовать — все константы вынести в начало скрипта с чётким документированием.
*/

(function () {

    try {
        var blockTennis = document.querySelector('.tennis');
        var btnTennisSVG = blockTennis.querySelector('.tennis__button-svg');
        var cntTennis = blockTennis.querySelector('.tennis__container');
    } catch {
        return;
    }

    var timer;
    const TENNIS_SIZE = window.matchMedia("(max-width: 768px)").matches?300:600;
    const SPEED = 5;
    const SIZES = {
        playgroundWidth: TENNIS_SIZE,
        playgroundHeight: TENNIS_SIZE/1.5,
        playerWidth: TENNIS_SIZE*0.02,
        playerHeight: TENNIS_SIZE*0.2,
        ball: TENNIS_SIZE*0.05,
        scoreboardFontSize: TENNIS_SIZE*0.1,
    };
    const COLORS = {
        playground: "#eceac7",
        playerLeft: "#c0978d",
        playerRight: "#5d5e62",
        ball: "#972426",
    }

    //мячик
    class Ball {

        constructor() {
            this.elem;
            this.speedX;
            this.speedY;
        };

        create = function(cnt,color,radius) {
            this.radius = radius;
            this.elem = document.createElementNS("http://www.w3.org/2000/svg","circle");
            this.elem.setAttribute("r", radius);
            this.elem.setAttribute("fill", color);
            cnt.appendChild(this.elem);
        };

        moveTo = function (posX,posY) {
            this.posX = posX;
            this.posY = posY;
            this.elem.setAttribute("cx", this.posX);
            this.elem.setAttribute("cy", this.posY);
        };
      
    }

    //ракетка
    class Player {

        constructor() {
            this.elem;
            this.speed = 0;
        };

        create = function(cnt,color,width,height) {
            this.width = width;
            this.height = height;
            this.elem = document.createElementNS("http://www.w3.org/2000/svg","rect");
            this.elem.classList.add("tennis__player");
            this.elem.setAttribute("x",0);
            this.elem.setAttribute("y",0);
            this.elem.setAttribute("width", this.width);
            this.elem.setAttribute("height", this.height);
            this.elem.setAttribute("fill", color);
            this.elem.setAttribute("rx", this.width/2);
            this.elem.setAttribute("ry", this.width/2);
            cnt.appendChild(this.elem);
        };

        moveTo = function (posX, posY) {
            this.posX = posX;
            this.posY = posY;
            this.elem.setAttribute("x", this.posX);
            this.elem.setAttribute("y", this.posY);
        };
      
    }

    //создание тенниса с помощью SVG
    function renderTennisSVG (cnt) {

        var pgHeight = SIZES.playgroundHeight;
        var pgWidth = SIZES.playgroundWidth;
        var scoreLeft = 0;
        var scoreRight = 0;

        //создаем табло
        var scoreboard = document.createElement("span");
        scoreboard.classList.add("tennis__scoreboard");
        scoreboard.style.fontSize = SIZES.scoreboardFontSize + "px";
        scoreboard.style.height = SIZES.scoreboardFontSize + "px";
        scoreboard.style.lineHeight = "normal";
        cnt.appendChild(scoreboard);
        updateScore();

        //создаем корт
        var tennisSVG = document.createElementNS("http://www.w3.org/2000/svg","svg");
        tennisSVG.classList.add("tennis__playground");
        tennisSVG.setAttribute("width", pgWidth);
        tennisSVG.setAttribute("height", pgHeight);
        tennisSVG.setAttribute("xmlns","http://www.w3.org/2000/svg");
        cnt.appendChild(tennisSVG);
        
        var tennis = document.createElementNS("http://www.w3.org/2000/svg","rect");
        tennis.setAttribute("x",0);
        tennis.setAttribute("y",0);
        tennis.setAttribute("width", pgWidth);
        tennis.setAttribute("height", pgHeight);
        tennis.setAttribute("fill", COLORS.playground);
        tennisSVG.appendChild(tennis);
        
        //создаем кнопку старта
        var btnStart = document.createElement("button");
        btnStart.classList.add("tennis__start");
        btnStart.textContent = "Start";
        cnt.appendChild(btnStart);
        btnStart.addEventListener("click", startGame);
        
        //создаем левую ракетку
        var playerLeft = new Player();
        playerLeft.create(tennisSVG,COLORS.playerLeft,SIZES.playerWidth,SIZES.playerHeight);
        playerLeft.moveTo(0,pgHeight/2 - playerLeft.height/2);

        //создаем правую ракетку
        var playerRight = new Player();
        playerRight.create(tennisSVG,COLORS.playerRight,SIZES.playerWidth,SIZES.playerHeight);
        playerRight.moveTo(pgWidth - playerRight.width,pgHeight/2 - playerRight.height/2);
                
        //создаем мяч
        var ball = new Ball();
        ball.create(tennisSVG,COLORS.ball,SIZES.ball/2);
        ball.moveTo((pgWidth/2),(pgHeight/2));

        //обновление табло
        function updateScore() {
            scoreboard.textContent =  scoreLeft + ":" + scoreRight;
        }

        //движение ракетки
        function movePlayer(player) {
            if (!player.speed) {
                return;
            }
            var posY = player.posY + player.speed;
            if (posY < 0) {
                posY = 0;
            };
            if ((posY + player.height) > pgHeight) {
                posY = pgHeight - player.height;
            };
            player.moveTo(player.posX,posY);
        }

        function randomDiap(n,m) {
            return Math.floor(Math.random()*(m-n+1))+n;
        }

        function randomSign() {
            return Math.sign(0.5-Math.random());
        }

        //клавиши
        window.addEventListener("keydown", function(evt) {
            if (evt.keyCode === 17) { //ctrl
                evt.preventDefault;
                playerLeft.speed = SPEED;
            };
            if (evt .keyCode === 16) { //shift
                evt.preventDefault;
                playerLeft.speed = -SPEED;
            };
            if (evt.keyCode === 40) { //down
                evt.preventDefault;
                playerRight.speed = SPEED;
            };
            if (evt.keyCode === 38) { //up
                evt.preventDefault;
                playerRight.speed = -SPEED;
            };
        });

        window.addEventListener("keyup", function(evt) {
            if (evt.keyCode === 17) { //ctrl
                evt.preventDefault;
                playerLeft.speed = 0;
            }
            if (evt .keyCode === 16) { //shift
                evt.preventDefault;
                playerLeft.speed = 0;
            }
            if (evt.keyCode === 40) { //down
                evt.preventDefault;
                playerRight.speed = 0;
            }
            if (evt.keyCode === 38) { //up
                evt.preventDefault;
                playerRight.speed = 0;
            }
        });

        //старт, продолжение игры
        function startGame() {
            //очищаем таймер и ставим мяч в центр поля
            clearInterval(timer);
            ball.moveTo((pgWidth/2),(pgHeight/2));
            //определим рандомно начальное направление и скорость мяча
            ball.speedX = randomDiap(SPEED,SPEED+2)*randomSign();
            ball.speedY = randomDiap(SPEED,SPEED+2)*randomSign();
            //запускаем мяч и ракетки
            function move() {
                //движения ракеток
                movePlayer(playerLeft);
                movePlayer(playerRight);

                //движения мячика
                ball.posX += ball.speedX;
                // попал ли мяч в правую ракетку?
                if ((ball.posX + ball.radius) > (pgWidth - playerRight.width)) {
                    var posDown = playerRight.posY + playerRight.height;
                    var posUp = playerRight.posY;
                    if ((ball.posY <= posDown) && (ball.posY >= posUp)) {
                        ball.speedX =- ball.speedX;
                        ball.posX = pgWidth - ball.radius - playerRight.width;
                    }
                }
                // ударился ли мяч в правую стену?
                if ((ball.posX + ball.radius) > pgWidth) {
                    ball.speedX =- ball.speedX;
                    ball.posX = pgWidth - ball.radius;
                    clearInterval(timer);
                    scoreLeft += 1;
                    updateScore();
                }
                // попал ли мяч в левую ракетку?
                if ((ball.posX - ball.radius) < playerLeft.width) {
                    var posDown = playerLeft.posY + playerLeft.height;
                    var posUp = playerLeft.posY;
                    if ((ball.posY <= posDown) && (ball.posY >= posUp)) {
                        ball.speedX =- ball.speedX;
                        ball.posX = playerRight.width + ball.radius;
                    }
                }
               // ударился ли мяч в левую стену?
                if ((ball.posX - ball.radius) < 0) {
                    ball.speedX =- ball.speedX;
                    ball.posX = ball.radius;
                    clearInterval(timer);
                    scoreRight += 1;
                    updateScore();
                }

                ball.posY += ball.speedY;
                // вылетел ли мяч ниже пола?
                if ((ball.posY + ball.radius) > pgHeight) {
                    ball.speedY =- ball.speedY;
                    ball.posY = pgHeight - ball.radius;
                }
                // вылетел ли мяч выше потолка?
                if ((ball.posY - ball.radius)< 0) {
                    ball.speedY =- ball.speedY;
                    ball.posY = ball.radius;
                }
                ball.moveTo(ball.posX,ball.posY);
            }
            timer = setInterval(move,40);
        }
    }

    btnTennisSVG.addEventListener('click', function() {
        clearInterval(timer);
        cntTennis.innerHTML = "";
        renderTennisSVG(cntTennis);
    });
})();
