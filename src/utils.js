
module.exports = {

  // Функция, создающая элемент для показа сообщения об ошибке ввода, подсказки, ответа сервера и др.
  displayMes: function(currentFormElement, createMesElement, errorTooltipMes, colorMes, floatMes, clName) {
    var parentElement = currentFormElement.parentNode;

    parentElement.insertBefore(createMesElement, currentFormElement);

    createMesElement.style.color = colorMes;

    createMesElement.style.float = floatMes;

    createMesElement.classList.add(clName);

    createMesElement.textContent = errorTooltipMes;
  },

  // Функция, вычисляющая дату завтрашнего дня для даты доставки по умолчанию
  calcDateDefault: function() {
    var valueDateDefault;

    var today = new Date();
    var dayFromToday = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    var date = dayFromToday.getDate();
    if (date < 10) {
      date = '0' + date;
    }

    var month = dayFromToday.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }

    var year = dayFromToday.getFullYear();
    valueDateDefault = date + '/' + month + '/' + year;

    return valueDateDefault;
  },

  // Функция для нахождения элемента Input по соответствующему ему элементу Label
  findInputElement: function(labelElement) {
    var inputId = labelElement.htmlFor;
    var inputSelector = '#' + inputId;
    var inputElement = document.querySelector(inputSelector);

    return inputElement;
  },

  // Функция для нахождения элемента Label по соответствующему ему элементу Input
  findLabelElement: function(inputElement) {
    var inputElementId = inputElement.id;

    var labelSelector = 'label[for = ' + inputElementId + ']';

    var labelElement = document.querySelector(labelSelector);

    return labelElement;
  },

  // Функция для установки стиля на выбранный с помощью клавиши Enter элемент Label  и снятия стиля с предыдущего выбранного элемента Label
  setStyleLabelElement: function(checkedElement, currentCheckedElement) {
    if (currentCheckedElement) {
      var labelCurrentElement = this.findLabelElement(currentCheckedElement);
      labelCurrentElement.setAttribute('style', 'box-shadow: none;');

      var labelCheckElement = this.findLabelElement(checkedElement);
      labelCheckElement.setAttribute('style', 'box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5) inset;');
    }
  },

  // Функция алгоритма Луна проверки валидности номера карты.
  cardLuhnValid: function(cardHiddenElement) {
    var cardMod10;

    var nCheck = 0; var nDigit = 0; var bEven = false;

    for (var n = cardHiddenElement.value.length - 1; n >= 0; n--) {
      var cDigit = cardHiddenElement.value.charAt(n);

      nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) {
          nDigit -= 9;
        }
      }

      nCheck += nDigit;

      bEven = !bEven;
    }

    cardMod10 = nCheck % 10;

    return cardMod10;
  },

  // Функция, восстанавливающая вид подсказки для каждого поля формы при выборе различных пунктов меню.

  pageViewInputTooltip: function(elementInputObj, tooltipSelectObj, buttonSubmitElement = undefined) {
    if (tooltipSelectObj.tooltipInput['i' + elementInputObj.name] === undefined) {
      tooltipSelectObj.tooltipSubmitElement.childNodes[elementInputObj.numberChildLabel].classList.add('invisible');

      tooltipSelectObj.tooltipSubmitElement.childNodes[elementInputObj.numberChildText].data = '';

      if (buttonSubmitElement !== undefined) {
        buttonSubmitElement.disabled = true;
        tooltipSelectObj.tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
      } else {
        tooltipSelectObj.tooltipSubmitElement.childNodes[elementInputObj.numberChildText].data = '';
        tooltipSelectObj.tooltipSubmitElement.childNodes[0].data = '';
      }
    } else {
      tooltipSelectObj.tooltipSubmitElement.childNodes[elementInputObj.numberChildLabel].classList.remove('invisible');

      tooltipSelectObj.tooltipSubmitElement.childNodes[elementInputObj.numberChildText].data = elementInputObj.textValue;

      tooltipSelectObj.tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
      tooltipSelectObj.validBlur['v' + elementInputObj.name] = 0;

      if (buttonSubmitElement === undefined) {
        tooltipSelectObj.tooltipSubmitElement.childNodes[elementInputObj.numberChildText].data = '';
        tooltipSelectObj.validBlur['v' + elementInputObj.name] = 0;
      }
    }
  },

  // Функция, восстанавливающая вид подсказок при выборе различных пунктов меню.

  pageViewInputTooltips: function(tooltipSelectObj, buttonSubmitElement, viewTooltipFunc) {
    const addr = tooltipSelectObj.inputFieldsArr[0];
    const car = tooltipSelectObj.inputFieldsArr[1];
    const tel = tooltipSelectObj.inputFieldsArr[2];

    if (tooltipSelectObj.selectMenu.pic === 1) {
      viewTooltipFunc(tel, tooltipSelectObj);
    } else { // pic === 0
      if (tooltipSelectObj.selectMenu.payCard === 1) {
        if ((tooltipSelectObj.tooltipInput.iaddr === undefined) && (tooltipSelectObj.tooltipInput.icar === undefined) && (tooltipSelectObj.tooltipInput.itel === undefined)) {
          tooltipSelectObj.tooltipSubmitElement.childNodes[0].data = '';
          tooltipSelectObj.tooltipSubmitElement.childNodes[2].classList.add('invisible');
          tooltipSelectObj.tooltipSubmitElement.childNodes[3].data = '';
          tooltipSelectObj.tooltipSubmitElement.childNodes[4].classList.add('invisible');
          tooltipSelectObj.tooltipSubmitElement.childNodes[5].data = '';
          tooltipSelectObj.tooltipSubmitElement.childNodes[6].classList.add('invisible');
        } else {
          tooltipSelectObj.tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
          buttonSubmitElement.disabled = true;

          viewTooltipFunc(tel, tooltipSelectObj, buttonSubmitElement);

          viewTooltipFunc(car, tooltipSelectObj, buttonSubmitElement);

          viewTooltipFunc(addr, tooltipSelectObj, buttonSubmitElement);
        }
      } else { // payCard === 0
        if ((tooltipSelectObj.tooltipInput.iaddr === undefined) && (tooltipSelectObj.tooltipInput.itel === undefined)) {
          tooltipSelectObj.tooltipSubmitElement.childNodes[0].data = '';
          tooltipSelectObj.tooltipSubmitElement.childNodes[2].classList.add('invisible');
          tooltipSelectObj.tooltipSubmitElement.childNodes[3].data = '';
          tooltipSelectObj.tooltipSubmitElement.childNodes[4].classList.add('invisible');
          tooltipSelectObj.tooltipSubmitElement.childNodes[5].data = '';
          tooltipSelectObj.tooltipSubmitElement.childNodes[6].classList.add('invisible');
        } else {
          tooltipSelectObj.tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
          buttonSubmitElement.disabled = true;

          viewTooltipFunc(tel, tooltipSelectObj, buttonSubmitElement);

          viewTooltipFunc(addr, tooltipSelectObj, buttonSubmitElement);
        }
      } // payCard === 1
    }
  },

  // Функция определения кооржинат для ползуна слайдера
  getCoords: function(el) { // кроме IE8-
    var box = el.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

};
