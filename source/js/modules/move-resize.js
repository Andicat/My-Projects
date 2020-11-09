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
        evt.preventDefault();
        setAction(evt.target.getAttribute("data-action"));
        if (action) {
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
