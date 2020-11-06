/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/polyfills */ \"./js/utils/polyfills.js\");\n/* harmony import */ var _utils_ie_footer_nailing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/ie-footer-nailing */ \"./js/utils/ie-footer-nailing.js\");\n/* harmony import */ var _modules_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/scroll */ \"./js/modules/scroll.js\");\n/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ \"./js/modules/modal.js\");\n/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_modal__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _modules_chess__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/chess */ \"./js/modules/chess.js\");\n/* harmony import */ var _modules_chess__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_chess__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _modules_chess_knight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/chess-knight */ \"./js/modules/chess-knight.js\");\n/* harmony import */ var _modules_chess_knight__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_chess_knight__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _modules_elevator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/elevator */ \"./js/modules/elevator.js\");\n/* harmony import */ var _modules_elevator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_modules_elevator__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n// Utils\n// ---------------------------------\n\nObject(_utils_polyfills__WEBPACK_IMPORTED_MODULE_0__[\"polyfills\"])();\nObject(_utils_ie_footer_nailing__WEBPACK_IMPORTED_MODULE_1__[\"ieFooterNailing\"])();\n\n// Modules\n// ---------------------------------\n\nObject(_modules_scroll__WEBPACK_IMPORTED_MODULE_2__[\"initSmoothScrolling\"])();\n\n// Tasks\n// ---------------------------------\n\n\n\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/modules/chess-knight.js":
/*!************************************!*\
  !*** ./js/modules/chess-knight.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\n//======================================Chess-knight==================================\r\n/*\r\nДана шахматная доска (8x8).\r\nНайдите программно один способ обойти все 64 клетки доски конём, чтобы в каждой\r\nклетке конь побывал ровно 1 раз. Обход должен начинаться с любой угловой клетки.\r\nОтобразите на веб-странице найденный способ (в каждой клеточке - номер хода,\r\nна котором конь попадает в эту клеточку).\r\nПо нажатию кнопки - отобразите процесс обхода конём доски в динамике,\r\nт.е. конь становится в угловую клетку и делает ходы по 2-3 в секунду;\r\nклетки, в которых конь уже побывал, подцвечивайте\r\n*/\r\n\r\n(function () {\r\n\r\n    try {\r\n        var blockchess = document.querySelector('.chess--knight');\r\n        var btnChess = blockchess.querySelector('.chess__button');\r\n        var cntChessBoard = blockchess.querySelector('.chess__board');\r\n        var resultChess = blockchess.querySelector('.chess__result');\r\n        var btnGoKnight = resultChess.querySelector('.chess__button--go');\r\n        var textChessResult = resultChess.querySelector('.chess__result-text');\r\n        var chessCeils;\r\n        var knight;\r\n    } catch {\r\n        return;\r\n    }\r\n            \r\n    function chessKnight () {\r\n\r\n        const CHESS_SIZE = 8;\r\n        var result = [];\r\n        var timerId;\r\n\r\n        //выводит результат\r\n        function showResult(result) {\r\n            if (result.length) {\r\n                btnChess.classList.add(\"hidden\");\r\n                textChessResult.innerHTML = \"Путь найден!\"; \r\n                resultChess.classList.add(\"chess__result--show\");\r\n                result.forEach(function (ceil,i) {\r\n                    chessCeils[ceil-1].innerHTML = i+1;\r\n                });\r\n                btnGoKnight.addEventListener(\"click\", showKnightWalk);\r\n            }\r\n        }\r\n\r\n        //отображает один шаг коня\r\n        function step (i,newCeil,goRow,goCol) {\r\n            clearTimeout(timerId);\r\n            timerId = setTimeout(function () {\r\n                var ceil = chessCeils[result[i]-1];\r\n                \r\n                //смена направления/клетки\r\n                function isReach () {\r\n                    if (knight.offsetTop === ceil.offsetTop) {\r\n                        goCol = false;\r\n                        if (knight.offsetLeft !== ceil.offsetLeft) {\r\n                            goRow = true;\r\n                        }    \r\n                    }\r\n                    if (knight.offsetLeft === ceil.offsetLeft) {\r\n                        goRow = false;\r\n                        if (knight.offsetTop !== ceil.offsetTop) {\r\n                            goCol = true;\r\n                        }\r\n                    }\r\n                    if (!goRow && !goCol) {\r\n                        newCeil = true;\r\n                        i++;\r\n                    }\r\n                    if (!result[i]) {\r\n                        ceil.classList.add(\"chess__ceil--red\");\r\n                    }\r\n                }\r\n                \r\n                if (newCeil) {\r\n                    //определим начально направление хода коня\r\n                    chessCeils[result[i-1]-1].style.fontSize = \"\";\r\n                    chessCeils[result[i-1]-1].classList.add(\"chess__ceil--red\");\r\n                    var row = Math.abs(ceil.offsetLeft - knight.offsetLeft);\r\n                    var col = Math.abs(ceil.offsetTop - knight.offsetTop);\r\n                    goRow = (row > col) ? true: false;    \r\n                    goCol = !goRow;\r\n                    newCeil = false;\r\n                }\r\n                if (goCol && knight.offsetTop < ceil.offsetTop) { //вниз\r\n                    knight.style.top = (knight.offsetTop + knight.offsetHeight)+'px'; \r\n                    isReach();\r\n                } \r\n                else if (goCol && knight.offsetTop > ceil.offsetTop) { //вверх\r\n                    knight.style.top = (knight.offsetTop - knight.offsetHeight)+'px'; \r\n                    isReach();\r\n                } \r\n                else if (goRow && knight.offsetLeft < ceil.offsetLeft) { //вправо\r\n                    knight.style.left = (knight.offsetLeft + knight.offsetWidth)+'px'; \r\n                    isReach();\r\n                }\r\n                else if (goRow && knight.offsetLeft > ceil.offsetLeft) { //влево\r\n                    knight.style.left = (knight.offsetLeft - knight.offsetWidth)+'px'; \r\n                    isReach();\r\n                }\r\n                if (result[i]) {\r\n                    step(i,newCeil,goRow,goCol);\r\n                }\r\n            }, 500)\r\n        }\r\n        \r\n        //Рисует путь коня по шахматной доске\r\n        function showKnightWalk() {\r\n            knight.style.left = \"\"; \r\n            knight.style.top = \"\"; \r\n            knight.classList.remove(\"chess__knight--hidden\");\r\n            chessCeils.forEach(function(e) {\r\n                e.classList.remove(\"chess__ceil--red\");\r\n                e.style.fontSize = \"0px\";\r\n            })  \r\n            clearTimeout(timerId);\r\n            step(1,true); \r\n        };\r\n\r\n        //создает шахматную доску и коня\r\n        function initBoard() {\r\n            var board = [];\r\n            var divBoard = document.createElement('div');\r\n            if (cntChessBoard) {\r\n                blockchess.removeChild(cntChessBoard);\r\n            }\r\n            divBoard.className = \"chess__board chess__board--knight\";\r\n\r\n            for  (var i = 1; i <= CHESS_SIZE*CHESS_SIZE; i++) {\r\n                var nextStepArr = nextSteps(i);\r\n                board.push({step:i, stepsArr:nextStepArr});\r\n                var divCeil = document.createElement('div');\r\n                var colorOfCeil = colorOfCeil===\"black\"?\"white\":\"black\";\r\n                if ((i-1)%8===0) {\r\n                    var colorOfCeil = colorOfCeil===\"black\"?\"white\":\"black\";\r\n                }\r\n                divCeil.className = \"chess__ceil chess__ceil--knight chess__ceil--\" + colorOfCeil;\r\n                divBoard.appendChild(divCeil);\r\n            };\r\n            var divKnight = document.createElement('div');\r\n            divKnight.className = \"chess__ceil chess__knight chess__knight--hidden\";\r\n            divBoard.appendChild(divKnight);\r\n            blockchess.appendChild(divBoard);\r\n            cntChessBoard = divBoard;\r\n            chessCeils = cntChessBoard.querySelectorAll('.chess__ceil');\r\n            knight = cntChessBoard.querySelector('.chess__knight');\r\n            return board;\r\n        }\r\n\r\n        //поиск возможных ходов для коня из данной клетки\r\n        function nextSteps(ceil) {\r\n            var steps = [];\r\n            var next;\r\n            \r\n            var row = Math.ceil(ceil/CHESS_SIZE);\r\n            var col = (ceil-(row-1)*CHESS_SIZE);\r\n           \r\n            //ходы \"по горизонтали\"\r\n            if ((row-1)>=1) {\r\n                //левый верхний ход\r\n                if((col-2)>=1) {\r\n                    next = (row-2)*CHESS_SIZE + (col-2);\r\n                    steps.push(next);\r\n                }\r\n                //правый верхний ход\r\n                if((col+2)<=CHESS_SIZE) {\r\n                    next = (row-2)*CHESS_SIZE + (col+2);\r\n                    steps.push(next);\r\n                }\r\n            }\r\n            if ((row+1)<=CHESS_SIZE) {\r\n                //левый нижний ход\r\n                if((col-2)>=1) {\r\n                    next = (row)*CHESS_SIZE + (col-2);\r\n                    steps.push(next);\r\n                }\r\n                //правый нижний ход\r\n                if((col+2)<=CHESS_SIZE) {\r\n                    next = (row)*CHESS_SIZE + (col+2);\r\n                    steps.push(next);\r\n                }\r\n            }\r\n            //ходы \"по вертикали\"\r\n            if ((row-2)>=1) {\r\n                //левый верхний ход\r\n                if((col-1)>=1) {\r\n                    next = (row-3)*CHESS_SIZE + (col-1);\r\n                    steps.push(next);\r\n                }\r\n                //правый верхний ход\r\n                if((col+1)<=CHESS_SIZE) {\r\n                    next = (row-3)*CHESS_SIZE + (col+1);\r\n                    steps.push(next);\r\n                }\r\n            }\r\n            if ((row+2)<=CHESS_SIZE) {\r\n                //левый нижний ход\r\n                if((col-1)>=1) {\r\n                    next = (row+1)*CHESS_SIZE + (col-1);\r\n                    steps.push(next);\r\n                }\r\n                //правый нижний ход\r\n                if((col+1)<=CHESS_SIZE) {\r\n                    next = (row+1)*CHESS_SIZE + (col+1);\r\n                    steps.push(next);\r\n                }\r\n            }\r\n            return steps.sort((a,b)=>a-b);\r\n        };\r\n\r\n        //поиск пути начиная с верхнего левого края шахматной доски\r\n        function findWay (knight,board,combination) {\r\n            var combinationCurr = combination.concat(knight);\r\n            if (combinationCurr.length===CHESS_SIZE*CHESS_SIZE) {\r\n                result = combinationCurr;\r\n                return;\r\n            }\r\n            //сортируем клетки по \"многоходовости\". Конь шагает в самую \"многоходовую\" клетку \r\n            function sf (a,b) {\r\n                var bl = (board.filter(v => v.step == b)[0].stepsArr.length);\r\n                var al = board.filter(v => v.step == a)[0].stepsArr.length;\r\n                return al - bl;\r\n            }\r\n            var nextStepsArr = board[0].stepsArr.sort(sf);\r\n            //убираем с доски текущую клетку\r\n            var boardCurr = [];\r\n            for (var i = 1; i < board.length; i++) {\r\n                var newStepsArr = board[i].stepsArr.filter(function(i) {\r\n                    return i!==knight;\r\n                });\r\n                boardCurr.push({step:board[i].step, stepsArr:newStepsArr});\r\n            }\r\n            //перебор возможных ходов с текущей клетки\r\n            for (var i = 0; i < nextStepsArr.length; i++) {\r\n                var nextStep = nextStepsArr[i];\r\n                if (result.length!==0) {\r\n                    return;\r\n                }\r\n                //сортируем таблицу по след.шагу\r\n                boardCurr = boardCurr.sort((a,b)=>{return a.step===nextStep?-1:0;});\r\n                findWay(nextStep,boardCurr,combinationCurr); \r\n            }\r\n            return;\r\n        };\r\n\r\n        var board = initBoard();\r\n        findWay(1,board,[]);\r\n        showResult(result);\r\n    }\r\n\r\n    if (btnChess) {\r\n        btnChess.addEventListener('click', (event) => {\r\n            chessKnight();\r\n        });\r\n    }\r\n\r\n})();\r\n\n\n//# sourceURL=webpack:///./js/modules/chess-knight.js?");

/***/ }),

/***/ "./js/modules/chess.js":
/*!*****************************!*\
  !*** ./js/modules/chess.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function() {\n    \n  try {\n    var blockchess = document.querySelector('.chess');\n    var btnChess = blockchess.querySelector('.chess__button');\n    var cntChessBoard = blockchess.querySelector('.chess__board');\n    var resultChess = blockchess.querySelector('.chess__result');\n    var resultChessText = resultChess.querySelector('.chess__result-text');\n    var btnComb = resultChess.querySelector('.chess__button--combination');\n    var inputComb = resultChess.querySelector('.chess__combination');\n    var chessCeils;\n} catch {\n    return;\n}\n        \nfunction chessQueens () {\n    \n    if (cntChessBoard) {\n        cntChessBoard.remove();\n        inputComb.value = \"\";    \n    }\n    \n    const CHESS_SIZE = 8;\n    var combinations = [];\n\n    //выводит количество комбинаций\n    function showResult(combinations) {\n        resultChessText.innerHTML = \"Найдено комбинаций: \" + combinations.length; \n        if (combinations.length) {\n            resultChess.classList.add(\"chess__result--show\");\n        }\n        btnComb.addEventListener(\"click\", showCombination);\n    }\n    \n    //рисует комбинацию на шахматной доске\n    function showCombination() {\n        var cmbNumber = inputComb.value;\n        if (!Number(cmbNumber)) {\n            return;\n        }\n                                \n        chessCeils.forEach(function(e) {\n            e.classList.remove(\"chess__ceil--red\");\n            e.classList.remove(\"chess__queen\");\n        })\n\n        if (combinations[cmbNumber-1]) {\n            combinations[cmbNumber-1].forEach( function(q) {\n                var ceil = chessCeils[q.ceil];\n                ceil.classList.add(\"chess__queen\");\n                ceil.addEventListener(\"click\", function(evt) { showBattlefield(evt,q) })\n            })\n        }\n    };\n\n    //рисует \"поле боя\" ферзя\n    function showBattlefield(evt,q) {\n        chessCeils.forEach(function(e) {\n            e.classList.remove(\"chess__ceil--red\");\n        })\n        evt.target.classList.add(\"chess__ceil--red\");\n        q.battlefield.forEach(function(b) {\n            chessCeils[b].classList.add(\"chess__ceil--red\");\n        })\n    }\n\n    //создает шахматную доску\n    function initBoard() {\n        var board = [];\n        var divBoard = document.createElement('div');\n        divBoard.className = \"chess__board\";\n\n        for  (var i = 0; i< CHESS_SIZE; i++) {\n            var row = [];\n            for  (var j = 0; j< CHESS_SIZE; j++) {\n                row.push(i*CHESS_SIZE+j);\n                var divCeil = document.createElement('div');\n                divCeil.className = \"chess__ceil \" + ((i%2 + j%2)===1? \"chess__ceil--black\" : \"chess__ceil--white\");\n                divBoard.appendChild(divCeil);\n            }\n            board.push(row);    \n        };\n\n        blockchess.appendChild(divBoard);\n        cntChessBoard = divBoard;\n        chessCeils = cntChessBoard.querySelectorAll('.chess__ceil');\n        return board;\n    }\n\n    //поиск \"поля боя\" для ферзя\n    function disableCeils(ceilCurr) {\n        var battlefield = [];\n        \n        var row = Math.floor(ceilCurr/CHESS_SIZE);\n        var col = (ceilCurr-row*CHESS_SIZE);\n        \n        battlefield.push(ceilCurr);\n        \n        function disableOther(ceil) {\n            if (ceil!==ceilCurr) {\n                battlefield.push(ceil);\n            }\n        }\n        \n        for (var i = 0; i < CHESS_SIZE; i++) {\n            //горизонтальный ряд\n            disableOther(row*CHESS_SIZE + i);\n            //вертикальный ряд\n            disableOther(i*CHESS_SIZE + col);\n            //диагональные ряды\n            if ((row+i)<CHESS_SIZE && (col+i)<CHESS_SIZE) {\n                disableOther((row+i)*CHESS_SIZE + col + i);\n            }\n            if ((row-i)>=0 && (col-i)>=0) {\n                disableOther((row-i)*CHESS_SIZE +col-i);\n            }\n            if ((row+i)<CHESS_SIZE && (col-i)>=0) {\n                disableOther((row+i)*CHESS_SIZE +col-i);\n            }\n            if ((row-i)>=0 && (col+i)<CHESS_SIZE) {\n                disableOther((row-i)*CHESS_SIZE +col+i);\n            }\n        }\n        return battlefield.sort((a,b)=>a-b);\n    };\n\n    //поиск возможных комбинаций\n    function findCombinations (queens,board,text,count) {\n        //перебор строки\n        var rowCurr = board[0];\n        for (var i = 0; i < rowCurr.length; i++) {\n            var ceil = rowCurr[i];\n            //массив \"поля боя\" для ферзя ceil\n            var battleField = disableCeils(ceil);\n            //удаляем с доски клетки\n            var boardCurr = [];\n            var emptyRow = false;\n            for (var j = 1; j < board.length; j++) {\n                var newRow = board[j].filter(function(i) {\n                    return !battleField.includes(i);\n                });\n                //если какая-либо из строк на доске уже пуста, значит комбинация невозможна\n                if (newRow.length === 0) {\n                    emptyRow = true;\n                };\n                boardCurr.push(newRow);\n            };\n            if (emptyRow) {\n                continue;\n            }\n            var queensCurr = queens.concat([{ceil:ceil,battlefield:battleField}]);\n            //если ферзей уже 8, то сохраняем компбинацию\n            if (queensCurr.length === CHESS_SIZE) {\n                combinations.push(queensCurr);\n                continue;\n            }\n            findCombinations(queensCurr,boardCurr,text + \"     \",count+1); \n        }\n        return;\n    };\n\n    var board = initBoard();\n    findCombinations([],board,\"\",1);\n    showResult(combinations);\n}\n\nif (btnChess) {\n    btnChess.addEventListener('click', (event) => {\n        chessQueens();\n    });\n}\n\n})();\n\n\n//# sourceURL=webpack:///./js/modules/chess.js?");

/***/ }),

/***/ "./js/modules/elevator.js":
/*!********************************!*\
  !*** ./js/modules/elevator.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (54:20)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|         };\\n|       \\n>         createHouse = function () {\\n| \\n|             var flats;\");\n\n//# sourceURL=webpack:///./js/modules/elevator.js?");

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function() {\n    var taskList = document.querySelectorAll('.task-link');\n    var modalFormList = document.querySelectorAll('.modal');\n    var closeButtonsList = document.querySelectorAll(\".modal__button-close\");\n    var closeButtonLink;\n    var modalForm;\n    var modalTaskLink;\n  \n    //закрытие модальных окон по кнопке закрытия\n    for (var i = 0; i < closeButtonsList.length; i++) {\n        closeButtonLink = closeButtonsList[i];\n        closeButtonLink.addEventListener(\"click\", closeModals);\n    }\n\n    // закрытие модальных окон по esc\n    window.addEventListener(\"keydown\", function(evt) {\n        if (evt.keyCode === 27) {\n        evt.preventDefault();\n        closeModals();\n        }\n    });\n\n    // открытие модальных окон по ссылке\n    for (var i = 0; i < taskList.length; i++) {\n        modalTaskLink = taskList[i];\n        modalTaskLink.addEventListener('click', function(evt) {\n            var taskId = evt.target.getAttribute(\"data-task\");\n            var taskModal = document.getElementById(taskId);\n            if (!taskModal) {\n                return;\n            }\n            evt.preventDefault();\n            document.body.classList.add('stop-scrolling');\n            taskModal.classList.add('modal--show');\n        });\n    }\n\n    // закрытие модальных окон по клику на modal-overlay\n    for (var i = 0; i < modalFormList.length; i++) {\n        modalForm = modalFormList[i];\n        modalForm.addEventListener('click', function(evt) {\n            if (evt.target === this) {\n                closeModalOverlay(evt);\n            }\n        });\n    }\n\n    function closeModals() {\n        for (var i = 0; i < modalFormList.length; i++) {\n        modalForm = modalFormList[i];\n        modalForm.classList.remove('modal--show');\n        document.body.classList.remove('stop-scrolling');\n        }\n    }\n\n    function closeModalOverlay(evt) {\n        evt.target.classList.remove('modal--show');\n        document.body.classList.remove('stop-scrolling');\n    }\n\n})();\n\n\n//# sourceURL=webpack:///./js/modules/modal.js?");

/***/ }),

/***/ "./js/modules/scroll.js":
/*!******************************!*\
  !*** ./js/modules/scroll.js ***!
  \******************************/
/*! exports provided: initSmoothScrolling */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initSmoothScrolling\", function() { return initSmoothScrolling; });\nconst anchorList = document.querySelectorAll('.nav__item');\n\nconst initSmoothScrolling = () => {\n  anchorList.forEach(function (anchor) {\n    anchor.addEventListener('click', function (e) {\n      e.preventDefault();\n      const blockID = e.target.getAttribute('href').substr(1);\n      window.scrollTo({\n        top: document.getElementById(blockID).offsetTop,\n        left: 0,\n        behavior: 'smooth',\n      });\n    });\n  });\n};\n\n\n\n\n//# sourceURL=webpack:///./js/modules/scroll.js?");

/***/ }),

/***/ "./js/utils/ie-footer-nailing.js":
/*!***************************************!*\
  !*** ./js/utils/ie-footer-nailing.js ***!
  \***************************************/
/*! exports provided: ieFooterNailing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ieFooterNailing\", function() { return ieFooterNailing; });\nconst main = document.querySelector('main');\nconst header = document.querySelector('.header');\nconst footer = document.querySelector('.footer');\n\nlet headerH;\nlet footerH;\nlet mainHMin;\n\nconst ieFooterNailing = () => {\n  if (!main || !(!!window.MSInputMethodContext && !!document.documentMode)) {\n    return;\n  }\n\n  const mainHeight = () => {\n    // eslint-disable-next-line no-unused-expressions\n    header ? headerH = header.getBoundingClientRect().height : headerH = 0;\n    // eslint-disable-next-line no-unused-expressions\n    footer ? footerH = footer.getBoundingClientRect().height : footerH = 0;\n    mainHMin = window.innerHeight;\n\n    main.style.minHeight = mainHMin - (headerH + footerH) + 'px';\n  };\n\n  document.addEventListener('loadDOMContentLoaded', mainHeight());\n  window.addEventListener('resize', mainHeight);\n};\n\n\n\n\n//# sourceURL=webpack:///./js/utils/ie-footer-nailing.js?");

/***/ }),

/***/ "./js/utils/polyfills.js":
/*!*******************************!*\
  !*** ./js/utils/polyfills.js ***!
  \*******************************/
/*! exports provided: polyfills */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"polyfills\", function() { return polyfills; });\n/* eslint-disable */\nconst polyfills = () => {\n  // forEach\n  if (window.NodeList && !NodeList.prototype.forEach) {\n    NodeList.prototype.forEach = function (callback, thisArg) {\n      thisArg = thisArg || window;\n      for (let i = 0; i < this.length; i++) {\n        callback.call(thisArg, this[i], i, this);\n      }\n    };\n  }\n\n  // includes\n  if (!Array.prototype.includes) {\n    Object.defineProperty(Array.prototype, 'includes', {\n      value: function(searchElement, fromIndex) {\n\n        if (this == null) {\n          throw new TypeError('\"this\" is null or not defined');\n        }\n\n        var o = Object(this);\n\n        var len = o.length >>> 0;\n\n        if (len === 0) {\n          return false;\n        }\n\n        var n = fromIndex | 0;\n\n        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);\n\n        function sameValueZero(x, y) {\n          return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));\n        }\n\n        while (k < len) {\n          if (sameValueZero(o[k], searchElement)) {\n            return true;\n          }\n          k++;\n        }\n\n        return false;\n      }\n    });\n  }\n\n  // matches\n  if (!Element.prototype.matches) {\n    Element.prototype.matches =\n      Element.prototype.matchesSelector ||\n      Element.prototype.mozMatchesSelector ||\n      Element.prototype.msMatchesSelector ||\n      Element.prototype.oMatchesSelector ||\n      Element.prototype.webkitMatchesSelector ||\n      function (s) {\n        let matches = (this.document || this.ownerDocument).querySelectorAll(s);\n        let i = matches.length;\n        // eslint-disable-next-line no-empty\n        while (--i >= 0 && matches.item(i) !== this) {}\n        return i > -1;\n      };\n  }\n\n  // closest\n  if (!Element.prototype.matches) {\n    Element.prototype.matches =\n      Element.prototype.msMatchesSelector ||\n      Element.prototype.webkitMatchesSelector;\n  }\n\n  if (!Element.prototype.closest) {\n    Element.prototype.closest = function (s) {\n      let el = this;\n\n      do {\n        if (el.matches(s)) {\n          return el;\n        }\n        el = el.parentElement || el.parentNode;\n      } while (el !== null && el.nodeType === 1);\n      return null;\n    };\n  }\n\n  // prepend\n  (function (arr) {\n    arr.forEach(function (item) {\n      if (item.hasOwnProperty(`prepend`)) {\n        return;\n      }\n      Object.defineProperty(item, `prepend`, {\n        configurable: true,\n        enumerable: true,\n        writable: true,\n        value: function prepend() {\n          // eslint-disable-next-line prefer-rest-params\n          let argArr = Array.prototype.slice.call(arguments);\n          let docFrag = document.createDocumentFragment();\n\n          argArr.forEach(function (argItem) {\n            let isNode = argItem instanceof Node;\n            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));\n          });\n\n          this.insertBefore(docFrag, this.firstChild);\n        },\n      });\n    });\n  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);\n\n  // append\n  (function (arr) {\n    arr.forEach(function (item) {\n      if (item.hasOwnProperty(`append`)) {\n        return;\n      }\n      Object.defineProperty(item, `append`, {\n        configurable: true,\n        enumerable: true,\n        writable: true,\n        value: function append() {\n          // eslint-disable-next-line prefer-rest-params\n          let argArr = Array.prototype.slice.call(arguments);\n          let docFrag = document.createDocumentFragment();\n\n          argArr.forEach(function (argItem) {\n            let isNode = argItem instanceof Node;\n            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));\n          });\n\n          this.appendChild(docFrag);\n        },\n      });\n    });\n  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);\n\n  // before\n  (function (arr) {\n    arr.forEach(function (item) {\n      if (item.hasOwnProperty(`before`)) {\n        return;\n      }\n      Object.defineProperty(item, `before`, {\n        configurable: true,\n        enumerable: true,\n        writable: true,\n        value: function before() {\n          // eslint-disable-next-line prefer-rest-params\n          let argArr = Array.prototype.slice.call(arguments);\n          let docFrag = document.createDocumentFragment();\n\n          argArr.forEach(function (argItem) {\n            let isNode = argItem instanceof Node;\n            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));\n          });\n\n          this.parentNode.insertBefore(docFrag, this);\n        },\n      });\n    });\n  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);\n\n  // remove\n  (function (arr) {\n    arr.forEach(function (item) {\n      if (item.hasOwnProperty(`remove`)) {\n        return;\n      }\n      Object.defineProperty(item, `remove`, {\n        configurable: true,\n        enumerable: true,\n        writable: true,\n        value: function remove() {\n          if (this.parentNode !== null) {\n            this.parentNode.removeChild(this);\n          }\n        },\n      });\n    });\n  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);\n\n  // startsWith\n  if (!String.prototype.startsWith) {\n    // eslint-disable-next-line no-extend-native\n    Object.defineProperty(String.prototype, `startsWith`, {\n      value(search, rawPos) {\n        let pos = rawPos > 0 ? rawPos | 0 : 0;\n        return this.substring(pos, pos + search.length) === search;\n      },\n    });\n  }\n\n  // ie download\n  const ie11Download = (el) => {\n    if (el.href === ``) {\n      throw Error(`The element has no href value.`);\n    }\n\n    let filename = el.getAttribute(`download`);\n    if (filename === null || filename === ``) {\n      const tmp = el.href.split(`/`);\n      filename = tmp[tmp.length - 1];\n    }\n\n    el.addEventListener(`click`, (evt) => {\n      evt.preventDefault();\n      const xhr = new XMLHttpRequest();\n      xhr.onloadstart = () => {\n        xhr.responseType = `blob`;\n      };\n      xhr.onload = () => {\n        navigator.msSaveOrOpenBlob(xhr.response, filename);\n      };\n      xhr.open(`GET`, el.href, true);\n      xhr.send();\n    });\n  };\n\n  if (window.navigator.msSaveBlob) {\n    const downloadLinks = document.querySelectorAll(`a[download]`);\n    if (downloadLinks.length) {\n      downloadLinks.forEach((el) => {\n        ie11Download(el);\n      });\n    }\n  }\n};\n\n\n\n\n//# sourceURL=webpack:///./js/utils/polyfills.js?");

/***/ })

/******/ });