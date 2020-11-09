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
                    //console.log("class added!");
                    return;
                }
                //console.log("class removed!");
            }
        });
    });
    
    
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
            observer.observe(taskModal, {attributes: true});
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
            modalForm.classList.remove('modal--show');
            document.body.classList.remove('stop-scrolling');
        }
    }

    function closeModalOverlay(evt) {
        evt.target.classList.remove('modal--show');
        document.body.classList.remove('stop-scrolling');
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
