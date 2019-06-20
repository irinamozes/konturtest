
var utils = require('./utils');

// Элемент для вывода на экран сообщения сервера
var serverResponseCreateElement = document.createElement('h3');

module.exports = {

  // Функция, вызываемая при отправке формы.
  runOrder: function(serverSendingElementsObj, checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, buttonSubmitEnable, funcsObj) {
    // Объект для данных формы, если выбрана доставка по городу
    var jsonDeliv = {};

    // Объект для  данных  формы, если выбран самовывоз
    var jsonPickup = {};

    // Переменная для данных, отправляемых на сервер в формате json
    var jsonOrder;

    var containerSubmitElement = buttonSubmitElement.parentNode;

    if (tooltipSelectObj.selectMenu.pic === 0) {
      buttonSubmitElement.disabled = true;

      buttonSubmitElement.blur();

      var timeFrom = 'time-from';

      var timeTo = 'time-to';

      var creditCard = 'credit-card';

      jsonDeliv.address = serverSendingElementsObj.addressElement.value;
      jsonDeliv.phone = serverSendingElementsObj.phoneElement.value;
      jsonDeliv.date = serverSendingElementsObj.dateElement.value;
      jsonDeliv[timeFrom] = serverSendingElementsObj.timeFromInputElement.value;
      jsonDeliv[timeTo] = serverSendingElementsObj.timeToInputElement.value;
      jsonDeliv.pick = 0;

      if (tooltipSelectObj.selectMenu.payCard === 1) {
        jsonDeliv[creditCard] = serverSendingElementsObj.cardHiddenElement.value;
      }

      jsonOrder = JSON.stringify(jsonDeliv);

      serverSendingElementsObj.formElement.reset();

      serverSendingElementsObj.sliderHandleElement.style.left = '0' + 'px';

      serverSendingElementsObj.methodDelivElement.setAttribute('checked', 'true');
    } else {
      buttonSubmitElement.disabled = true;

      buttonSubmitElement.blur();

      jsonPickup.phone = serverSendingElementsObj.phoneElement.value;

      jsonPickup.addressPic = checkedMenuElementsObj.addressPickup;

      jsonPickup.pick = 1;

      jsonOrder = JSON.stringify(jsonPickup);

      serverSendingElementsObj.phoneElement.value = '';

      serverSendingElementsObj.methodPickupElement.setAttribute('checked', 'true');
    }

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
      var serverResMes;

      if (xhr.status === 200) {
        serverResMes = 'Заявка принята!';

        utils.displayMes(containerSubmitElement, serverResponseCreateElement, serverResMes, 'green', 'none');
      } else {
        serverResMes = xhr.responseText;

        utils.displayMes(containerSubmitElement, serverResponseCreateElement, serverResMes, 'red', 'none');
      }

      // var timeout;

      // Переменная для количества секунд, в течении которого будет виден ответ сервера
      var timeSeconds;

      if (xhr.status === 200) {
        timeSeconds = 1000;
      } else {
        timeSeconds = 5000;
      }

      setTimeout(function() {
        serverSendingElementsObj.formElement.reset();

        // serverResponseCreateElement.textContent = '';

        var parentRespElement = serverResponseCreateElement.parentNode;
        parentRespElement.removeChild(serverResponseCreateElement);

        serverSendingElementsObj.legendElement.scrollIntoView(true);

        if (tooltipSelectObj.selectMenu.pic === 0) {
          tooltipSelectObj.tooltipInput.iaddr = 0;
          tooltipSelectObj.tooltipInput.itel = 0;
          tooltipSelectObj.tooltipInput.icar = 0;

          tooltipSelectObj.validBlur.vaddr = 0;
          tooltipSelectObj.validBlur.vtel = 0;
          tooltipSelectObj.validBlur.vcar = 0;

          checkedMenuElementsObj.menuCheckElement = serverSendingElementsObj.methodDelivElement;

          funcsObj.delivery(checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, buttonSubmitEnable, funcsObj);

          serverSendingElementsObj.telTooltipElement.classList.remove('invisible');

          serverSendingElementsObj.carTooltipElement.classList.remove('invisible');

          serverSendingElementsObj.addressTooltipElement.classList.remove('invisible');

          serverSendingElementsObj.addressElement.focus();
        } else {
          tooltipSelectObj.tooltipInput.iaddr = 0;
          tooltipSelectObj.tooltipInput.itel = 0;
          tooltipSelectObj.tooltipInput.icar = 0;

          tooltipSelectObj.validBlur.vaddr = 0;
          tooltipSelectObj.validBlur.vtel = 0;
          tooltipSelectObj.validBlur.vcar = 0;

          checkedMenuElementsObj.menuCheckElement = serverSendingElementsObj.methodPickupElement;

          funcsObj.pickup(checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, buttonSubmitEnable);

          serverSendingElementsObj.telTooltipElement.classList.remove('invisible');

          checkedMenuElementsObj.menuCheckElement = serverSendingElementsObj.checkedPicAddrElement;
          funcsObj.addrpickup(checkedMenuElementsObj);
        }
      }, timeSeconds);
    };

    xhr.open('POST', '/', true);

    xhr.send(jsonOrder);
  }

};
