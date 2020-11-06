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
