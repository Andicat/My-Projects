'use strict';

//======================================TENNIS CANVAS==================================
/*
Реализовать игру «Теннис» методами Canvas
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
        var btnTennisSVG = blockTennis.querySelector('.tennis__button-canvas');
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
        playerHeight: TENNIS_SIZE*(0.2-0.02),
        ball: TENNIS_SIZE*0.05,
        scoreboardFontSize: TENNIS_SIZE*0.1,
    };
    const COLORS = {
        playground: "#eae3d8",
        playerLeft: "#d5a129",
        playerRight: "#787132",
        ball: "#9b4e23",
    }

    //мячик
    class Ball {

        constructor(cnt,color,radius,posX,posY) {
            this.speedX;
            this.speedY;
            this.cnt = cnt;
            this.color = color;
            this.radius = radius;
            this.elem;
            this.posX = posX;
            this.posY = posY;
        };

        draw = function() {
            this.cnt.fillStyle = this.color;
            this.cnt.beginPath();
            this.cnt.arc(this.posX, this.posY, this.radius, 0, Math.PI*2, false);
            this.cnt.fill();
        };
    }

    //ракетка
    class Player {

        constructor(cnt,color,width,height,posX,posY) {
            this.cnt = cnt;
            this.color = color;
            this.width = width;
            this.height = height;
            this.elem;
            this.posX = posX;
            this.posY = posY;
            this.speed = 0;
        };

        draw = function() {
            this.cnt.strokeStyle = this.color;
            this.cnt.lineWidth = this.width;
            this.cnt.lineCap = "round";
            this.cnt.beginPath();
            this.cnt.moveTo(this.posX,this.posY);
            this.cnt.lineTo(this.posX,this.posY + this.height);
            this.cnt.stroke();
        };
    }

    //создание тенниса с помощью Canvas
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

        //создаем канвас
        var tennisCanvas = document.createElement("canvas");
        tennisCanvas.classList.add("tennis__playground");
        tennisCanvas.setAttribute("width",pgWidth);
        tennisCanvas.setAttribute("height",pgHeight);
        cnt.appendChild(tennisCanvas);
        var context = tennisCanvas.getContext("2d");

        //создаем кнопку старта
        var btnStart = document.createElement("button");
        btnStart.classList.add("tennis__start");
        btnStart.textContent = "Start";
        cnt.appendChild(btnStart);
        btnStart.addEventListener("click", startGame);

        //создаем левую ракетку
        var playerLeft = new Player(context,COLORS.playerLeft,SIZES.playerWidth,SIZES.playerHeight,SIZES.playerWidth/2,pgHeight/2 - SIZES.playerHeight/2);
        //создаем правую ракетку
        var playerRight = new Player(context,COLORS.playerRight,SIZES.playerWidth,SIZES.playerHeight,pgWidth - SIZES.playerWidth/2,pgHeight/2 - SIZES.playerHeight/2);
        //создаем мяч
        var ball = new Ball(context,COLORS.ball,SIZES.ball/2,pgWidth/2,pgHeight/2);
      
        //обновление табло
        function updateScore() {
            scoreboard.textContent =  scoreLeft + ":" + scoreRight;
        }

        //создание рисунка на канвасе
        function draw() {
            //рисуем корт
            context.fillStyle = COLORS.playground;
            context.fillRect(0,0,pgWidth,pgHeight);
            //рисуем ракетки и мяч
            playerLeft.draw();
            playerRight.draw();
            ball.draw();
        }

        draw();

        //двигаем ракетки
        function movePlayer(player) {
            if (!player.speed) {
                return;
            }
            player.posY = player.posY + player.speed;
            if (player.posY < player.width/2) {
                player.posY = player.width/2;
            };
            if ((player.posY + player.height) > pgHeight - player.width/2) {
                player.posY = pgHeight - player.height - player.width/2;
            };
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
            draw();
            //определим рандомно начальное направление и скорость мяча
            ball.speedX = randomDiap(SPEED,SPEED+2)*randomSign();
            ball.speedY = randomDiap(SPEED,SPEED+2)*randomSign();
            ball.posX = pgWidth/2;
            ball.posY = pgHeight/2;
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
                draw();
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
