
// Функция, проверяющая валидность введенного адреса или телефона. Скрывает, или показывает сообщение об ошибке. Вызывает функцию, блокирующую, или разблокирующую кнопку "Заказать".

module.exports = {

  validationAddrTel: function(elementInputObj, elErrorCreateElement, elTooltipElement, selectMenuObj, validObj, buttonSubmitElement, buttonSubmitEnable) {
    var valid = /(\w+)+|([А-Яа-я0-9]+)+/.test(elementInputObj.elem.value);

    var validNot = /[\\/'"@<>;:&%!?]/.test(elementInputObj.elem.value);

    if (valid && !validNot) {
      delete validObj['v' + elementInputObj.name];

      elErrorCreateElement.classList.add('invisible');

      elTooltipElement.classList.add('invisible');

      buttonSubmitEnable(selectMenuObj, validObj, buttonSubmitElement);
    }

    if (elementInputObj.elem.value.trim().length < 1) {
      validObj['v' + elementInputObj.name] = 0;

      buttonSubmitElement.disabled = true;

      elTooltipElement.classList.remove('invisible');

      elErrorCreateElement.classList.add('invisible');
    }

    if ((!valid && !validNot) && elementInputObj.elem.value.trim().length >= 1) {
      validObj['v' + elementInputObj.name] = 0;

      buttonSubmitElement.disabled = true;

      elTooltipElement.classList.remove('invisible');
    }

    if (validNot && elementInputObj.elem.value.trim().length >= 1) {
      validObj['v' + elementInputObj.name] = 0;

      buttonSubmitElement.disabled = true;

      elTooltipElement.classList.add('invisible');

      elErrorCreateElement.classList.remove('invisible');
    }
  }

};
