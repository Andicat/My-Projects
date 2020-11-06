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
