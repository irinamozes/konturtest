'use strict';

var utils = require('./utils');


var cardMod10; //переменная для результата проверки по алгоритму Луна.

//var cardHiddenElement = document.querySelector('input[name = "credit-card"]');

//var cardNumberElement = document.querySelector('.card');
var cardInputElement = document.querySelectorAll('.card-section');
var cardInputArr = Array.prototype.slice.call(cardInputElement, 0);

//Создание элемента, который будет показывать подсказку для ввода номера карты
//var carTooltipElement = document.createElement('div');

//var carTooltipMes = 'В номере карты должно быть 16 знаков';

//utils.displayMes(cardInputArr[3], carTooltipElement, carTooltipMes, 'red', 'right', 'tooltip');


//var card1Element = document.querySelector('#card-1');

//Создание элемента, который будет содержать сообщение об ошибке ввода номера карты
//var carErrorCreateElement = document.createElement('div');

//var carErrorMes = 'Ошибка: в номере карты должны быть только цифры, либо введены неправильные цифры.';

//utils.displayMes(card1Element, carErrorCreateElement, carErrorMes, 'red', 'none', 'invisible');

//var tooltipSelectObj = {inputFieldsArr, tooltipInput, selectMenu, validBlur, tooltipSubmitElement};


module.exports = {

 //Обработчик события ввода номера карты
  cardPay: function(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, carValidOnBlurFunc, carValidFunc, utils.pageViewInputTooltip) {
    
    const car = tooltipSelectObj.inputFieldsArr[1];

    formInputTooltipsFunc(car, carErrorCreateElement, tooltipSelectObj, buttonSubmitElement,  utils.pageViewInputTooltip);

    if (inputCheckElement.value.length === 4 && inputCheckElement.getAttribute('id') !== 'card-4') {
      var indexCard = cardInputArr.indexOf(inputCheckElement);
      cardInputArr[indexCard + 1].focus();
    }
     
    carValidOnBlurFunc(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, carValidFunc, utils.pageViewInputTooltip);

  };


  //Обработчик события удаления символа в номере карты с помощью backspace
  cardBackspace: function(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, carValidOnBlurFunc, carValidFunc, utils.pageViewInputTooltip) {

    const car = tooltipSelectObj.inputFieldsArr[1];

    tooltipSelectObj.validBlur.vcar = 0;
    
    buttonSubmitElement.disabled = true;


    if (inputCheckElement === car.elem) {

    formInputTooltipsFunc(car, carErrorCreateElement, tooltipSelectObj, buttonSubmitElement,  utils.pageViewInputTooltip);

    }
 
    if (inputCheckElement.value.length === 0 && inputCheckElement.getAttribute('id') !== 'card-1') {
      var indexCard = cardInputArr.indexOf(inputCheckElement);
      cardInputArr[indexCard - 1].focus();
    }

     carValidOnBlurFunc(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, carValidFunc, utils.pageViewInputTooltip);

  };



//Функция, вызывающая функцию проверки валидности номера карты.
  this.carValidOnBlur = function(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, carValidFunc, utils.pageViewInputTooltip) {

    var cardBlurArr = Array.prototype.slice.call(cardInputElement, 0);

    cardHiddenElement.value = cardBlurArr[0].value + cardBlurArr[1].value + cardBlurArr[2].value + cardBlurArr[3].value;

    if (cardHiddenElement.value.trim().length !== 16)  {

      carTooltipElement.classList.remove('invisible');
      tooltipSelectObj.validBlur.vcar = 0; 

      buttonSubmitElement.disabled = true;
 
      return;

    } else {


      carTooltipElement.classList.add('invisible');
      carValidFunc(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, utils.pageViewInputTooltip);

    }

  };



//Функция, проверяющая валидность введенного номера карты с использованием алгоритма Луна. Скрывает, или показывает сообщение об ошибке. ВЫзывает функцию, блокирующую, или разблокирующую кнопку "Заказать".
  this.carValid = function(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, utils.pageViewInputTooltip) { 

    var cardHiddenValid = cardHiddenElement.value.search(/[^0-9]/);

    if (cardHiddenValid !== -1)  {

      tooltipSelectObj.validBlur.vcar = 0;
 
      carErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;
      return
    }

    cardMod10 = utils.cardLuhnValid(cardHiddenElement); 

    if (cardMod10 === 0) {

      delete tooltipSelectObj.validBlur.vcar;

      carErrorCreateElement.classList.add('invisible');

      var slectMenu = tooltipSelectObj.selectMnu;

      var validblur = tooltipSelectObj.validBlur;
      
      buttonSubmitEnable(selectMenu, validBlur, buttonSubmitElement);

    } else {
     
      validBlur.vcar = 0;
      carErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;

    } 

  };




