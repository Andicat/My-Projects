'use strict';

//======================================Chess-knight==================================
/*
Дана шахматная доска (8x8).
Найдите программно один способ обойти все 64 клетки доски конём, чтобы в каждой
клетке конь побывал ровно 1 раз. Обход должен начинаться с любой угловой клетки.
Отобразите на веб-странице найденный способ (в каждой клеточке - номер хода,
на котором конь попадает в эту клеточку).
По нажатию кнопки - отобразите процесс обхода конём доски в динамике,
т.е. конь становится в угловую клетку и делает ходы по 2-3 в секунду;
клетки, в которых конь уже побывал, подцвечивайте
*/

(function () {

    try {
        var blockchess = document.querySelector('.chess--knight');
        var btnChess = blockchess.querySelector('.chess__button');
        var cntChessBoard = blockchess.querySelector('.chess__board');
        var resultChess = blockchess.querySelector('.chess__result');
        var btnGoKnight = resultChess.querySelector('.chess__button--go');
        var textChessResult = resultChess.querySelector('.chess__result-text');
        var chessCeils;
        var knight;
    } catch {
        return;
    }

    function chessKnight () {

        const CHESS_SIZE = 8;
        var result = [];
        var timerId;

        //выводит результат
        function showResult(result) {
            if (result.length) {
                btnChess.classList.add("hidden");
                textChessResult.innerHTML = "Путь найден!"; 
                resultChess.classList.add("chess__result--show");
                result.forEach(function (ceil,i) {
                    chessCeils[ceil-1].innerHTML = i+1;
                });
                btnGoKnight.addEventListener("click", showKnightWalk);
            }
        }

        //отображает один шаг коня
        function step (i,newCeil,goRow,goCol) {
            clearTimeout(timerId);
            timerId = setTimeout(function () {
                var ceil = chessCeils[result[i]-1];
                
                //смена направления/клетки
                function isReach () {
                    if (knight.offsetTop === ceil.offsetTop) {
                        goCol = false;
                        if (knight.offsetLeft !== ceil.offsetLeft) {
                            goRow = true;
                        }    
                    }
                    if (knight.offsetLeft === ceil.offsetLeft) {
                        goRow = false;
                        if (knight.offsetTop !== ceil.offsetTop) {
                            goCol = true;
                        }
                    }
                    if (!goRow && !goCol) {
                        newCeil = true;
                        i++;
                    }
                    if (!result[i]) {
                        ceil.classList.add("chess__ceil--red");
                    }
                }
                
                if (newCeil) {
                    //определим начально направление хода коня
                    chessCeils[result[i-1]-1].style.fontSize = "";
                    chessCeils[result[i-1]-1].classList.add("chess__ceil--red");
                    var row = Math.abs(ceil.offsetLeft - knight.offsetLeft);
                    var col = Math.abs(ceil.offsetTop - knight.offsetTop);
                    goRow = (row > col) ? true: false;    
                    goCol = !goRow;
                    newCeil = false;
                }
                if (goCol && knight.offsetTop < ceil.offsetTop) { //вниз
                    knight.style.top = (knight.offsetTop + knight.offsetHeight)+'px'; 
                    isReach();
                } 
                else if (goCol && knight.offsetTop > ceil.offsetTop) { //вверх
                    knight.style.top = (knight.offsetTop - knight.offsetHeight)+'px'; 
                    isReach();
                } 
                else if (goRow && knight.offsetLeft < ceil.offsetLeft) { //вправо
                    knight.style.left = (knight.offsetLeft + knight.offsetWidth)+'px'; 
                    isReach();
                }
                else if (goRow && knight.offsetLeft > ceil.offsetLeft) { //влево
                    knight.style.left = (knight.offsetLeft - knight.offsetWidth)+'px'; 
                    isReach();
                }
                if (result[i]) {
                    step(i,newCeil,goRow,goCol);
                }
            }, 500)
        }
        
        //Рисует путь коня по шахматной доске
        function showKnightWalk() {
            knight.style.left = ""; 
            knight.style.top = ""; 
            knight.classList.remove("chess__knight--hidden");
            chessCeils.forEach(function(e) {
                e.classList.remove("chess__ceil--red");
                e.style.fontSize = "0px";
            })  
            clearTimeout(timerId);
            step(1,true); 
        };

        //создает шахматную доску и коня
        function initBoard() {
            var board = [];
            var divBoard = document.createElement('div');
            if (cntChessBoard) {
                blockchess.removeChild(cntChessBoard);
            }
            divBoard.className = "chess__board chess__board--knight";

            for  (var i = 1; i <= CHESS_SIZE*CHESS_SIZE; i++) {
                var nextStepArr = nextSteps(i);
                board.push({step:i, stepsArr:nextStepArr});
                var divCeil = document.createElement('div');
                var colorOfCeil = colorOfCeil==="black"?"white":"black";
                if ((i-1)%8===0) {
                    var colorOfCeil = colorOfCeil==="black"?"white":"black";
                }
                divCeil.className = "chess__ceil chess__ceil--knight chess__ceil--" + colorOfCeil;
                divBoard.appendChild(divCeil);
            };
            var divKnight = document.createElement('div');
            divKnight.className = "chess__ceil chess__knight chess__knight--hidden";
            divBoard.appendChild(divKnight);
            blockchess.appendChild(divBoard);
            cntChessBoard = divBoard;
            chessCeils = cntChessBoard.querySelectorAll('.chess__ceil');
            knight = cntChessBoard.querySelector('.chess__knight');
            return board;
        }

        //поиск возможных ходов для коня из данной клетки
        function nextSteps(ceil) {
            var steps = [];
            var next;
            
            var row = Math.ceil(ceil/CHESS_SIZE);
            var col = (ceil-(row-1)*CHESS_SIZE);
           
            //ходы "по горизонтали"
            if ((row-1)>=1) {
                //левый верхний ход
                if((col-2)>=1) {
                    next = (row-2)*CHESS_SIZE + (col-2);
                    steps.push(next);
                }
                //правый верхний ход
                if((col+2)<=CHESS_SIZE) {
                    next = (row-2)*CHESS_SIZE + (col+2);
                    steps.push(next);
                }
            }
            if ((row+1)<=CHESS_SIZE) {
                //левый нижний ход
                if((col-2)>=1) {
                    next = (row)*CHESS_SIZE + (col-2);
                    steps.push(next);
                }
                //правый нижний ход
                if((col+2)<=CHESS_SIZE) {
                    next = (row)*CHESS_SIZE + (col+2);
                    steps.push(next);
                }
            }
            //ходы "по вертикали"
            if ((row-2)>=1) {
                //левый верхний ход
                if((col-1)>=1) {
                    next = (row-3)*CHESS_SIZE + (col-1);
                    steps.push(next);
                }
                //правый верхний ход
                if((col+1)<=CHESS_SIZE) {
                    next = (row-3)*CHESS_SIZE + (col+1);
                    steps.push(next);
                }
            }
            if ((row+2)<=CHESS_SIZE) {
                //левый нижний ход
                if((col-1)>=1) {
                    next = (row+1)*CHESS_SIZE + (col-1);
                    steps.push(next);
                }
                //правый нижний ход
                if((col+1)<=CHESS_SIZE) {
                    next = (row+1)*CHESS_SIZE + (col+1);
                    steps.push(next);
                }
            }
            return steps.sort((a,b)=>a-b);
        };

        //поиск пути начиная с верхнего левого края шахматной доски
        function findWay (knight,board,combination) {
            var combinationCurr = combination.concat(knight);
            if (combinationCurr.length===CHESS_SIZE*CHESS_SIZE) {
                result = combinationCurr;
                return;
            }
            //сортируем клетки по "многоходовости". Конь шагает в самую "многоходовую" клетку 
            function sf (a,b) {
                var bl = (board.filter(v => v.step == b)[0].stepsArr.length);
                var al = board.filter(v => v.step == a)[0].stepsArr.length;
                return al - bl;
            }
            var nextStepsArr = board[0].stepsArr.sort(sf);
            //убираем с доски текущую клетку
            var boardCurr = [];
            for (var i = 1; i < board.length; i++) {
                var newStepsArr = board[i].stepsArr.filter(function(i) {
                    return i!==knight;
                });
                boardCurr.push({step:board[i].step, stepsArr:newStepsArr});
            }
            //перебор возможных ходов с текущей клетки
            for (var i = 0; i < nextStepsArr.length; i++) {
                var nextStep = nextStepsArr[i];
                if (result.length!==0) {
                    return;
                }
                //сортируем таблицу по след.шагу
                boardCurr = boardCurr.sort((a,b)=>{return a.step===nextStep?-1:0;});
                findWay(nextStep,boardCurr,combinationCurr); 
            }
            return;
        };

        var board = initBoard();
        findWay(1,board,[]);
        showResult(result);
    }

    if (btnChess) {
        btnChess.addEventListener('click', (event) => {
            chessKnight();
        });
    }

})();

'use strict';

(function() {
    
  try {
    var blockchess = document.querySelector('.chess');
    var btnChess = blockchess.querySelector('.chess__button');
    var cntChessBoard = blockchess.querySelector('.chess__board');
    var resultChess = blockchess.querySelector('.chess__result');
    var resultChessText = resultChess.querySelector('.chess__result-text');
    var btnComb = resultChess.querySelector('.chess__button--combination');
    var inputComb = resultChess.querySelector('.chess__combination');
    var chessCeils;
} catch {
    return;
}
        
function chessQueens () {
    
    if (cntChessBoard) {
        cntChessBoard.remove();
        inputComb.value = "";    
    }
    
    const CHESS_SIZE = 8;
    var combinations = [];

    //выводит количество комбинаций
    function showResult(combinations) {
        resultChessText.innerHTML = "Найдено комбинаций: " + combinations.length; 
        if (combinations.length) {
            resultChess.classList.add("chess__result--show");
        }
        btnComb.addEventListener("click", showCombination);
    }
    
    //рисует комбинацию на шахматной доске
    function showCombination() {
        var cmbNumber = inputComb.value;
        if (!Number(cmbNumber)) {
            return;
        }
                                
        chessCeils.forEach(function(e) {
            e.classList.remove("chess__ceil--red");
            e.classList.remove("chess__queen");
        })

        if (combinations[cmbNumber-1]) {
            combinations[cmbNumber-1].forEach( function(q) {
                var ceil = chessCeils[q.ceil];
                ceil.classList.add("chess__queen");
                ceil.addEventListener("click", function(evt) { showBattlefield(evt,q) })
            })
        }
    };

    //рисует "поле боя" ферзя
    function showBattlefield(evt,q) {
        chessCeils.forEach(function(e) {
            e.classList.remove("chess__ceil--red");
        })
        evt.target.classList.add("chess__ceil--red");
        q.battlefield.forEach(function(b) {
            chessCeils[b].classList.add("chess__ceil--red");
        })
    }

    //создает шахматную доску
    function initBoard() {
        var board = [];
        var divBoard = document.createElement('div');
        divBoard.className = "chess__board";

        for  (var i = 0; i< CHESS_SIZE; i++) {
            var row = [];
            for  (var j = 0; j< CHESS_SIZE; j++) {
                row.push(i*CHESS_SIZE+j);
                var divCeil = document.createElement('div');
                divCeil.className = "chess__ceil " + ((i%2 + j%2)===1? "chess__ceil--black" : "chess__ceil--white");
                divBoard.appendChild(divCeil);
            }
            board.push(row);    
        };

        blockchess.appendChild(divBoard);
        cntChessBoard = divBoard;
        chessCeils = cntChessBoard.querySelectorAll('.chess__ceil');
        return board;
    }

    //поиск "поля боя" для ферзя
    function disableCeils(ceilCurr) {
        var battlefield = [];
        
        var row = Math.floor(ceilCurr/CHESS_SIZE);
        var col = (ceilCurr-row*CHESS_SIZE);
        
        battlefield.push(ceilCurr);
        
        function disableOther(ceil) {
            if (ceil!==ceilCurr) {
                battlefield.push(ceil);
            }
        }
        
        for (var i = 0; i < CHESS_SIZE; i++) {
            //горизонтальный ряд
            disableOther(row*CHESS_SIZE + i);
            //вертикальный ряд
            disableOther(i*CHESS_SIZE + col);
            //диагональные ряды
            if ((row+i)<CHESS_SIZE && (col+i)<CHESS_SIZE) {
                disableOther((row+i)*CHESS_SIZE + col + i);
            }
            if ((row-i)>=0 && (col-i)>=0) {
                disableOther((row-i)*CHESS_SIZE +col-i);
            }
            if ((row+i)<CHESS_SIZE && (col-i)>=0) {
                disableOther((row+i)*CHESS_SIZE +col-i);
            }
            if ((row-i)>=0 && (col+i)<CHESS_SIZE) {
                disableOther((row-i)*CHESS_SIZE +col+i);
            }
        }
        return battlefield.sort((a,b)=>a-b);
    };

    //поиск возможных комбинаций
    function findCombinations (queens,board,text,count) {
        //перебор строки
        var rowCurr = board[0];
        for (var i = 0; i < rowCurr.length; i++) {
            var ceil = rowCurr[i];
            //массив "поля боя" для ферзя ceil
            var battleField = disableCeils(ceil);
            //удаляем с доски клетки
            var boardCurr = [];
            var emptyRow = false;
            for (var j = 1; j < board.length; j++) {
                var newRow = board[j].filter(function(i) {
                    return !battleField.includes(i);
                });
                //если какая-либо из строк на доске уже пуста, значит комбинация невозможна
                if (newRow.length === 0) {
                    emptyRow = true;
                };
                boardCurr.push(newRow);
            };
            if (emptyRow) {
                continue;
            }
            var queensCurr = queens.concat([{ceil:ceil,battlefield:battleField}]);
            //если ферзей уже 8, то сохраняем компбинацию
            if (queensCurr.length === CHESS_SIZE) {
                combinations.push(queensCurr);
                continue;
            }
            findCombinations(queensCurr,boardCurr,text + "     ",count+1); 
        }
        return;
    };

    var board = initBoard();
    findCombinations([],board,"",1);
    showResult(combinations);
}

if (btnChess) {
    btnChess.addEventListener('click', (event) => {
        chessQueens();
    });
}

})();

"use strict";

//======================================CLOCK==================================
/*
Создать проект CLOCK с помощью CANVAS.
*/

(function () {

    try {
        var blockClock = document.querySelector(".clock");
        var btnClockCanvas = blockClock.querySelector(".clock__button-canvas");
        var cntClock = blockClock.querySelector(".clock__container");
    } catch {
        return;
    }

    var timer;
    const CLOCK_SIZE = window.matchMedia("(max-width: 768px)").matches ? 300 : 500;
    const HOURS = 12;
    const SIZES = {
        clock: CLOCK_SIZE,
        font: CLOCK_SIZE/20,
        arrowSecLenght: CLOCK_SIZE*0.4,
        arrowSecWidth: CLOCK_SIZE*0.01,
        arrowMinLenght: CLOCK_SIZE*0.35,
        arrowMinWidth: CLOCK_SIZE*0.02,
        arrowHourLenght: CLOCK_SIZE*0.3,
        arrowHourWidth: CLOCK_SIZE*0.03,
    };
    const COLORS = {
        clock: "#ee9c77",
        number: "#e7723c",
        arrow: "black",
        center: "brown",
    }

    // дополняет строку слева нулями до нужной длины len 
    function str0l(val,len) {
        var strVal = val.toString();
        while (strVal.length < len) {
            strVal = "0" + strVal;
        }
        return strVal;
    }

    function initClockCanvas(cntClock) {

        var clockCanvas = document.createElement("canvas");
        clockCanvas.setAttribute("width",SIZES.clock);
        clockCanvas.setAttribute("height",SIZES.clock);
        cntClock.appendChild(clockCanvas);
        var context = clockCanvas.getContext("2d");

        var clockCenterX = SIZES.clock/2;
        var clockCenterY = SIZES.clock/2;

        //рисуем стрелку
        function drawArrow (arrowWidth, arrowHeight, arrowAngle) {
            var angle = arrowAngle/180*Math.PI;
            var arrowX1 = clockCenterX - (arrowHeight*0.05)*Math.sin(angle);
            var arrowY1 = clockCenterY + (arrowHeight*0.05)*Math.cos(angle);
            var arrowX2 = clockCenterX + (arrowHeight*0.95)*Math.sin(angle);
            var arrowY2 = clockCenterY - (arrowHeight*0.95)*Math.cos(angle);
            context.lineWidth = arrowWidth;
            context.lineCap = "round";
            context.beginPath();
            context.moveTo(arrowX1,arrowY1);
            context.lineTo(arrowX2,arrowY2);
            context.stroke();
        }
        
        //рисуем часы
        function drawClockCanvas () {

            clearTimeout(timer);
            var time = new Date();
            var sec = time.getSeconds();
            var min = time.getMinutes();
            var hour = time.getHours();
            var secAngle = (360/60)*sec;
            var minAngle = (360/60)*min + (360/60/60)*sec;
            var hourAngle = (360/HOURS)*hour + (360/HOURS/60)*min;
            var timeDigital =  str0l(hour,2) + ":" + str0l(min,2) + ":" + str0l(sec,2);
        
            //рисуем часы
            context.fillStyle = COLORS.clock;
            context.beginPath();
            context.arc(clockCenterX,clockCenterY, SIZES.clock/2, 0,Math.PI*2, false);
            context.fill();
            
            //рисуем циферблат
            var nmbClockRadius = parseFloat(SIZES.clock/2*0.85);
            var nmbRadius = SIZES.clock/20;
            for (var i = 1; i <= HOURS; i++) {
                var nmbAngle = (i*(360/HOURS))/180*Math.PI;
                var nmbCenterX = Math.round(clockCenterX + nmbClockRadius*Math.sin(nmbAngle));
                var nmbCenterY = Math.round(clockCenterY - nmbClockRadius*Math.cos(nmbAngle));
                //рисуем кружочки
                context.fillStyle = COLORS.number;
                context.beginPath();
                context.arc(nmbCenterX, nmbCenterY, nmbRadius, 0,Math.PI*2, false);
                context.fill();
                //рисуем цифры в кружочках
                context.fillStyle = COLORS.arrow;
                context.font = SIZES.font + "px Roboto";
                var textMeasures = context.measureText(i);
                var textWidth = textMeasures.width;
                var textHeight = textMeasures.actualBoundingBoxAscent + textMeasures.actualBoundingBoxDescent;
                context.fillText(i, nmbCenterX - textWidth/2, nmbCenterY +  textHeight/2);
            }

            //рисуем часовую стрелку
            drawArrow(SIZES.arrowHourWidth, SIZES.arrowHourLenght, hourAngle);
            //рисуем минутную стрелку
            drawArrow(SIZES.arrowMinWidth, SIZES.arrowMinLenght, minAngle);
            //рисуем секундную стрелку
            drawArrow(SIZES.arrowSecWidth, SIZES.arrowSecLenght, secAngle);

            //рисуем центр
            context.fillStyle = COLORS.center;
            context.beginPath();
            context.arc(clockCenterX, clockCenterY, SIZES.arrowSecWidth/2, 0,Math.PI*2, false);
            context.stroke();
            context.fill();
            
            //рисуем цифровые часы
            context.fillStyle = COLORS.arrow;
            context.font ="italic " + context.font;
            var textMeasures = context.measureText(timeDigital);
            var textWidth = textMeasures.width;
            context.fillText(timeDigital, SIZES.clock/2 - textWidth/2, Math.round(SIZES.clock/1.3));

            timer = setTimeout(drawClockCanvas,1000 - (new Date().getMilliseconds()));
        }

        drawClockCanvas();
    }

    btnClockCanvas.addEventListener("click", function() {
        clearInterval(timer);
        cntClock.innerHTML = "";
        initClockCanvas(cntClock);
    });
})();

'use strict';

//======================================CLOCK==================================
/*
Создать проект CLOCK_DOM. Реализовать методами DOM показывающие текущее время 
и идущие в реальном времени часы по нижеуказанному макету.
Цифры часов не верстать «жёстко», создавать их и вычислять их позиции в цикле.
Никаких «волшебных констант» в коде не использовать — все константы вынести в начало скрипта с чётким документированием.
Реализовать часы (проект CLOCK_SVG) с использованием SVG.
Описание — в домашнем задании про проект CLOCK_DOM.
*/

(function () {

    try {
        var blockClock = document.querySelector('.clock');
        var btnClockDOM = blockClock.querySelector('.clock__button-dom');
        var btnClockSVG = blockClock.querySelector('.clock__button-svg');
        var cntClock = blockClock.querySelector('.clock__container');
    } catch {
        return;
    }

    var timer;
    const CLOCK_SIZE = window.matchMedia("(max-width: 768px)").matches?300:500;
    const ARROW_SEC_LENGHT = CLOCK_SIZE*0.4;
    const ARROW_MIN_LENGHT = CLOCK_SIZE*0.35;
    const ARROW_HOUR_LENGHT = CLOCK_SIZE*0.3;
    const ARROW_SEC_WIDTH = CLOCK_SIZE*0.01;
    const ARROW_MIN_WIDTH = CLOCK_SIZE*0.02;
    const ARROW_HOUR_WIDTH = CLOCK_SIZE*0.03;

    // дополняет строку Val слева нулями до длины Len
    function str0l(val,len) {
        var strVal=val.toString();
        while ( strVal.length < len )
            strVal='0'+strVal;
        return strVal;
    }

    //создание часов с помощью DOM-элементов
    function renderClockDOM (cnt) {

        //ход часов
        function runTime() {
            clearTimeout(timer);
            var time = new Date();
            var sec = time.getSeconds();
            var min = time.getMinutes();
            var hour = time.getHours();
            var secAngle = (360/60)*sec;
            var minAngle = (360/60)*min + (360/60/60)*sec;
            var hourAngle = (360/12)*hour + (360/12/60)*min;
            digital.textContent =  str0l(hour,2) + ':' + str0l(min,2) + ':' + str0l(sec,2);
            arrowSec.style.transform = "rotate(" + secAngle + "deg)";
            arrowMin.style.transform = "rotate(" + minAngle + "deg)";
            arrowHour.style.transform = "rotate(" + hourAngle + "deg)";
            timer = setTimeout(runTime,1000);
        };

        //позиционирование цифры
        function posNmb(clock,nmb,count) {

            var radius = parseFloat(CLOCK_SIZE/2*0.85);
            var angle = (count*(360/12))/180*Math.PI;

            var clockCenterX = clock.offsetWidth/2;
            var clockCenterY = clock.offsetHeight/2;

            var nmbCenterX = clockCenterX + radius*Math.sin(angle);
            var nmbCenterY = clockCenterY - radius*Math.cos(angle);

            nmb.style.left = Math.round(nmbCenterX - nmb.offsetWidth/2)+'px';
            nmb.style.top = Math.round(nmbCenterY - nmb.offsetHeight/2)+'px';
        }

        //позиционирование стрелки
        function posArrow (clock,arrow) {

            var clockCenterX = clock.offsetWidth/2;
            var clockCenterY = clock.offsetHeight/2;

            arrow.style.left = Math.round(clockCenterX - arrow.offsetWidth/2)+'px';
            arrow.style.top = Math.round(clockCenterY - arrow.offsetHeight*0.95)+'px';
        }

        //создание стрелки
        function createArrow (arrowWidth, arrowHeight) {
            var arrow = document.createElement("div");
            arrow.classList.add("clock__arrow");
            arrow.style.width = arrowWidth + "px";
            arrow.style.borderRadius = arrowWidth + "px";
            arrow.style.height = (arrowHeight + arrowWidth) + "px";
            arrow.style.transformOrigin = Math.round(arrowWidth/2) + "px " + (arrowHeight + arrowWidth)*0.95 + "px";
            return arrow;
        }

        //создаем часы
        var clock = document.createElement("div");
        clock.classList.add("clock__figure");
        clock.style.width = CLOCK_SIZE + "px";
        clock.style.height = CLOCK_SIZE + "px";
        cnt.appendChild(clock);
        
        //создаем циферблат
        for (var i = 1; i <= 12; i++) {
            var nmb = document.createElement("div");
            nmb.classList.add("clock__number");
            nmb.style.width = CLOCK_SIZE/10 + "px";
            nmb.style.height = CLOCK_SIZE/10 + "px";
            nmb.style.fontSize = CLOCK_SIZE/20 + "px";
            nmb.textContent = i;
            clock.appendChild(nmb);
            posNmb(clock,nmb,i);
        }
        
        //создаем стрелки
        var arrowHour = createArrow(ARROW_HOUR_WIDTH,ARROW_HOUR_LENGHT);
        clock.appendChild(arrowHour);
        posArrow(clock,arrowHour);
        var arrowMin = createArrow(ARROW_MIN_WIDTH,ARROW_MIN_LENGHT);
        clock.appendChild(arrowMin);
        posArrow(clock,arrowMin);
        var arrowSec = createArrow(ARROW_SEC_WIDTH,ARROW_SEC_LENGHT);
        clock.appendChild(arrowSec);
        posArrow(clock,arrowSec);

        //создаем центр
        var center = document.createElement("div");
        center.style.width = ARROW_SEC_WIDTH + "px";
        center.style.height = ARROW_SEC_WIDTH + "px";
        center.style.backgroundColor = "brown";
        center.style.position = "absolute";
        center.style.borderRadius = "50%";
        center.style.top = (CLOCK_SIZE/2) + "px";
        center.style.left = (CLOCK_SIZE/2) + "px";
        center.style.transform = "translate(-50%,-50%)";
        clock.appendChild(center);

        //создаем цифровые часы
        var digital = document.createElement("div");
        digital.classList.add("clock__digital");
        digital.style.top = (CLOCK_SIZE - CLOCK_SIZE/10*3) + "px";
        digital.style.left = CLOCK_SIZE/2 + "px";
        digital.style.fontSize = CLOCK_SIZE/20 + "px";
        digital.style.transform = "translateX(-50%)";
        clock.appendChild(digital);
        
        //запускаем часы
        runTime();
    }

    //создание часов с помощью SVG
    function renderClockSVG (cnt) {

        //ход часов
        function runTime() {
            clearTimeout(timer);
            var time = new Date();
            var sec = time.getSeconds();
            var min = time.getMinutes();
            var hour = time.getHours();
            var secAngle = (360/60)*sec;
            var minAngle = (360/60)*min + (360/60/60)*sec;
            var hourAngle = (360/12)*hour + (360/12/60)*min;
            digital.textContent =  str0l(hour,2) + ':' + str0l(min,2) + ':' + str0l(sec,2);
            rotateArrow(arrowSec,secAngle,ARROW_SEC_LENGHT);
            rotateArrow(arrowMin,minAngle,ARROW_MIN_LENGHT);
            rotateArrow(arrowHour,hourAngle,ARROW_HOUR_LENGHT);
            timer = setTimeout(runTime,1000);
        };

        //поворот стрелки
        function rotateArrow(ar,angle,arLenght) {

            angle = angle/180*Math.PI;
            
            var clockCenterX = CLOCK_SIZE/2;
            var clockCenterY = CLOCK_SIZE/2;

            var arCenterX1 = clockCenterX - (arLenght*0.05)*Math.sin(angle);
            var arCenterY1 = clockCenterY + (arLenght*0.05)*Math.cos(angle);
            var arCenterX2 = clockCenterX + (arLenght*0.95)*Math.sin(angle);
            var arCenterY2 = clockCenterY - (arLenght*0.95)*Math.cos(angle);

            ar.setAttribute("x1", Math.round(arCenterX1));
            ar.setAttribute("y1", Math.round(arCenterY1));
            ar.setAttribute("x2", Math.round(arCenterX2));
            ar.setAttribute("y2", Math.round(arCenterY2));
        }

        //позиционирование цифры
        function posNmb(nmb,count) {

            var radius = parseFloat(CLOCK_SIZE/2*0.85);
            var angle = (count*(360/12))/180*Math.PI;
            
            var clockCenterX = CLOCK_SIZE/2;
            var clockCenterY = CLOCK_SIZE/2;

            var nmbCenterX = clockCenterX + radius*Math.sin(angle);
            var nmbCenterY = clockCenterY - radius*Math.cos(angle);

            var nmbSizes = nmb.getBoundingClientRect();

            nmb.setAttribute("x", Math.round(nmbCenterX - nmbSizes.width/2));
            nmb.setAttribute("y", Math.round(nmbCenterY - nmbSizes.height/2 ));
        }

        //создание стрелки
        function createArrow (arrowWidth, arrowHeight) {
            var arrow = document.createElementNS("http://www.w3.org/2000/svg","line");
            arrow.setAttribute("x1",CLOCK_SIZE/2);
            arrow.setAttribute("y1",CLOCK_SIZE/2);
            arrow.setAttribute("x2",CLOCK_SIZE/2);
            arrow.setAttribute("y2",CLOCK_SIZE/2 - arrowHeight);
            arrow.setAttribute("stroke-width",arrowWidth);
            arrow.setAttribute("stroke-linecap","round");
            arrow.setAttribute("stroke","black");
            return arrow;
        }

        //создаем часы
        var clockSvg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        clockSvg.setAttribute("width",CLOCK_SIZE);
        clockSvg.setAttribute("height",CLOCK_SIZE);
        clockSvg.setAttribute("xmlns","http://www.w3.org/2000/svg");
        cnt.appendChild(clockSvg);
        var clock = document.createElementNS("http://www.w3.org/2000/svg","circle");
        clock.classList.add("clock__figure");
        clock.setAttribute("cx",CLOCK_SIZE/2);
        clock.setAttribute("cy",CLOCK_SIZE/2);
        clock.setAttribute("r",CLOCK_SIZE/2);
        clockSvg.appendChild(clock);
        
        //создаем циферблат
        for (var i = 1; i <= 12; i++) {
            var nmbGroup = document.createElementNS("http://www.w3.org/2000/svg","svg");
            nmbGroup.classList.add("clock__number");
            nmbGroup.setAttribute("width",CLOCK_SIZE/10);
            nmbGroup.setAttribute("height",CLOCK_SIZE/10);
            var nmbCircle = document.createElementNS("http://www.w3.org/2000/svg","circle");
            nmbCircle.setAttribute("cx",CLOCK_SIZE/20);
            nmbCircle.setAttribute("cy",CLOCK_SIZE/20);
            nmbCircle.setAttribute("r",CLOCK_SIZE/20);
            var nmbText = document.createElementNS("http://www.w3.org/2000/svg","text");
            nmbText.setAttribute("x",CLOCK_SIZE/20);
            nmbText.setAttribute("y",CLOCK_SIZE/20*1.35);
            nmbText.setAttribute("text-anchor","middle");
            nmbText.setAttribute("font-size",CLOCK_SIZE/20);
            nmbText.setAttribute("fill","black");
            nmbText.textContent = i;
            nmbGroup.appendChild(nmbCircle);
            nmbGroup.appendChild(nmbText);
            clockSvg.appendChild(nmbGroup);
            posNmb(nmbGroup,i);
        }
        
        //создаем стрелки
        var arrowHour = createArrow(ARROW_HOUR_WIDTH,ARROW_HOUR_LENGHT);
        clockSvg.appendChild(arrowHour);
        var arrowMin = createArrow(ARROW_MIN_WIDTH,ARROW_MIN_LENGHT);
        clockSvg.appendChild(arrowMin);
        var arrowSec = createArrow(ARROW_SEC_WIDTH,ARROW_SEC_LENGHT);
        clockSvg.appendChild(arrowSec);

        //создаем центр
        var center = document.createElementNS("http://www.w3.org/2000/svg","circle");
        center.setAttribute("cx",CLOCK_SIZE/2);
        center.setAttribute("cy",CLOCK_SIZE/2);
        center.setAttribute("r",ARROW_SEC_WIDTH/2);
        center.setAttribute("fill","brown");
        clockSvg.appendChild(center);
        
        //создаем цифровые часы
        var digital = document.createElementNS("http://www.w3.org/2000/svg","text");
        digital.setAttribute("x",CLOCK_SIZE/2);
        digital.setAttribute("y",CLOCK_SIZE/1.35);
        digital.setAttribute("text-anchor","middle");
        digital.setAttribute("font-size",CLOCK_SIZE/20);
        digital.setAttribute("fill","black");
        clockSvg.appendChild(digital);
        
        //запускаем часы
        runTime();
    }

    btnClockDOM.addEventListener('click', function() {
        clearInterval(timer);
        cntClock.innerHTML = "";
        //const CLOCK_SIZE = cntClock.offsetWidth;
        renderClockDOM(cntClock);
    });

    btnClockSVG.addEventListener('click', function() {
        clearInterval(timer);
        cntClock.innerHTML = "";
        //const CLOCK_SIZE = cntClock.offsetWidth;
        renderClockSVG(cntClock);
    });

})();

'use strict';

//======================================DRAG-DROP==================================
/*
Реализовать на JavaScript перетаскивание мышью по веб-странице нескольких любых
(но не мелких) изображений. Обрабатывать как минимум события mousedown, mousemove, mouseup.
Изображения должны «таскаться» мышью за любую точку (т.е. и при «взятии» и при «отпускании» изображение смещаться не должно, оно должно смещаться только при смещении мыши при нажатой левой кнопке, ровно настолько, насколько смещена мышь).
Код не должен зависеть от количества картинок (т.е. код должен сам найти все картинки, находящиеся в указанном div-контейнере).
Картинки изначально НЕ должны быть спозиционированы (стилевое свойство position не должно быть задано).
Когда начинается перетаскивание какой-либо картинки, остальные картинки не должны сдвигаться.
Картинка, перетаскивание которой началось, должна оказываться выше (ближе к глазам), чем остальные.
На время перетаскивания менять форму курсора на подходящую.
E2+
В дополнительном задании DRAG&DROP (перетаскивание картинок на странице) реализуйте логику работы таким образом, 
чтобы на сами изображения никаких обработчиков событий не назначалось.
*/

(function () {

    try {
        var blockDragDrop = document.querySelector('.drag-drop');
        var cntImages = blockDragDrop.querySelector('.drag-drop__container');
        var imageList = cntImages.querySelectorAll('.drag-drop__image');
    } catch {
        return;
    }

    var mouseStart;
    var mouseShift;
    var rightMin;
    var bottomMin;
    var topMax;
    var limits;
    var leftMax;
    var topMax;
    var image;
    //var zInd = 0;

    window.addEventListener('load', onLoadDoc);

    function onLoadDoc() {
        for (var i = imageList.length-1; i >= 0; i--) {
            imageList[i].style.top = imageList[i].offsetTop + "px";
            imageList[i].style.left = imageList[i].offsetLeft + "px";
            imageList[i].style.position = "absolute";
            imageList[i].classList.add("drag-drop__image--drag");
            imageList[i].setAttribute("data-dragged",true);
        }
        //вешаем обработчики событий на контэйнер
        cntImages.addEventListener("mousedown", startMove);
        cntImages.addEventListener('touchstart',startMove);
    }
    
    function startMove(evt) {
        //если эта одна из картинок, то начинаем перетаскивание
        if (evt.target.getAttribute("data-dragged")) {
            evt.preventDefault();
            if (evt instanceof TouchEvent) {
                evt = evt.changedTouches[0];
            }
            //помещаем каринку поверх
            if (image!==evt.target) {
                image = evt.target;
                //zInd++;
                //image.style.zIndex = zInd;    
                cntImages.appendChild(image);
            };
            window.addEventListener('mousemove', move);
            window.addEventListener('touchmove', move,{ passive: false });
            window.addEventListener('mouseup', endMove);
            window.addEventListener('touchend', endMove);
            //начальные координаты мышки/пальца
            
            mouseStart = {
                x: evt.clientX,
                y: evt.clientY
            };
            //пределы
            leftMax = image.offsetLeft + image.offsetWidth;
            topMax = image.offsetTop + image.offsetHeight;
            rightMin = cntImages.offsetWidth - image.offsetLeft;
            bottomMin = cntImages.offsetHeight - image.offsetTop;
            limits = {
                bottom: cntImages.offsetHeight - image.offsetHeight,
                right: cntImages.offsetWidth - image.offsetWidth,
            };
        }
    }

    function move(evt) {
        evt.preventDefault();
        if (evt instanceof TouchEvent) {
            evt = evt.changedTouches[0];
        }
        //смещение мышки относительно начальных координат
        mouseShift = {
            x: evt.clientX - mouseStart.x,
            y: evt.clientY - mouseStart.y 
        };
        //новые стартовые координаты мышки
        mouseStart = {
            x: evt.clientX,
            y: evt.clientY
        };
        //показатели смещения
        var leftShift = Math.max(image.offsetLeft + mouseShift.x,0);
        var topShift = Math.max(image.offsetTop + mouseShift.y,0);
        //перемещаем объект
        image.style.top = Math.min(topShift, limits.bottom) + "px";
        image.style.left = Math.min(leftShift, limits.right) + "px";
    }

    function endMove(evt) {
        evt.preventDefault();
        window.removeEventListener('mousemove', move);
        window.removeEventListener('touchmove', move);
        window.removeEventListener('mouseup', endMove);
        window.removeEventListener('touchend', endMove);
    }

})();

'use strict';

//======================================ELEVATOR==================================
/*
G+
На экране - 9 этажей дома и лифт.
Количество этажей дома должно настраиваться в программе.
На каждом этаже - две кнопки для вызова лифта, "вверх" и "вниз", которые
подсвечиваются, если нажаты мышью.
В лифте - кнопки с номерами этажей, "1"-"9", которые подсвечиваются, если
нажаты мышью.
Одновременно может быть нажато несколько кнопок на разных этажах
и несколько кнопок внутри лифта.
Лифт (с использованием CSS- или JS-анимации) приезжает куда нужно, открывает
двери, закрывает, отвозит куда нужно.
Людей как-либо отображать не обязательно, но с ними будет интереснее :)
Логика работы лифта может быть любой разумной, например следующей:
1. Если лифт стоит, он поедет в ту сторону, откуда вызван первой же нажатой
   кнопкой.
2. Если лифт едет вверх, он будет ехать вверх, пока есть кого подбирать
   по пути вверх (т.е. этажи, где нажата кнопка "вверх")
   или есть кого высаживать (т.е. в нём нажаты кнопки верхних этажей).
   Как только больше некого подбирать или высаживать по пути вверх,
   лифт начинает ехать вниз (если опять же есть кого подбирать/высаживать
   снизу) или останавливается.
3. Если лифт едет вниз, он будет ехать вниз, пока есть кого подбирать
   или высаживать по пути вниз.
   Как только больше некого подбирать или высаживать по пути вниз,
   лифт начинает ехать вверх или останавливается.
*/

(function () {

    try {
        var blockElevator = document.querySelector('.elevator');
        var btnCreateHouse = blockElevator.querySelector('.elevator__create-house');
        var btnCreatePassengers = blockElevator.querySelector('.elevator__create-passengers');
        var cntHouse = blockElevator.querySelector('.elevator__container');
    } catch {
        return;
    }

    var newHouse;
    var FLATS = 9;
    var PASSENGERS = 10;

    var taskModal = document.getElementById("task-elevator");
    
    class House {

        constructor(flatsCount,cnt) {
            this.flatsCount = flatsCount;
            this.cnt = cnt;
        };
      
        createHouse = function () {

            var flats;
            var activeFlats = {};
            var nextFlats = [];
            var timerId;
            var direction = "";
            var flatCurr = 1;
            var elevator;
            var nextStop;
            var elevatorHeight = 50;
            var elevatorStep = elevatorHeight/10;

            //остановка лифта
            function openElevator(flat) {
                //открываем двери лифта
                elevator.classList.add("house__elevator--open");
                //после того как откроется лифт
                setTimeout(() => {
                    //есть кого высаживать?
                    var personsElevator = elevator.querySelectorAll(".person");
                    personsElevator.forEach(p => {
                        var personDestination = p.getAttribute("data-destination");
                        if (Number(personDestination)===flatCurr) {
                            elevator.removeChild(p);
                        }
                    });
                    //забираем пассажиров и нажимаем кнопки лифта (везем их куда им нужно)
                    var persons = flat.querySelectorAll(".person");
                    persons.forEach(p => {
                        var personDirection = p.getAttribute("data-direction");
                        var personDestination = p.getAttribute("data-destination");
                        //забираем всех кому по пути или всех, если это
                        if (direction===personDirection) {
                            var elevatorButton = document.getElementById("elevator-" + personDestination);
                            elevatorButton.click();
                            flat.removeChild(p);
                            elevator.appendChild(p);
                        } else if (nextFlats.length===0) {
                            var elevatorButton = document.getElementById("elevator-" + personDestination);
                            elevatorButton.click();
                            flat.removeChild(p);
                            elevator.appendChild(p);
                        }
                    });
                }, 500);

                //закрываем двери через секунду
                setTimeout(() => {
                    elevator.classList.remove("house__elevator--open");
                    continueMove();
                }, 1000);
            }

            //продолжение движения после остановки
            function continueMove() {

                //этажи впереди по направлению
                nextFlats = Object.keys(activeFlats).filter( function(f) {
                    if (direction==="up" && f > flatCurr) {
                        return true;
                    };
                    if (direction==="down" && f < flatCurr) {
                        return true;
                    };
                    return false;
                }).sort( function(a,b) { return (direction==="up"?a-b:b-a);});

                if (nextFlats.length > 0) {
                    nextStop = elevator.offsetTop + (direction==="up"?-elevatorHeight:+elevatorHeight);
                    flatCurr = direction==="up"?flatCurr+1:flatCurr-1;
                    moveElevator(50); 
                    return;
                }
                //меняем направление и едем в другую сторону
                if (Object.keys(activeFlats).length > 0) {
                    direction = direction==="up"?"down":"up";
                    nextStop = elevator.offsetTop + (direction==="up"?-elevatorHeight:+elevatorHeight);
                    flatCurr = direction==="up"?flatCurr+1:flatCurr-1;
                    moveElevator(50);
                    return;
                }
                //останавливаемся
                if (Object.keys(activeFlats).length===0) {
                    direction = "";
                    return;
                }
            }
           
            //движение лифта
            function moveElevator (speed) {
                clearTimeout(timerId);
                //проверим не закрыто ли окно с задачей
                if (!taskModal.classList.contains("modal--show")) {
                    cntHouse.innerHTML = "";
                    return;
                }
                    
                timerId = setTimeout(function () {
                    //доезжаем до этажа
                    if (elevator.offsetTop!==nextStop) {
                        elevator.style.top = elevator.offsetTop + (direction==="up"?-elevatorStep:+elevatorStep) + "px";
                        moveElevator(50);
                        return;
                    }
                    //этажи впереди по направлению
                    nextFlats = Object.keys(activeFlats).filter( function(f) {
                        if (direction==="up" && f > flatCurr) {
                            return true;
                        };
                        if (direction==="down" && f < flatCurr) {
                            return true;
                        };
                        return false;
                    }).sort( function(a,b) { return (direction==="up"?a-b:b-a);});
                    
                    //нужно ли останавливаться на этом этаже?
                    if (flatCurr in activeFlats) {
                        var isFlatActive = false;
                        var isOpen = false;
                        var disableAllButtons = (nextFlats.length===0 || Object.keys(activeFlats).length===0);
                        var flatButtons = document.querySelectorAll(".button-" + flatCurr);
                        //отключаем нажатые кнопки
                        flatButtons.forEach (b => {
                            if (b.classList.contains("active")) {
                                var bMode = b.getAttribute("data-mode");
                                if (bMode===null || bMode===direction || disableAllButtons) {
                                    b.classList.remove("active");
                                    isOpen = true;
                                } else {
                                    isFlatActive = true;
                                }
                            }
                        });
                        //если на этаже не осталось нажатых кнопок, удаляем из списка этажей
                        if (!isFlatActive) {
                            delete activeFlats[flatCurr];
                        }
                        if (isOpen) {
                            openElevator(flats[FLATS-flatCurr]);
                            return;
                        }
                        continueMove();
                        return;
                    }
                    
                    //не останавливаемся, определяем следующий этаж
                    if (!(flatCurr in activeFlats)) {
                        nextStop = elevator.offsetTop + (direction==="up"?-elevatorHeight:+elevatorHeight);
                        flatCurr = direction==="up"?flatCurr+1:flatCurr-1;
                        moveElevator(50);        
                    }
                }, speed)
            }

            //нажимаем кнопку
            function pushBtn(evt) {
                if (!evt.target.classList.contains("active")) {
                    var btnFlatNumber = Number(evt.target.getAttribute("data-number"));
                    var btnDirection = evt.target.getAttribute("data-mode");
                    btnDirection = btnDirection ? btnDirection : (btnFlatNumber>flatCurr ? "up" : "down");
                    evt.target.classList.add("active");
                    if (!(btnFlatNumber in activeFlats)) {
                        activeFlats[btnFlatNumber] = true;
                    }
                    //запускаем лифт, если он стоит
                    if (direction==="") {
                        direction = (btnFlatNumber===flatCurr ? btnDirection : (btnFlatNumber>flatCurr ? "up" : "down"));
                        nextStop = elevator.offsetTop;
                        moveElevator(50); 
                    }
                }
            }

            //создаем кнопку
            function createButton(cnt,type,nmb) {
                var button = document.createElement("div");
                button.classList.add("button-" + nmb);
                if (type==="elevator") {
                    button.classList.add("elevator__button");
                    button.setAttribute("id","elevator-" + nmb);
                    button.textContent = nmb;
                } else {
                    button.classList.add("flat__button");
                    button.classList.add("flat__button--" + type);
                    button.setAttribute("data-mode",type);
                }
                button.setAttribute("data-number",nmb);
                button.addEventListener("click", pushBtn);
                cnt.appendChild(button);
            };

            //создаем дом
            function create (cnt,flatsCount) {
                var house = document.createElement("div");
                house.classList.add("house");
                //создаем этажи
                var flats = document.createElement("div");
                flats.classList.add("house__flats");
                for (var i = flatsCount; i >= 1; i--) {
                    var flat = document.createElement("div");
                    flat.classList.add("flat");
                    flat.setAttribute("id","flat-" + i);
                    var flatNumber = document.createElement("span");
                    flatNumber.classList.add("flat__number");
                    flatNumber.textContent = i;
                    flat.appendChild(flatNumber);
                    //создаем кнопки лифта на этаже
                    var flatButtons = document.createElement("div");
                    flatButtons.classList.add("flat__buttons");
                    if (i<flatsCount) {
                        createButton(flatButtons,"up",i);
                    }
                    if (i>1) {
                        createButton(flatButtons,"down",i);
                    }
                    flat.appendChild(flatButtons);
                    flats.appendChild(flat);
                };
                //создаем лифт
                var shaft = document.createElement("div");
                shaft.classList.add("house__shaft");
                elevator = document.createElement("div");
                elevator.classList.add("house__elevator");
                //создаем кнопки в лифте
                var elevatorButtons = document.createElement("div");
                elevatorButtons.classList.add("elevator__buttons");
                for (var i = flatsCount; i >= 1; i--) {
                    createButton(elevatorButtons,"elevator",i);  
                }
                shaft.appendChild(elevator);
                house.appendChild(flats);
                house.appendChild(shaft);
                cnt.appendChild(house);
                cnt.appendChild(elevatorButtons);
            };

            create(this.cnt,this.flatsCount);
            flats = this.cnt.querySelectorAll(".flat");
        }

        goPeople = function () {

            var timerPerson;
            var personCount = 0;
            var flats = this.cnt.querySelectorAll(".flat");
            
            function randomDiap(n,m) {
                return Math.floor(Math.random()*(m-n+1))+n;
            }

            btnCreatePassengers.setAttribute("disabled",true);

            //создаем пассажира
            function createPerson(temp,flats) {
                clearTimeout(timerPerson);
                timerPerson = setTimeout( function() {
                    var person = document.createElement("div");
                    person.classList.add("person");
                    //этаж для пассажира рандомно
                    var flatNumber = randomDiap(1,FLATS);
                    var flat = flats[FLATS - flatNumber];
                    //выбор кнопки на этаже для пассажира рандомно
                    var flatButtons = flat.querySelectorAll(".flat__button");
                    var flatButton = flatButtons[randomDiap(0,flatButtons.length-1)];
                    flatButton.click();
                    //этаж назначения для пассажира рамдомно
                    var direction = flatButton.getAttribute("data-mode");
                    person.setAttribute("data-direction",direction);
                    var flatDestination = randomDiap(direction==="up"?(flatNumber+1):1,direction==="up"?FLATS:(flatNumber-1));
                    person.setAttribute("data-destination",flatDestination);
                    var dest = document.createElement("span");
                    dest.classList.add("person__dest");
                    dest.textContent = flatDestination;
                    //console.log("person on " + flatNumber + " go " + direction + " " + flatDestination);
                    person.appendChild(dest);
                    flat.appendChild(person);
                    personCount++;
                    btnCreatePassengers.textContent = (PASSENGERS - personCount) + " пассажиров";
                    if (personCount < PASSENGERS) {
                        createPerson(3000,flats);
                    }
                    if (personCount===PASSENGERS) {
                        btnCreatePassengers.textContent = PASSENGERS + " пассажиров";
                        btnCreatePassengers.removeAttribute("disabled");
                    }
                }, temp);
            }

            //создаем пассажира для тестов
            function createPersonTest(temp,flats,start,end,dir) {
                setTimeout( function() {
                    var person = document.createElement("div");
                    person.classList.add("person");
                    //этаж для пассажира рандомно
                    var flatNumber = start;
                    var flat = flats[FLATS - flatNumber];
                    //выбор кнопки на этаже для пассажира
                    var flatButton = flat.querySelector(".flat__button--" + dir);
                    flatButton.click();
                    //этаж назначения для пассажира
                    var direction = flatButton.getAttribute("data-mode");
                    person.setAttribute("data-direction",direction);
                    var flatDestination = end;
                    person.setAttribute("data-destination",flatDestination);
                    var dest = document.createElement("span");
                    dest.classList.add("person__dest");
                    dest.textContent = flatDestination;
                    //console.log("person on " + (FLATS - flatNumber) + " go " + direction + " " + flatDestination);
                    person.appendChild(dest);
                    flat.appendChild(person);
                }, temp);
            }
            createPerson(0,flats);
            //createPersonTest(0,flats,1,7,"up");
            //createPersonTest(0,flats,1,3,"up");
            //createPersonTest(1000,flats,8,4,"down");
        }
    }

    btnCreateHouse.addEventListener('click', (event) => {
        cntHouse.innerHTML = "";
        newHouse = new House(FLATS,cntHouse);
        newHouse.createHouse();
        btnCreatePassengers.removeAttribute("disabled");
        btnCreatePassengers.textContent = PASSENGERS + " пассажиров";

    });

    btnCreatePassengers.addEventListener("click", (event) => {
        newHouse.goPeople();
    });
})();

'use strict';

(function() {
    var taskList = document.querySelectorAll('.task-link');
    var modalFormList = document.querySelectorAll('.modal');
    var closeButtonsList = document.querySelectorAll(".modal__button-close");
    var closeButtonLink;
    var modalForm;
    var modalTaskLink;

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.attributeName == "class"){
                if (mutation.target.classList.contains('modal--show')) {
                    //debugger;
                    //console.log(mutation.target.getAttribute("id") + " OPEN!");
                    return;
                }
                //console.log(mutation.target.getAttribute("id") + " CLOSE!");
            }
        });
    });
    
    //modalFormList.forEach( modal =>  observer.observe(modal, {attributes: true}));
    // поток событий с информацией о погоде
    //var weatherEvents = new EventEmitter();
    
    //закрытие модальных окон по кнопке закрытия
    for (var i = 0; i < closeButtonsList.length; i++) {
        closeButtonLink = closeButtonsList[i];
        closeButtonLink.addEventListener("click", closeModals);
    }

    // закрытие модальных окон по esc
    window.addEventListener("keydown", function(evt) {
        if (evt.keyCode === 27) {
            evt.preventDefault();
            closeModals();
        }
    });

    // открытие модальных окон по ссылке
    for (var i = 0; i < taskList.length; i++) {
        modalTaskLink = taskList[i];
        modalTaskLink.addEventListener('click', function(evt) {
            var taskId = evt.target.getAttribute("data-task");
            var taskModal = document.getElementById(taskId);
            if (!taskModal) {
                return;
            }
            evt.preventDefault();
            document.body.classList.add('stop-scrolling');
            taskModal.classList.add('modal--show');
        });
    }

    // закрытие модальных окон по клику на modal-overlay
    for (var i = 0; i < modalFormList.length; i++) {
        modalForm = modalFormList[i];
        modalForm.addEventListener('click', function(evt) {
            if (evt.target === this) {
                closeModalOverlay(evt);
            }
        });
    }

    function closeModals() {
        for (var i = 0; i < modalFormList.length; i++) {
            modalForm = modalFormList[i];
            if (modalForm.classList.contains("modal--show")) {
                modalForm.classList.remove('modal--show');
            }
            document.body.classList.remove('stop-scrolling');
        }
    }

    function closeModalOverlay(evt) {
        evt.target.classList.remove('modal--show');
        document.body.classList.remove('stop-scrolling');
    }

})();

'use strict';

//======================================move-resize==================================
/*
На странице (не впритык к краям окна браузера) расположите какую-либо прямоугольную картинку.
На каждом углу картинки, и на середине каждой стороны картинки расположите небольшой управляющий элемент, за который можно перетаскивать картинку, меняя её размеры и пропорции.
При перетягивании за угол - пропорции картинки не должны изменяться.
При перетягивании за середину стороны - пропорции картинки меняются.
При перетягивании за саму картинку (не за управляющие элементы) - картинка должна перемещаться.
Независимо от движений мыши, управляющие элементы должны всегда оставаться на углах и серединах сторон картинки.

Подобное поведение, например, можно посмотреть в онлайн-SVG-редакторе: http://editor.method.ac/
нарисуйте прямоугольник, у него появятся те же 8 управляющих элементов,
попробуйте перетаскивать за них и отследите, как меняются размеры и пропорции прямоугольника.
Одна тонкость - при перетаскивании угловых элементов данный редактор позволяет произвольно менять соотношение сторон прямоугольника;
но вы реализуйте, чтобы угловые элементы меняли размер обеих сторон ПРОПОРЦИОНАЛЬНО.
*/

(function () {

    try {
        var blockMoveResize = document.querySelector('.move-resize');
        var cntImage = blockMoveResize.querySelector('.move-resize__container');
        var image = blockMoveResize.querySelector('.move-resize__image');
        var controlList = blockMoveResize.querySelectorAll('.move-resize__control');
    } catch {
        return;
    }

    var action;
    var mouseStart;
    var mouseShift;
    var rightMin;
    var bottomMin;
    var topMax;
    var limits;
    var leftMax;
    var topMax;
    var propWidth;
    var propHeight;
    
    //устанавливаем активность управляющих элементов
    function setAction(direction) {
        action = direction;
        controlList.forEach( function(control) {
            control.classList.remove("move-resize__control--active");
            control.classList.remove("move-resize__control--non-active");
            if (action) {
                control.classList.add("move-resize__control--non-active");
            }
            if (control.getAttribute("data-action")===action) {
                control.classList.remove("move-resize__control--non-active");
                control.classList.add("move-resize__control--active");
            }
        })
    }

    //вешаем обработчики мышки на странице
    document.addEventListener('mousedown', onMouseDown);

    function onMouseDown(evt) {
        setAction(evt.target.getAttribute("data-action"));
        if (action) {
            evt.preventDefault();
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            //начальные координаты мышки
            mouseStart = {
                x: evt.clientX,
                y: evt.clientY
            };
            //пределы
            leftMax = image.offsetLeft + image.offsetWidth;
            topMax = image.offsetTop + image.offsetHeight;
            rightMin = cntImage.offsetWidth - image.offsetLeft;
            bottomMin = cntImage.offsetHeight - image.offsetTop;
            limits = {
                bottom: cntImage.offsetHeight - image.offsetHeight,
                right: cntImage.offsetWidth - image.offsetWidth,
            };
            //пропорции картинки
            propWidth = image.offsetWidth;
            propHeight = image.offsetHeight;
        }
    }

    function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        //смещение мышки относительно начальных координат
        mouseShift = {
            x: moveEvt.clientX - mouseStart.x,
            y: moveEvt.clientY - mouseStart.y 
        };
        //новые стартовые координаты мышки
        mouseStart = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };

        //показатели смещения
        var leftShift = Math.max(image.offsetLeft + mouseShift.x,0);
        var rightShift = image.offsetWidth + mouseShift.x;
        var topShift = Math.max(image.offsetTop + mouseShift.y,0);
        var bottomShift = image.offsetHeight + mouseShift.y;

        switch(action) {
            //перемещение самой картинки по экрану
            case "image":
                image.style.top = Math.min(topShift, limits.bottom) + "px";
                image.style.left = Math.min(leftShift, limits.right) + "px";
                break;
            //ресайз картинки слева
            case "left":
                image.style.left = leftShift + "px";
                image.style.width = (leftMax - leftShift) + "px";
                if (leftShift >= leftMax) {
                    image.style.left = leftMax + "px";
                    rightMin = cntImage.offsetWidth - image.offsetLeft;
                    setAction("right");
                    image.classList.toggle("move-resize__image--mirrorX");
                }
                break;
            //ресайз картинки справа
            case "right":
                image.style.width = Math.min(rightShift,rightMin) + "px";
                if (rightShift <= 0) {
                    image.style.width = "0px";
                    leftMax = image.offsetLeft;
                    setAction("left");
                    image.classList.toggle("move-resize__image--mirrorX");
                }
                break;
            //ресайз картинки сверху
            case "top":
                image.style.top = topShift + "px";
                image.style.height = (topMax - topShift) + "px";
                if (topShift >= topMax) {
                    image.style.top = topMax + "px";
                    bottomMin = cntImage.offsetHeight - image.offsetTop;;
                    setAction("bottom");
                    image.classList.toggle("move-resize__image--mirrorY");
                }
                break;
            //ресайз картинки снизу
            case "bottom":
                image.style.height = Math.min(bottomShift,bottomMin) + "px";
                if (bottomShift <= 0) {
                    image.style.height = "0px";
                    topMax = image.offsetTop;
                    setAction("top");
                    image.classList.toggle("move-resize__image--mirrorY");
                }
                break;
            //ресайз картинки слева сверху
            case "left-top":
                if (image.offsetTop<=0 && mouseShift.x <= 0) {
                    leftShift = Math.max(image.offsetLeft,0);
                }
                image.style.width = Math.min(topMax /(propHeight/propWidth),(leftMax - leftShift)) + "px";
                image.style.height = Math.min((image.offsetWidth / (propWidth/propHeight)),topMax) + "px";
                image.style.top = (topMax - image.offsetHeight) + "px";
                image.style.left = (leftMax - image.offsetWidth) + "px";
                if (leftShift >= leftMax) {
                    image.style.left = leftMax + "px";
                    image.style.top = topMax + "px";
                    rightMin = cntImage.offsetWidth - image.offsetLeft;
                    bottomMin = cntImage.offsetHeight - image.offsetTop;
                    setAction("right-bottom");
                    image.classList.toggle("move-resize__image--mirrorX");
                    image.classList.toggle("move-resize__image--mirrorY");
                }
                break;
            //ресайз картинки справа снизу
            case "right-bottom":
                if (image.offsetHeight>=bottomMin && mouseShift.x > 0) {
                    rightShift = image.offsetWidth;
                }
                image.style.width = Math.min(bottomMin /(propHeight/propWidth),Math.min(rightShift,rightMin)) + "px";
                image.style.height = Math.min((image.offsetWidth / (propWidth/propHeight)),bottomMin) + "px";
                if (rightShift <= 0) {
                    image.style.width = "0px";
                    image.style.height = "0px";
                    topMax = image.offsetTop;
                    leftMax = image.offsetLeft;
                    
                    setAction("left-top");
                    image.classList.toggle("move-resize__image--mirrorX");
                    image.classList.toggle("move-resize__image--mirrorY");
                }
                break;
            //ресайз картинки справа сверху
            case "right-top":
                if (image.offsetTop<=0 && mouseShift.x > 0) {
                    rightShift = image.offsetWidth;
                }
                image.style.width = Math.min(topMax/(propHeight/propWidth),Math.min(rightShift,rightMin)) + "px";
                image.style.height = Math.min((image.offsetWidth/(propWidth/propHeight)),topMax) + "px";
                image.style.top = (topMax - image.offsetHeight) + "px";
                if (rightShift <= 0) {
                    image.style.width = "0px";
                    image.style.top = topMax + "px";
                    leftMax = image.offsetLeft;
                    bottomMin = cntImage.offsetHeight - image.offsetTop;
                    setAction("left-bottom");
                    image.classList.toggle("move-resize__image--mirrorX");
                    image.classList.toggle("move-resize__image--mirrorY");
                }
                break;
            //ресайз картинки слева снизу
            case "left-bottom":
                if (image.offsetHeight>=bottomMin && mouseShift.x <= 0) {
                    leftShift = Math.max(image.offsetLeft,0);
                }
                image.style.width = Math.min(bottomMin /(propHeight/propWidth),(leftMax - leftShift)) + "px";
                image.style.height = Math.min((image.offsetWidth / (propWidth/propHeight)),bottomMin) + "px";
                image.style.left = (leftMax - image.offsetWidth) + "px";
                if (leftShift >= leftMax) {
                    image.style.left = leftMax + "px";
                    image.style.width = "0px";
                    image.style.height = "0px";
                    rightMin = cntImage.offsetWidth - image.offsetLeft;
                    topMax = image.offsetTop;
                    setAction("right-top");
                    image.classList.toggle("move-resize__image--mirrorX");
                    image.classList.toggle("move-resize__image--mirrorY");
                }
                break;
            default:
                break;
        }
    }

    function onMouseUp(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        setAction(null);
        document.removeEventListener('mouseup', onMouseUp);
    }

})();

'use strict';

(function() {

    const anchorList = document.querySelectorAll('.nav__item');

    anchorList.forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const blockID = e.target.getAttribute('href').substr(1);
            window.scrollTo({top: document.getElementById(blockID).offsetTop, left: 0, behavior: 'smooth',});
        });
    });
})();

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

'use strict';

//======================================TENNIS==================================
/*
Реализовать игру «Теннис» методами DOM (проект TENNIS_DOM).
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
        var btnTennisDOM = blockTennis.querySelector('.tennis__button-dom');
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
        playground: "#eae3d8",
        playerLeft: "#3d677b",
        playerRight: "#c28f48",
        ball: "#9a4832",
    }

    //мячик
    class Ball {

        constructor() {
            this.elem;
        };

        create = function(cnt,color,width,height,speed) {
            this.width = width;
            this.height = height;
            this.speedX = speed;
            this.speedY = speed;
            this.elem = document.createElement("div");
            this.elem.style.width = this.width + "px";
            this.elem.style.height = this.height + "px";
            this.elem.style.backgroundColor = color;
            this.elem.style.position = "absolute";
            this.elem.style.borderRadius = "50%";
            this.elem.style.transform = "translate(-50%,-50%)";
            cnt.appendChild(this.elem);
        };

        moveTo = function (posX,posY) {
            this.posX = posX;
            this.posY = posY;
            this.elem.style.left = this.posX + "px";
            this.elem.style.top = this.posY + "px";
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
            this.elem = document.createElement("div");
            this.elem.classList.add("tennis__player");
            this.elem.style.width = this.width + "px";
            this.elem.style.height = this.height + "px";
            this.elem.style.backgroundColor = color;
            this.elem.style.borderRadius = this.width/2 + "px";
            this.elem.style.position = "absolute";
            cnt.appendChild(this.elem);
        };

        moveTo = function (posX, posY) {
            this.posX = posX;
            this.posY = posY;
            this.elem.style.left = this.posX + "px";
            this.elem.style.top = this.posY + "px";
        };
      
    }

    //создание тенниса с помощью DOM-элементов
    function renderTennisDOM (cnt) {

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
        var tennis = document.createElement("div");
        tennis.classList.add("tennis__playground");
        tennis.style.width = pgWidth + "px";
        tennis.style.height = pgHeight + "px";
        tennis.style.backgroundColor = COLORS.playground;
        cnt.appendChild(tennis);

        //создаем кнопку старта
        var btnStart = document.createElement("button");
        btnStart.classList.add("tennis__start");
        btnStart.textContent = "Start";
        cnt.appendChild(btnStart);
        btnStart.addEventListener("click", startGame);
        
        //создаем ракетку 1
        var playerLeft = new Player();
        playerLeft.create(tennis,COLORS.playerLeft,SIZES.playerWidth,SIZES.playerHeight);
        playerLeft.moveTo(0,pgHeight/2 - playerLeft.height/2);

        //создаем ракетк 2
        var playerRight = new Player();
        playerRight.create(tennis,COLORS.playerRight,SIZES.playerWidth,SIZES.playerHeight);
        playerRight.moveTo(pgWidth - playerRight.width,pgHeight/2 - playerRight.height/2);
                
        //создаем мяч
        var ball = new Ball();
        ball.create(tennis,COLORS.ball,SIZES.ball,SIZES.ball,SPEED);
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
            clearInterval(timer);
            ball.moveTo((pgWidth/2),(pgHeight/2));
            //определим рандомно направление и скорость мяча
            ball.speedX = randomDiap(SPEED,SPEED+2)*randomSign();
            ball.speedY = randomDiap(SPEED,SPEED+2)*randomSign();

            function move() {
                //движения ракеток
                movePlayer(playerLeft);
                movePlayer(playerRight);

                //движения мячика
                ball.posX += ball.speedX;
                // попал ли мяч в правую ракетку?
                if ((ball.posX + ball.width/2) > (pgWidth - playerRight.width)) {
                    var posDown = playerRight.posY + playerRight.height;
                    var posUp = playerRight.posY;
                    if ((ball.posY <= posDown) && (ball.posY >= posUp)) {
                        ball.speedX =- ball.speedX;
                        ball.posX = pgWidth - ball.width/2 - playerRight.width;
                    }
                }
                // ударился ли мяч в правую стену?
                if ((ball.posX + ball.width/2) > pgWidth) {
                    ball.speedX =- ball.speedX;
                    ball.posX = pgWidth - ball.width/2;
                    clearInterval(timer);
                    scoreLeft += 1;
                    updateScore();
                }
                // попал ли мяч в левую ракетку?
                if ((ball.posX - ball.width/2) < playerLeft.width) {
                    var posDown = playerLeft.posY + playerLeft.height;
                    var posUp = playerLeft.posY;
                    if ((ball.posY <= posDown) && (ball.posY >= posUp)) {
                        ball.speedX =- ball.speedX;
                        ball.posX = playerRight.width + ball.width/2;
                    }
                }
               // ударился ли мяч в левую стену?
                if ((ball.posX - ball.width/2) < 0) {
                    ball.speedX =- ball.speedX;
                    ball.posX = ball.width/2;
                    clearInterval(timer);
                    scoreRight += 1;
                    updateScore();
                }

                ball.posY += ball.speedY;
                // вылетел ли мяч ниже пола?
                if ((ball.posY + ball.height/2) > pgHeight) {
                    ball.speedY =- ball.speedY;
                    ball.posY = pgHeight - ball.height/2;
                }
                // вылетел ли мяч выше потолка?
                if ((ball.posY - ball.height/2)< 0) {
                    ball.speedY =- ball.speedY;
                    ball.posY = ball.height/2;
                }
                ball.moveTo(ball.posX,ball.posY);
            }
            timer = setInterval(move,40);
        }
    }

    btnTennisDOM.addEventListener('click', function() {
        clearInterval(timer);
        cntTennis.innerHTML = "";
        renderTennisDOM(cntTennis);
    });
})();

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

/ In this example, if you make an ajax request to the following website
var myUrl = 'http://www.geoplugin.net/json.gp?ip=216.58.209.68';
//  But if you make it from a browser, then it will work without problem ...

// However to make it work, we are going to use the cors-anywhere free service to bypass this
var proxy = 'https://cors-anywhere.herokuapp.com/';

/*Maybe try this:
cors-anywhere-master/server.js line 26
requireHeader : ['origin', 'x-requested-with']
just empty the array
requireHeader : []
Fo*r me its still not working but this is what I can suggest now..*/

$.ajax({
    // The proxy url expects as first URL parameter the URL to be bypassed
	// https://cors-anywhere.herokuapp.com/{my-url-to-bypass}
	//receiveReq.setRequestHeader("Origin", "*");
	url: proxy + myUrl,
	complete:function(data){
        console.log(data);
    }
});




})();
