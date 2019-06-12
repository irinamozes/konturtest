
module.exports = {

  // Функция, проверяющая валидность введенной даты доставки, в том числе при первоначальной загрузке страницы. Скрывает, или показывает сообщение об ошибке. ВЫзывает функцию, блокирующую, или разблокирующую кнопку "Заказать".
  datValidOnBlur: function(dateElement, datErrorCreateElement, tooltipSelectObj, buttonSubmitElement, buttonSubmitEnable) {
    if (dateElement.value.trim() === '') {
      tooltipSelectObj.validBlur.vdat = 0;
      return;
    }

    var today = new Date();

    var dateInputObject = new Date();

    var ddInput = dateElement.value.substring(0, 2);

    ddInput = parseInt(ddInput, 10);

    var mmInput = dateElement.value.substring(3, 5);

    mmInput = parseInt(mmInput, 10) - 1;

    var yearInput = dateElement.value.substring(6);

    yearInput = parseInt(yearInput, 10);

    dateInputObject.setDate(ddInput);
    dateInputObject.setMonth(mmInput);
    dateInputObject.setFullYear(yearInput);

    var valid = /^(\d{2}\/\d{2}\/\d{4})$/.test(dateElement.value);

    if (!valid) {
      datErrorCreateElement.classList.remove('invisible'); // Устанавливаем сообщение об ошибке

      buttonSubmitElement.disabled = true;
      return;
    }

    if (ddInput === 0 || ddInput > 31 || mmInput === -1 || mmInput > 11 || yearInput === 0) {
      datErrorCreateElement.classList.remove('invisible'); // Устанавливаем сообщение об ошибке

      buttonSubmitElement.disabled = true;

      return;
    }

    if (dateInputObject.getTime() >= today.getTime() + 24 * 60 * 60 * 1000 && dateInputObject.getTime() < today.getTime() + 8 * 24 * 60 * 60 * 1000) {
      delete tooltipSelectObj.validBlur.vdat;

      datErrorCreateElement.classList.add('invisible');

      buttonSubmitEnable(tooltipSelectObj.selectMenu, tooltipSelectObj.validBlur, buttonSubmitElement);
    } else {
      tooltipSelectObj.validBlur.vdat = 0;

      datErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;
    }
  }

};
