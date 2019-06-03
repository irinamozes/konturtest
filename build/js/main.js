'use strict';
var bodyElement = document.querySelector('body');

var containerLayoutElement = document.querySelector('#layout');

var sectionElement = document.querySelector('section');

var addressTooltipElement = document.querySelector('#tooltip');

var checkedPickupElement = document.querySelector('input[name = "delivery-method"]:checked');
var checkedPickupAddrElement = document.querySelector('input[name = "pickup-point"]:checked');

var labelDataElement = document.querySelector('label[for = "date"]');

var cardNumberElement = document.querySelector('.card');
var cardInputElement = document.querySelectorAll('.card-section');
var cardInputArr = Array.prototype.slice.call(cardInputElement, 0);


var methodMenuElement = document.querySelectorAll('label[for*="delivery"]');
var addrPickupMenuElement = document.querySelectorAll('label[for*="pickup-point"]');
var paymentMenuElement = document.querySelectorAll('label[for*="payment"]');


var methodMenuArr = Array.prototype.slice.call(methodMenuElement, 0);
var lengthMethodMenu = methodMenuArr.length;

var addrPickupMenuArr = Array.prototype.slice.call(addrPickupMenuElement, 0);
var lengthAddrPickupMenu = addrPickupMenuArr.length;

var paymentMenuArr = Array.prototype.slice.call(paymentMenuElement, 0);
var lengthPaymentMenu = paymentMenuArr.length;

var menuArr;
var menuArrLength;
var indexMenuArr;

var labelTargetElement; //Элемент Label, на который надо установить фокус после клика или нажатия клавиши

var inputCheckElement; //Элемент Input, выбранный при каком-либо событии

var currentMethodCheckedElement; //Элемент Input в меню способа получения товара, который был с атрибутом checked перед следующим событием в этом меню
var currentPickupAddrCheckedElement; //Элемент Input в меню адресов самовывоза, который был с атрибутом checked перед следующим событием в этом меню
var currentCardCheckedElement; //Элемент Input в меню оплаты, который был с атрибутом checked перед следующим событием в этом меню


var timeFromInputElement = document.querySelector('#time-from');
var timeToInputElement = document.querySelector('#time-to');

var sliderElement = document.querySelector('.time-slider');
var sliderHandleElement = document.querySelector('.time-slider-handle');
var oldLeft = 0; //Левая координата ползуна слайдера относительно родителя
sliderHandleElement.style.left = '0' + 'px';

var shiftX = null; //Переменная, показывающая была нажата кнопка мыши на ползуне слайдера, или нет.

var deliveryMaxInterval = 9; //Максимальное количество часов интервала доставки


var phoneElement = document.querySelector('#phone');
var phoneDeliveryPElement = document.querySelector('.phone-description-delivery');
var phonePickupPElement = document.querySelector('.phone-description-pickup');


var containerSubmitElement = document.querySelector('.submit');
var buttonSubmitElement = containerSubmitElement.childNodes[1];
var tooltipSubmitElement = containerSubmitElement.childNodes[3];


tooltipSubmitElement.childNodes[4].setAttribute('for', 'phone');


var pCreateElement = document.createElement('p');//Создание элемента надписи с выбранным адресом самовывоза на карте

var mapContainerElement = document.querySelector('.map-container');
mapContainerElement.appendChild(pCreateElement);


//Конструктор объекта-контейнера с id = #layout, которому делегируются все события.
var GetGood = function(elem) {

  //Метод для нахождения элемента Input по соответствующему ему элементу Label
  this.findInputElement = function(labelElement) {
    var inputId = labelElement.htmlFor;
    var inputSelector = '#' + inputId;
    var inputElement = document.querySelector(inputSelector);

    return inputElement;
  };


  //Метод для нахождения элемента Label по соответствующему ему элементу Input
  this.findLabelElement = function(inputElement) {
    var inputElementId = inputElement.id;

    var labelSelector = 'label[for = ' + inputElementId + ']';

    var labelElement = document.querySelector(labelSelector);

    return labelElement;
  };


  //Метод для установки стиля на выбранный элемент Label и снятия стиля с предыдущего выбранного элемента Label
  this.setStyleLabelElement = function(checkedElement, currentCheckedElement) {
    if (currentCheckedElement ) {

      var labelCurrentElement = this.findLabelElement(currentCheckedElement);
      labelCurrentElement.setAttribute('style', 'box-shadow: none;');

      var labelCheckElement = this.findLabelElement(checkedElement);
      labelCheckElement.setAttribute('style', 'box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5) inset;');

    }
  };

  //Обработчик события выбора пункта Самовывоз в меню способа получения товара
  this.pickup = function(checkedMethodElement) {

    buttonSubmitElement.disabled = true;

    sectionElement.childNodes[1].classList.remove('invisible');
    sectionElement.childNodes[3].classList.add('invisible');

    addressTooltipElement.classList.add('invisible');
    phoneDeliveryPElement.classList.add('invisible');
    phonePickupPElement.classList.remove('invisible');

    tooltipSubmitElement.childNodes[2].classList.add('invisible');
    tooltipSubmitElement.childNodes[3].data = '';
    tooltipSubmitElement.childNodes[5].data = ' и проверить правильность выбора адреса самовывоза ';
    tooltipSubmitElement.childNodes[6].classList.add('invisible');

    this.setStyleLabelElement(checkedMethodElement, currentMethodCheckedElement);

    currentMethodCheckedElement = checkedMethodElement;

    console.log('Самовывоз');

    return currentMethodCheckedElement;
  };


  //Обработчик события выбора пункта Доставка по городу в меню способа получения товара
  this.delivery = function(checkedMethodElement) {

    sectionElement.childNodes[3].classList.remove('invisible');
    sectionElement.childNodes[1].classList.add('invisible');

    buttonSubmitElement.disabled = true;
    addressTooltipElement.classList.remove('invisible');
    phoneDeliveryPElement.classList.remove('invisible');
    phonePickupPElement.classList.add('invisible');

    tooltipSubmitElement.childNodes[2].classList.remove('invisible');
    tooltipSubmitElement.childNodes[3].data = ', и ';
    tooltipSubmitElement.childNodes[5].data = ', ну, ';
    tooltipSubmitElement.childNodes[6].classList.remove('invisible');

    this.setStyleLabelElement(checkedMethodElement, currentMethodCheckedElement);

    currentMethodCheckedElement = checkedMethodElement;

    console.log('Доставка по городу');

    return currentMethodCheckedElement;
  };


  //Обработчик события выбора адреса самовывоза в меню адресов самовывоза
  this.addrpickup = function(checkedAddrElement) {

    var checkedElementId = checkedAddrElement.id;

    var labelSelector = 'label[for = ' + checkedElementId + ']';

    var labelPointElement = document.querySelector(labelSelector);
    var addressPickup = labelPointElement.textContent;
    pCreateElement.innerHTML = '<strong>Адрес самовывоза: </strong>' + addressPickup;

    this.setStyleLabelElement(checkedAddrElement, currentPickupAddrCheckedElement);

    currentPickupAddrCheckedElement = checkedAddrElement;

    return currentPickupAddrCheckedElement;

  };


  //Обработчик события выбора пункта Карта в меню способа оплаты товара
  this.card = function(checkCardElement) {

    cardNumberElement.classList.remove('invisible');

    self.setStyleLabelElement(checkCardElement, currentCardCheckedElement);

    currentCardCheckedElement = checkCardElement;

    console.log('Карта');

    return currentCardCheckedElement;
  };


  //Обработчик события выбора пункта Наличными курьеру в меню способа оплаты товара
  this.cash = function(checkCardElement) {

    cardNumberElement.classList.add('invisible');

    self.setStyleLabelElement(checkCardElement, currentCardCheckedElement);

    currentCardCheckedElement = checkCardElement;

    console.log('Наличными курьеру');

    return currentCardCheckedElement;
  };


  //Обработчик событий нажатия стрелок влево и вправо для установки фокуса на элементах меню
  this.arrowPress = function(eArrowTarget, direct) {

    if (methodMenuArr.indexOf(eArrowTarget) === -1 && addrPickupMenuArr.indexOf(eArrowTarget) === -1 && paymentMenuArr.indexOf(eArrowTarget) === -1) {
      return;
    }

    if (methodMenuArr.indexOf(eArrowTarget) !== -1) {
      menuArr = methodMenuArr;
      menuArrLength = lengthMethodMenu;
      indexMenuArr = methodMenuArr.indexOf(eArrowTarget);
    }

    if (addrPickupMenuArr.indexOf(eArrowTarget) !== -1) {
      menuArr = addrPickupMenuArr;
      menuArrLength = lengthAddrPickupMenu;
      indexMenuArr = addrPickupMenuArr.indexOf(eArrowTarget);
    }

    if (paymentMenuArr.indexOf(eArrowTarget) !== -1) {
      menuArr = paymentMenuArr;
      menuArrLength = lengthPaymentMenu;
      indexMenuArr = paymentMenuArr.indexOf(eArrowTarget);
    }

    menuArr[indexMenuArr].blur();

    switch(indexMenuArr) {

      case 0:

        if(direct === 'left') {
          menuArr[menuArrLength - 1].focus();
        } else {
          menuArr[1].focus();
        }

        break;

      case menuArrLength - 1:
        if(direct === 'left') {
          menuArr[menuArrLength - 2].focus();

        } else {
          menuArr[0].focus();
        }
        break;

      default:
        if(direct === 'left') {
          menuArr[indexMenuArr - 1].focus();
        } else {
          menuArr[indexMenuArr + 1].focus();
        }
        break;
    }

  };



  //Обработчик события выбора элемента label, соответствующего полю телефона
  this.phoneSetFocus = function() {
    phoneElement.focus();
  };

  //Метод, убирающий, или восстанавливающий подсказку и доступность кнопки отправки данных в зависимости от того введен или нет телефон
  this.phone = function() {
    if (phoneElement.value.trim() !== '') {
      tooltipSubmitElement.classList.add('invisible');
      buttonSubmitElement.disabled = false;
    } else {
      tooltipSubmitElement.classList.remove('invisible');
      buttonSubmitElement.disabled = true;
    }
  };


  //Обработчик события ввода номера карты
  this.cardPay = function(cardElement) {
    if (cardElement.value.length === 4 && cardElement.getAttribute('id') !== 'card-4') {
      var indexCard = cardInputArr.indexOf(cardElement);
      cardInputArr[indexCard + 1].focus();
    }
  };

  //Обработчик события ввода номера карты
  this.cardPay = function(cardElement) {
    if (cardElement.value.length === 4 && cardElement.getAttribute('id') !== 'card-4') {
      var indexCard = cardInputArr.indexOf(cardElement);
      cardInputArr[indexCard + 1].focus();
    }
  };

  //Обработчик события удаления символа в номере карты с помощью backspace
  this.cardBackspace = function(cardElement) {
    if (cardElement.value.length === 0 && cardElement.getAttribute('id') !== 'card-1') {
      var indexCard = cardInputArr.indexOf(cardElement);
      cardInputArr[indexCard - 1].focus();
    }
  };

  var self = this;



  //Функция, вызывающая обработчики события выбора различных элементов формы с помощью клика
  this.elemOnEventClick = function(e) {

    var target = e.target;
    if (target.hasAttribute('for')) {
      labelTargetElement = target;
    } else {

      if (target.type === 'radio') {
        labelTargetElement.focus();
      }

      return;
    }

    inputCheckElement = self.findInputElement(e.target);
    inputCheckElement.setAttribute('checked', 'true');

    if (inputCheckElement.id !== 'phone') {
      inputCheckElement.setAttribute('tabindex', '-1');
    }

    var action; //переменная, в которую заносится название обработчика события выбора
    if (inputCheckElement.getAttribute('type') === 'radio') {
      action = inputCheckElement.getAttribute('value');
    } else {
      action = 'phoneSetFocus';
    }

    if (action) {
      self[action](inputCheckElement);
    }
  };



  //Обработчик событий передвижения ползуна слайдера с помощью клавиатуры
  this.arrowPressSlider = function(directArrow) {

    if (timeFromInputElement.value === '08:00') {

      sliderHandleElement.style.left = '0' + 'px';

    }


    window.onscroll = self.onScrollWindow;

    var inputSliderSize = timeFromInputElement.getBoundingClientRect();

    var sliderCoordsW = sliderElement.getBoundingClientRect();

    //Интервал приращения горизонтальной координаты ползуна слайдера при его перемещении      с помощью клавиатуры, соответствующий 15-ти минутам
    var cooordIntervalSlider;

    var sliderHandleCoords = self.getCoords(sliderHandleElement);

    oldLeft = parseInt(sliderHandleElement.style.left, 10);

    var oldValue = timeFromInputElement.value;

    var oldValueHours = oldValue.substring(0,2);
    var oldValueMinutes = oldValue.substring(3);

    var oldMinutes = parseInt(oldValueHours, 10) * 60 + parseInt(oldValueMinutes, 10);

    var newMinutes;

    //Кол-во шагов, которые осталось пройти до начала, или конца максимального интервала  времени доставки
    var newSteps;

    var newValue;

    var newLeftSlider;

    if (directArrow === 'left') {


       newSteps = Math.round((oldMinutes - 480) / 15);

       cooordIntervalSlider = Math.ceil(oldLeft / newSteps);

       newLeftSlider =  oldLeft - cooordIntervalSlider;

       newMinutes = oldMinutes - 15;


       if (newLeftSlider < 0) {

        newLeftSlider = 0;

      }


      if (newMinutes <= 480) {
        newLeftSlider = 0;
        newMinutes = 480;
      }

      if (oldValue === 480) {
        newLeftSlider = 0;
        newMinutes = 480;
      }


    } else {


      newSteps = Math.round((deliveryMaxInterval * 60 + 480 - oldMinutes) / 15);

      cooordIntervalSlider = Math.ceil((sliderCoordsW.width - oldLeft) / newSteps);

     newLeftSlider =  oldLeft + cooordIntervalSlider;

     newMinutes = oldMinutes + 15;


     if (newLeftSlider > sliderCoordsW.width) {

        newLeftSlider = sliderCoordsW.width;
      }


      if (newMinutes >= 1020) {
        newLeftSlider = sliderCoordsW.width;
        newMinutes = 1020;
      }

      if (oldValue === 1020) {
        newLeftSlider = sliderCoordsW.width;
        newMinutes = 1020;
      }

   }

    sliderHandleElement.style.left = newLeftSlider + 'px';

    var timeFromInputHours = Math.floor(newMinutes / 60);

    var timeFromInputMinutes = (newMinutes - timeFromInputHours * 60);

    if (timeFromInputHours < 10) {

      timeFromInputHours = '0' + timeFromInputHours;
    }

    if (timeFromInputMinutes === 0) {

      timeFromInputMinutes = '00';
    }

     timeFromInputElement.value = timeFromInputHours + ':' + timeFromInputMinutes;

     timeToInputElement.value = (parseInt(timeFromInputHours, 10) + 2) + ':' + timeFromInputMinutes;

  };



  //Функция, вызывающая обработчики события выбора элемента формы  с помощью нажатия Enter, или установки фокуса с помощью клавишь <- и ->
  this.elemOnEventKeyboard = function(e) {

    var eTarget = e.target;

    if (eTarget === phoneElement) {
      return;
    }

    switch(e.keyCode) {
      case 13: //Enter
        self.elemOnEventClick(e);
        break;

      case 37: //стрелка влево

        if (eTarget !== sliderHandleElement) {
          self.arrowPress(eTarget, 'left');
        } else {
          //console.log(eTarget);
          self.arrowPressSlider('left');
        }
        break;

      case 39: //стрелка вправо

        if (eTarget !== sliderHandleElement) {
          self.arrowPress(eTarget, 'right');
        } else {
          //console.log(eTarget);
          self.arrowPressSlider('right');
        }
        break;

      case 8: //backspace
        if (eTarget.className !== 'card-section') {
          return;
        }
        self.cardBackspace(eTarget);
        break;

      default:
        return;
    }

  };


  //Функция, вызываюшая обработчики обытия Input
  this.elemOnEventInput = function(e) {

    inputCheckElement = e.target;
    inputCheckElement.setAttribute('checked', 'true');

    var action; //переменная, в которую заносится название обработчика события выбора
    if (inputCheckElement.classList.contains('card-section')) {
      action = 'cardPay';
    } else {
      action = 'phone';
    }

    if (action) {
      self[action](inputCheckElement);
    }
  };



  //Функция определения кооржинат для ползуна слайдера
  this.getCoords = function(el) { // кроме IE8-
    var box = el.getBoundingClientRect();
    //console.log(pageXOffset);

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };


  //Обработчик события mousedown при нажатии кнопки мыши на ползуне слайдера
  this.elemOnEventMouseSliderDown = function(e) {

    var sliderHandleCoords = self.getCoords(sliderHandleElement);

    shiftX = e.pageX - sliderHandleCoords.left;

    sliderHandleElement.focus();

    return shiftX;
  };


  //Обработчик события mousemove при движении мыши на родителе ползуна слайдера
  this.elemOnEventMouseSliderMove = function(e) {

    var inputSliderSize = timeFromInputElement.getBoundingClientRect();

    if (shiftX === null) {
      return;
    }

     var sliderCoords = self.getCoords(sliderElement);
    //  вычесть координату родителя, т.к. position: relative
    var newLeft = e.pageX - shiftX - sliderCoords.left;
    //console.log(e.pageX);
    //console.log(sliderCoords.left);
    //console.log(shiftX);

    // курсор ушёл вне слайдера
    if (newLeft < 0) {
      newLeft = 0;
    }

    var rightEdge = sliderElement.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    sliderHandleElement.style.left = newLeft + 'px';

    //Расчет начала интервала времени доставки в сотых долях часа, соответствующего части ширины слайдера, которую прошел ползун к текущему моменту, если вся ширина слайдера соответствует 9-ти часам (с 8-ми до 17-ти часов)
    var timeFrom = (8 + 9 * (parseInt(newLeft, 10) / (inputSliderSize.width))).toFixed(2);

    var timeFromDecimal = timeFrom - Math.floor(timeFrom);
    var intSliderValue = Math.floor(timeFrom);
    if (timeFromDecimal >= 0.75) {
      intSliderValue = intSliderValue + 1;
    }

    var timeTo = intSliderValue + 2;

    if (intSliderValue < 10) {
      intSliderValue = '0' + intSliderValue;
    }

    //Отображение времени начала и конца интервала времени доставки на слайдере при движении ползуна по границе слайдера с интервалом в 15 минут
    if (timeFrom >= 8.12 && timeFrom < 17) {

      if (timeFromDecimal >= 0.00 && timeFromDecimal < 0.25) {
        timeFromInputElement.value = intSliderValue + ':' + '15';
        timeToInputElement.value = timeTo + ':' + '15';
      }

      if (timeFromDecimal >= 0.25 && timeFromDecimal < 0.50) {
        timeFromInputElement.value = intSliderValue + ':' + '30';
        timeToInputElement.value = timeTo + ':' + '30';
      }

      if (timeFromDecimal >= 0.50 && timeFromDecimal < 0.75) {
        timeFromInputElement.value = intSliderValue + ':' + '45';
        timeToInputElement.value = timeTo + ':' + '45';
      }

      if (timeFromDecimal >= 0.75) {
        timeFromInputElement.value = intSliderValue + ':' + '00';
        timeToInputElement.value = timeTo + ':' + '00';
      }

    } else {
      if (timeFrom < 8.12) {
        timeFromInputElement.value = intSliderValue + ':' + '00';
        timeToInputElement.value = 10 + ':' + '00';
      }

      if (timeFrom >= 17.00) {
        timeFromInputElement.value = '17:' + '00';
        timeToInputElement.value = 19 + ':' + '00';
      }

    }

  };


  //Обработчик события mouseup при прекращении движения ползуна слайдера
  this.elemOnEventMouseSliderUp = function() {
    shiftX = null;
    sliderHandleElement.blur();
  };




  //Обработчик события scroll при движении ползуна слайдера с помощью клавиатуры
  this.onScrollWindow = function() {

    if (document.activeElement === sliderHandleElement) {
      window.scrollTo(0,0);
      labelDataElement.scrollIntoView(true);
    } else {
      return;
    }
  }



  elem.onclick = self.elemOnEventClick;
  elem.oninput = self.elemOnEventInput;
  elem.onkeydown = self.elemOnEventKeyboard;
  sliderHandleElement.onmousedown = self.elemOnEventMouseSliderDown;
  sliderElement.onmousemove = self.elemOnEventMouseSliderMove;
  elem.onmouseup = self.elemOnEventMouseSliderUp;

  //window.onscroll = self.onScrollWindow;

  sliderHandleElement.ondragstart = function() {
    return false;
  };

};


var actionSet = new GetGood(containerLayoutElement);

actionSet.pickup(checkedPickupElement);
actionSet.addrpickup(checkedPickupAddrElement);
var focusFirstElement = actionSet.findLabelElement(checkedPickupElement);
focusFirstElement.focus();
