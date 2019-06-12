
var utils = require('./utils');

var cardMod10; // переменная для результата проверки по алгоритму Луна.

var cardInputElement = document.querySelectorAll('.card-section');
var cardInputArr = Array.prototype.slice.call(cardInputElement, 0);

module.exports = {

  // Обработчик события ввода номера карты
  cardPay: function(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, carValidOnBlurFunc, carValidFunc) {
    const car = tooltipSelectObj.inputFieldsArr[1];

    formInputTooltipsFunc(car, carErrorCreateElement, tooltipSelectObj, buttonSubmitElement, utils.pageViewInputTooltip);

    if (inputCheckElement.value.length === 4 && inputCheckElement.getAttribute('id') !== 'card-4') {
      var indexCard = cardInputArr.indexOf(inputCheckElement);
      cardInputArr[indexCard + 1].focus();
    }

    carValidOnBlurFunc(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, carValidFunc);
  },

  // Обработчик события удаления символа в номере карты с помощью backspace
  cardBackspace: function(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, carValidOnBlurFunc, carValidFunc
  ) {
    const car = tooltipSelectObj.inputFieldsArr[1];

    tooltipSelectObj.validBlur.vcar = 0;

    buttonSubmitElement.disabled = true;

    if (inputCheckElement === car.elem) {
      formInputTooltipsFunc(car, carErrorCreateElement, tooltipSelectObj, buttonSubmitElement, utils.pageViewInputTooltip);
    }

    if (inputCheckElement.value.length === 0 && inputCheckElement.getAttribute('id') !== 'card-1') {
      var indexCard = cardInputArr.indexOf(inputCheckElement);
      cardInputArr[indexCard - 1].focus();
    }

    carValidOnBlurFunc(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, carValidFunc);
  },

  // Функция, вызывающая функцию проверки валидности номера карты.
  carValidOnBlur: function(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable, carValidFunc) {
    var cardBlurArr = Array.prototype.slice.call(cardInputElement, 0);

    cardHiddenElement.value = cardBlurArr[0].value + cardBlurArr[1].value + cardBlurArr[2].value + cardBlurArr[3].value;

    if (cardHiddenElement.value.trim().length !== 16) {
      carTooltipElement.classList.remove('invisible');
      tooltipSelectObj.validBlur.vcar = 0;

      buttonSubmitElement.disabled = true;
    } else {
      carTooltipElement.classList.add('invisible');
      carValidFunc(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable);
    }
  },

  // Функция, проверяющая валидность введенного номера карты с использованием алгоритма Луна. Скрывает, или показывает сообщение об ошибке. ВЫзывает функцию, блокирующую, или разблокирующую кнопку "Заказать".
  carValid: function(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, formInputTooltipsFunc, buttonSubmitEnable) {
    var cardHiddenValid = cardHiddenElement.value.search(/[^0-9]/);

    if (cardHiddenValid !== -1) {
      tooltipSelectObj.validBlur.vcar = 0;

      carErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;
      return;
    }

    cardMod10 = utils.cardLuhnValid(cardHiddenElement);

    if (cardMod10 === 0) {
      delete tooltipSelectObj.validBlur.vcar;

      carErrorCreateElement.classList.add('invisible');

      buttonSubmitEnable(tooltipSelectObj.selectMenu, tooltipSelectObj.validBlur, buttonSubmitElement);
    } else {
      tooltipSelectObj.validBlur.vcar = 0;
      carErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;
    }
  }

};
