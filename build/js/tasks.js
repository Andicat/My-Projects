'use strict';
  
var btnAnketa = document.querySelector('.taskAnketa');

function  getString (question) {
  var str = "";
  while (!isNaN(Number(str))) {
    str = prompt(question);
  };
  return str;
}
  
btnAnketa.addEventListener('click', (event) => {
  var lastName = getString("Введите вашу фамилию");
  var name = getString("Введите ваше имя");
  var patrName = getString("Введите ваше отчество");
  var age = getNumber("Введите ваш возраст");
    
  console.log(lastName + " " + name + " " + patrName );
});