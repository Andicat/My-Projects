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
