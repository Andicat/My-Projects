'use strict';
  
var btnAnketa = document.querySelector('.taskAnketa');

function getName (question) {
  var str = "";
  while (!isNaN(Number(str))) {
    str = prompt(question);
  };
  return str;
}

function getAge (question) {
  var age = 0;
  while (!age || age<=0 || age>125) {
    age = Number(prompt(question));
  };
  return parseInt(age);
}

function isOnRest (age, sex) {
  var ageForRest = (sex==="мужской") ? 65 : 60;
  return (age>=ageForRest ? "да" : "нет");
}
  
btnAnketa.addEventListener('click', (event) => {
  var lastName = getName("Введите вашу фамилию");
  var firstName = getName("Введите ваше имя");
  var patrName = getName("Введите ваше отчество");
  var age = getAge("Введите ваш возраст");
  var sex = confirm("Выберите ваш пол: \n - Нажмите \"Ок\", если вы мужчина \n - Нажмите \"Отмена\", если вы женщина!") ? "мужчина" : "женщина";
  var result = "ваше ФИО: " + lastName + " " + firstName + " " + patrName + "\n"
             + "ваш возраст в годах: " + age + "\n"
             + "ваш возраст в днях: " + (age*365) + "\n"
             + "через 5 лет вам будет: " + (age+5) + "\n"
             + "ваш пол: " + sex + "\n"
             + "вы на пенсии: " + isOnRest(age, sex);
  alert(result);
});
