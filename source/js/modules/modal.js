'use strict';

// поток событий с информацией о закрытии мадальных окон
//var modalEvents = new EventEmitter();

(function() {
    var taskList = document.querySelectorAll('.task-link');
    var modalFormList = document.querySelectorAll('.modal');
    var closeButtonsList = document.querySelectorAll('.modal__button-close');
    var closeButtonLink;
    var modalForm;
    var modalTaskLink;

    /*var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.attributeName == 'class'){
                if (mutation.target.classList.contains('modal--show')) {
                    console.log(mutation.target.getAttribute('id') + ' OPEN!');
                    return;
                }
                console.log(mutation.target.getAttribute('id') + ' CLOSE!');
            }
        });
    });*/
    
    //modalFormList.forEach( modal =>  observer.observe(modal, {attributes: true}));
    
    //закрытие модальных окон по кнопке закрытия
    for (var i = 0; i < closeButtonsList.length; i++) {
        closeButtonLink = closeButtonsList[i];
        closeButtonLink.addEventListener('click', closeModals);
    }

    // закрытие модальных окон по esc
    window.addEventListener('keydown', function(evt) {
        if (evt.keyCode === 27) {
            evt.preventDefault();
            closeModals();
        }
    });

    // открытие модальных окон по ссылке
    for (var i = 0; i < taskList.length; i++) {
        modalTaskLink = taskList[i];
        modalTaskLink.addEventListener('click', function(evt) {
            var taskId = evt.target.getAttribute('data-task');
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
        //modalEvents.emit('close');
        for (var i = 0; i < modalFormList.length; i++) {
            modalForm = modalFormList[i];
            if (modalForm.classList.contains('modal--show')) {
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
