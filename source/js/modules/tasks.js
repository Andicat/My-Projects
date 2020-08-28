const initTasks = () => {
  
  const task1Button = document.querySelector('.task1');
  const task2Button = document.querySelector('.task2');
  const task3Button = document.querySelector('.task3');
  const task4Button = document.querySelector('.task4');

  task1Button.addEventListener('click', (event) => {
    var letters = ['A','B','C','D','E','F'];
    for(let i = 0; i < letters.length; i++) {
      setTimeout(function() {
        console.log(letters[i]);
      }, (1000*(i+1)));
    }
  });

  task2Button.addEventListener('click', (event) => {
    function PoemButton(buttonCaption , alertText) {
      this.buttonCaption = buttonCaption;
      this.alertText  = alertText;
    }
  
    PoemButton.prototype.createButton = function() {
      var btn = document.createElement("button");
      btn.appendChild(document.createTextNode(this.buttonCaption));
      btn.setAttribute("alertText",this.alertText);
      btn.onclick = function () {
        var test = this.getAttribute("alertText");
        alert(test);
      };
      var sel = document.querySelector('.task2__container');
      sel.appendChild(btn);
    };

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var btnArray = xhr.response;
      btnArray.forEach(function (b) {
        var btnn = new PoemButton(b.buttonCaption, b.alertText);
        btnn.createButton();
      });
    });
    xhr.open('GET', 'https://fe.it-academy.by/Examples/test_JSE.json');
    xhr.send();
  });

  task3Button.addEventListener('click', (event) => {
    class PoemButton {
      constructor(buttonCaption , alertText) {
        this.buttonCaption = buttonCaption;
        this.alertText  = alertText;
      }

      createButton () {
        var btn = document.createElement("button");
        btn.appendChild(document.createTextNode(this.buttonCaption));
        btn.setAttribute("alertText",this.alertText);
        btn.onclick = function () {
          var test = this.getAttribute("alertText");
          alert(test);
        };
        var sel = document.querySelector('.task3__container');
        sel.appendChild(btn);
      }
    }

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var btnArray = xhr.response;
      btnArray.forEach(function (b) {
        var btnn = new PoemButton(b.buttonCaption, b.alertText);
        btnn.createButton();
      });
    });
    xhr.open('GET', 'https://fe.it-academy.by/Examples/test_JSE.json');
    xhr.send();
  });

  task4Button.addEventListener('click', (event) => {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'txt';
    xhr.addEventListener('load', function () {
      var text = xhr.response;
      //const myRe = /('.+')|([""].+[""])/g;
      const myRe = /("[0-9ёa-zA-zА-Яа-я !"']+"(?=[ ,.]))|('[a-zA-zА-Яа-я !"']+'(?=[ ,.!]))/g;
      const myArray = text.match(myRe);
      myArray.forEach(function (b) {
        console.log(b);
        
      });
    });
    xhr.open('GET', 'https://fe.it-academy.by/Examples/test_JSE.txt');
    xhr.send();
  });


};



export {initTasks};
