'use strict';
  
var btnAnketa = document.querySelector('.taskAnketa');

function getString (question) {
  var str = "";
  while (!isNaN(Number(str))) {
    str = prompt(question);
  };
  return str;
}

function getNumber (question) {
  var nbr = 0;
  while (isNaN(Number(nbr))) {
    nbr = prompt(question);
  };
  return nbr;
}
  
btnAnketa.addEventListener('click', (event) => {
  //var lastName = getString("Введите вашу фамилию");
  //var name = getString("Введите ваше имя");
  //var patrName = getString("Введите ваше отчество");
  var age = getNumber("Введите ваш возраст");
  //var sex = confirm("Выберите ваш пол: \n - Нажмите \"Ок\", если вы мужчина \n - Нажмите \"Отмена\", если вы женщина!") ? "мужчина" : "женщина";
    
  //console.log(lastName + " " + name + " " + patrName + sex );
  console.log(sex );
});