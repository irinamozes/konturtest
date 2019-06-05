'use strict';

module.exports = {

  //Функция, создающая элемент для показа сообщения об ошибке ввода, ответа сервера и др.
  displayMes: function(currentFormElement, createMesElement, errorTooltipMes, colorMes, floatMes, clName) {

    var parentElement = currentFormElement.parentNode;
    //console.log(parentElement);

    parentElement.insertBefore(createMesElement, currentFormElement);

 //   if (createMesElement !== datTooltipTemplateElement) {

    createMesElement.style.color = colorMes;

//    } else {

//    createMesElement.setAttribute('style', 'float: right;');

    createMesElement.style.float = floatMes;

//    }

    createMesElement.classList.add(clName);

    createMesElement.textContent = errorTooltipMes;

    //return createMesElement;

  },


//Переменная, для даты доставки по умолчанию
//  var valueDateDefault;

//Функция, вычисляющая дату завтрашнего дня для даты доставки по умолчанию
  calcDateDefault: function () {

    var valueDateDefault;

    var today = new Date();
    var dayFromToday = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    var date = dayFromToday.getDate();
    if (date < 10 ) {
      date = '0' + date;
    }

    var month = dayFromToday.getMonth() + 1;
    if (month < 10 ) {
      month = '0' + month;
    }

    var year = dayFromToday.getFullYear();
    valueDateDefault = date + '/' + month + '/' + year;  

    return valueDateDefault;

  },


  //Функция для нахождения элемента Input по соответствующему ему элементу Label
  findInputElement: function(labelElement) {
    var inputId = labelElement.htmlFor;
    var inputSelector = '#' + inputId;
    var inputElement = document.querySelector(inputSelector);

    return inputElement;
  },


  //Функция для нахождения элемента Label по соответствующему ему элементу Input
  findLabelElement: function(inputElement) {
    var inputElementId = inputElement.id;

    var labelSelector = 'label[for = ' + inputElementId + ']';

    var labelElement = document.querySelector(labelSelector);

    return labelElement;
  },


  //Функция для установки стиля на выбранный с помощью клавиши Enter элемент Label  и снятия стиля с предыдущего выбранного элемента Label
  setStyleLabelElement: function(checkedElement, currentCheckedElement) {
    if (currentCheckedElement ) {

      var labelCurrentElement = this.findLabelElement(currentCheckedElement);
      labelCurrentElement.setAttribute('style', 'box-shadow: none;');

      var labelCheckElement = this.findLabelElement(checkedElement);
      labelCheckElement.setAttribute('style', 'box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5) inset;');

    }
  
  },


//Функция алгоритма Луна проверки валидности номера карты.
  cardLuhnValid: function(cardHiddenElement) {

     var cardMod10;

     var nCheck = 0, nDigit = 0, bEven = false;

     for (var n = cardHiddenElement.value.length -1; n >= 0; n--) {

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

  }



};
