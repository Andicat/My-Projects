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
