'use strict';

var bodyElement = document.querySelector('body');

var containerLayoutElement = document.querySelector('#layout');

var formElement = document.querySelector('form');

var sectionElement = document.querySelector('section');

var addressElement = document.querySelector('#address');

var addressTooltipElement = document.querySelector('#tooltip');

var addrErrorCreateElement = document.createElement('div');

var parentAddrElement = addressTooltipElement.parentNode;

parentAddrElement.insertBefore(addrErrorCreateElement, addressTooltipElement);

addrErrorCreateElement.setAttribute('style', 'color: red');

addrErrorCreateElement.textContent = 'Ошибка: в адресе должны быть буквенно-цифровые символы (буквы латинские или русские), не должно быть символов, указанных в квадратных скобках: [\\\/\'\"@<>;:&%!?+].';

addrErrorCreateElement.classList.add('invisible');

var checkedPickupElement = document.querySelector('input[name = "delivery-method"]:checked');
var checkedPickupAddrElement = document.querySelector('input[name = "pickup-point"]:checked');

var addressElement = document.querySelector('#address');

var labelDataElement = document.querySelector('label[for = "date"]');

var dateElement = document.querySelector('#date');

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
var valueDateDefault = date + '/' + month + '/' + year;
dateElement.setAttribute('value', valueDateDefault);

var datErrorCreateElement = document.createElement('div');

var parentDatElement = dateElement.parentNode;

parentDatElement.insertBefore(datErrorCreateElement, dateElement);

datErrorCreateElement.setAttribute('style', 'color: red');

datErrorCreateElement.textContent = 'Ошибка: указывать можно только будущие даты, дата доставки должна отстоять не дальше чем на неделю от сегодняшнего дня, либо дата введена по неправильному шаблону.';
datErrorCreateElement.classList.add('invisible');

var datTooltipTemplateElement = document.createElement('div');
parentDatElement.insertBefore(datTooltipTemplateElement, labelDataElement);

datTooltipTemplateElement.setAttribute('style', 'float: right;');

datTooltipTemplateElement.textContent = 'Шаблон ввода даты: ДД/ММ/ГГГГ';
datTooltipTemplateElement.classList.add('tooltip');


var cardMod10; //переменная для результата проверки по алгоритму Луна.

var cardHiddenElement = document.querySelector('input[name = "credit-card"]');

var cardNumberElement = document.querySelector('.card');
var cardInputElement = document.querySelectorAll('.card-section');
var cardInputArr = Array.prototype.slice.call(cardInputElement, 0);

var card1Element = document.querySelector('#card-1');

var carErrorCreateElement = document.createElement('div');

var parentCarElement = card1Element.parentNode;

parentCarElement.insertBefore(carErrorCreateElement, card1Element);

carErrorCreateElement.setAttribute('style', 'color: red');

carErrorCreateElement.textContent = 'Ошибка: в номере карты должны быь только цифры, либо введены неправильные цифры.';
carErrorCreateElement.classList.add('invisible');


var methoDelivElement = document.querySelector('#delivery-2');

var methodMenuElement = document.querySelectorAll('label[for*="delivery"]');
var addrPickupMenuElement = document.querySelectorAll('label[for*="pickup-point"]');
var paymentMenuElement = document.querySelectorAll('label[for*="payment"]');

var methodMenuArr = Array.prototype.slice.call(methodMenuElement, 0);
var lengthMethodMenu = methodMenuArr.length;

var addressPickup; //Переменная для хранения выбранного адреса самовывоза

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

var parentPhoneElement = document.querySelector('.phone');

var phoneElement = document.querySelector('#phone');

var phoneDeliveryPElement = document.querySelector('.phone-description-delivery');

var phonePickupPElement = document.querySelector('.phone-description-pickup');

var telErrorCreateElement = document.createElement('div');

parentPhoneElement.insertBefore(telErrorCreateElement, phoneElement);

telErrorCreateElement.setAttribute('style', 'color: red');

telErrorCreateElement.textContent = 'Ошибка: в тлефоне должны быть буквенно-цифровые символы (буквы латинские или русские), не должно быть символов, указанных в квадратных скобках: [\\\/\'\"@<>;:&%!?].';
telErrorCreateElement.classList.add('invisible');

var containerSubmitElement = document.querySelector('.submit');
var buttonSubmitElement = containerSubmitElement.childNodes[1];
var tooltipSubmitElement = containerSubmitElement.childNodes[3];

tooltipSubmitElement.childNodes[4].setAttribute('for', 'phone');
tooltipSubmitElement.childNodes[2].setAttribute('for', 'address');
tooltipSubmitElement.childNodes[6].setAttribute('for', 'card-1');


var pCreateElement = document.createElement('p');//Создание элемента надписи с выбранным адресом самовывоза на карте

var mapContainerElement = document.querySelector('.map-container');
mapContainerElement.appendChild(pCreateElement);


//Переменные, показывающие какой пункт в двупунктном меню выбран
var pic = 0;
var deliv = 0;
var payCard = 0;
var payCash = 0;


//Объект со свойствами, показывающими какое из обзательных полей заполнено, а какое нет, обеспечивающий возможность выводить, или убирать текст "Осталось заполнить"
var tooltipInput = {};

tooltipInput.addr = 0;
tooltipInput.tel = 0;
tooltipInput.car = 0;


//Объект со свойствами, показывающими какое из обзательных полей заполнено правильно, а какое нет при потере фокуса или нажатии Enter, обеспечивающий возможность делать доступной, или недоступной кнопку "Заказать"
var validBlur = {};

validBlur.addr = 0;
validBlur.tel = 0;
validBlur.car = 0;
validBlur.dat = 0;






//Конструктор объекта-контейнера с id = #layout, которому делегируются все события.

var GetGood = function(elem) {

   var self = this;


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

    tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить';
    tooltipSubmitElement.childNodes[2].classList.add('invisible');
    tooltipSubmitElement.childNodes[3].data = '';
    tooltipSubmitElement.childNodes[4].classList.remove('invisible');

    tooltipSubmitElement.childNodes[5].data = ' И проверить правильность выбора адреса самовывоза ';
    tooltipSubmitElement.childNodes[6].classList.add('invisible');


    pic = 1;
    deliv = 0;

    payCard = 0;
    payCash = 0;

    self.buttonSubmitEnabl();

    self.phone();

    self.telValidOnBlur();


    self.setStyleLabelElement(checkedMethodElement, currentMethodCheckedElement);

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

    tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить';
    tooltipSubmitElement.childNodes[2].classList.remove('invisible');
    tooltipSubmitElement.childNodes[3].data = ' и ';
    tooltipSubmitElement.childNodes[5].data = '  Ну, и неплохо бы ';
    tooltipSubmitElement.childNodes[6].classList.remove('invisible');

    pic = 0;
    deliv = 1;

    payCard = 1;
    payCash = 0;

    self.buttonSubmitEnabl();

    self.phone();

    self.cardInputTooltip();

    self.addressInput();

    self.telValidOnBlur();

    self.addrValidOnBlur();

    self.datValidOnBlur();

    self.carValidOnEnter();

    self.carValidOnBlur();


    self.setStyleLabelElement(checkedMethodElement, currentMethodCheckedElement);

    currentMethodCheckedElement = checkedMethodElement;

    console.log('Доставка по городу');

    return currentMethodCheckedElement;
  };



  //Обработчик события выбора адреса самовывоза в меню адресов самовывоза
  this.addrpickup = function(checkedAddrElement) {

    var checkedElementId = checkedAddrElement.id;

    var labelSelector = 'label[for = ' + checkedElementId + ']';

    var labelPointElement = document.querySelector(labelSelector);
    addressPickup = labelPointElement.textContent;
    pCreateElement.innerHTML = '<strong>Адрес самовывоза: </strong>' + addressPickup;

    self.setStyleLabelElement(checkedAddrElement, currentPickupAddrCheckedElement);

    currentPickupAddrCheckedElement = checkedAddrElement;

    return currentPickupAddrCheckedElement;

  };



  //Обработчик события выбора пункта Карта в меню способа оплаты товара
  this.card = function(checkCardElement) {


    cardNumberElement.classList.remove('invisible');

    self.setStyleLabelElement(checkCardElement, currentCardCheckedElement);

    currentCardCheckedElement = checkCardElement;

    tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';

    tooltipSubmitElement.childNodes[5].data = '  Ну, и неплохо бы ';
    tooltipSubmitElement.childNodes[6].classList.remove('invisible');

    pic = 0;
    deliv = 1;
    payCard = 1;
    payCash = 0;

    self.buttonSubmitEnabl();

    self.phone();

    self.cardInputTooltip();

    self.addressInput();

    self.telValidOnBlur();

    self.addrValidOnBlur();

    self.datValidOnBlur();

    self.carValidOnEnter();



    console.log('Карта');

    return currentCardCheckedElement;
  };



  //Обработчик события выбора пункта Наличными курьеру в меню способа оплаты товара
  this.cash = function(checkCardElement) {

    cardNumberElement.classList.add('invisible');

    self.setStyleLabelElement(checkCardElement, currentCardCheckedElement);

    currentCardCheckedElement = checkCardElement;

    console.log('Наличными курьеру');


    tooltipSubmitElement.childNodes[5].data = '';
    tooltipSubmitElement.childNodes[6].classList.add('invisible');


    pic = 0;
    deliv = 1;
    payCard = 0;
    payCash = 1;

    self.phone();
    self.addressInput();

    self.telValidOnBlur();

    self.addrValidOnBlur();

    self.datValidOnBlur();

    self.buttonSubmitEnabl();

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



//Метод, убирающий, или восстанавливающий подсказки в зависимости от того начат, или нет ввод алреса
  this.addressInput = function() {
    if (addressElement.value.trim() !== '') {

      addrErrorCreateElement.classList.add('invisible');

      tooltipSubmitElement.childNodes[2].classList.add('invisible');

      addressTooltipElement.classList.add('invisible');

      delete tooltipInput.addr;

      if (payCard === 1) {

        if ((tooltipInput.tel === undefined) && (tooltipInput.car === undefined)) {

          tooltipSubmitElement.childNodes[0].data = '';

        } else {

          tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
          buttonSubmitElement.disabled = true;
        }

      } else {  // payCard === 0

        if (!("tel" in tooltipInput)) {

          tooltipSubmitElement.childNodes[0].data = '';

        } else {

          tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
          buttonSubmitElement.disabled = true;
        }

      }

    } else {

      tooltipSubmitElement.childNodes[2].classList.remove('invisible');

      addressTooltipElement.classList.remove('invisible');
      buttonSubmitElement.disabled = true;

      tooltipInput.addr = 0;

      validBlur.addr = 0;

      tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';

    }

  };



  //Метод, убирающий, или восстанавливающий подсказку в зависимости от того введен или нет телефон
  this.phone = function() {
    if (phoneElement.value.trim() !== '') {

      telErrorCreateElement.classList.add('invisible');

      if (pic === 1) {

        tooltipSubmitElement.childNodes[4].classList.add('invisible');

        tooltipSubmitElement.childNodes[5].data = '';

        delete tooltipInput.tel;

        tooltipSubmitElement.childNodes[0].data = '';

      } else { //pic === 0

        tooltipSubmitElement.childNodes[4].classList.add('invisible');
        tooltipSubmitElement.childNodes[3].data = '';

        delete tooltipInput.tel;

        if (payCard === 1) {

          if ((tooltipInput.addr === undefined) && (tooltipInput.car === undefined)) {

            tooltipSubmitElement.childNodes[0].data = '';

          } else {

            tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
            buttonSubmitElement.disabled = true;
          }

        } else {  // payCard === 0

          if (!("addr" in tooltipInput)) {

            tooltipSubmitElement.childNodes[0].data = '';

          } else {

            tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
            buttonSubmitElement.disabled = true;
          }

        }
      }

    } else {

      if (pic === 1) {

        tooltipSubmitElement.childNodes[4].classList.remove('invisible');

        tooltipSubmitElement.childNodes[5].data = ' И проверить правильность выбора адреса самовывоза ';


        tooltipInput.tel = 0;

        validBlur.tel = 0;

        tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить';

        buttonSubmitElement.disabled = true;

      } else {

        tooltipSubmitElement.childNodes[4].classList.remove('invisible');
        tooltipSubmitElement.childNodes[3].data = ' и ';

        tooltipInput.tel = 0;
        validBlur.tel = 0;

        tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';

        buttonSubmitElement.disabled = true;

      }

    }

  };



//Метод, убирающий, или восстанавливающий подсказку в зависимости от того был или нет начат ввод номера карты
  this.cardInputTooltip = function() {

     carErrorCreateElement.classList.add('invisible');

    if (card1Element.value.length !== 0) {

      carErrorCreateElement.classList.add('invisible');

      tooltipSubmitElement.childNodes[5].data = '';
      tooltipSubmitElement.childNodes[6].classList.add('invisible');

      delete tooltipInput.car;

      if ((tooltipInput.addr === undefined) && (tooltipInput.tel === undefined)) {

        tooltipSubmitElement.childNodes[0].data = '';

      } else {


        tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
        buttonSubmitElement.disabled = true;
      }

    } else {

      tooltipSubmitElement.childNodes[5].data = '  Ну, и неплохо бы ';
      tooltipSubmitElement.childNodes[6].classList.remove('invisible');

      tooltipInput.car = 0;
      validBlur.car = 0;

      tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
      buttonSubmitElement.disabled = true;

    }

  };



 //Обработчик события ввода номера карты
  this.cardPay = function(cardElement) {

    self.cardInputTooltip();

    if (cardElement.value.length === 4 && cardElement.getAttribute('id') !== 'card-4') {
      var indexCard = cardInputArr.indexOf(cardElement);
      cardInputArr[indexCard + 1].focus();
    }
  };



  //Обработчик события удаления символа в номере карты с помощью backspace
  this.cardBackspace = function(cardElement) {

    validBlur.car = 0;

    buttonSubmitElement.disabled = true;


    if (cardElement === card1Element) {

      self.cardInputTooltip();
    }

    if (cardElement.value.length === 0 && cardElement.getAttribute('id') !== 'card-1') {
      var indexCard = cardInputArr.indexOf(cardElement);
      cardInputArr[indexCard - 1].focus();
    }

    var cardArr = Array.prototype.slice.call(cardInputElement, 0);

    cardHiddenElement.value = cardArr[0].value + cardArr[1].value + cardArr[2].value + cardArr[3].value;

  };



  //Функция, вызывающая обработчики события выбора различных элементов формы с помощью клика
  this.elemOnEventClick = function(e) {

    var target = e.target;

    if (target === buttonSubmitElement) {
      console.log('заказ принят');

      //Объект для данных формы, если выбрана доставка по городу
      var jsonDeliv = {};

      //Объект для  данных  формы, если выбран самовывоз
      var jsonPickup = {};

      //Переменная для данных, отправляемых на сервер в формате json
      var jsonOrder;

      if (pic === 0) {

        buttonSubmitElement.disabled = true;

        buttonSubmitElement.blur();

        var timeFrom = "time-from";

        var timeTo = "time-to";

        var creditCard = "credit-card"

        jsonDeliv.address = addressElement.value;
        jsonDeliv.phone = phoneElement.value;
        jsonDeliv.date = dateElement.value;
        jsonDeliv[timeFrom] = timeFromInputElement.value;
        jsonDeliv[timeTo] = timeToInputElement.value;

        if (payCard === 1) {

          jsonDeliv[creditCard] = cardHiddenElement.value;

        }


        jsonOrder = JSON.stringify(jsonDeliv);

        console.log(jsonOrder);


        formElement.reset();

        sliderHandleElement.style.left = '0' + 'px';

        methoDelivElement.setAttribute('checked', 'true');

        self.delivery(methoDelivElement);

      } else {

        buttonSubmitElement.disabled = true;

        buttonSubmitElement.blur();

        jsonPickup. phone = phoneElement.value;

        jsonPickup.address = addressPickup;

        jsonOrder = JSON.stringify(jsonPickup);

        console.log(jsonOrder);

        phoneElement.value = '';

        self.pickup(checkedPickupElement);
        self.addrpickup(checkedPickupAddrElement);

      }

      return;

    }

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
  this.arrowPressSlider = function(e, directArrow) {

    if (!e.altKey || !e.shiftKey) {
      return;
    }


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



  //Функция, вызывающая обработчики события выбора элемента формы  с помощью нажатия Enter, или установки фокуса с помощью клавиш <- и ->
  this.elemOnEventKeyboard = function(e) {

    var eTarget = e.target;

    switch(e.keyCode) {

      case 13: //Enter

        if (eTarget === buttonSubmitElement) {

          self.elemOnEventClick(e);

          return;

        }

        if (eTarget === sliderHandleElement) {
          e.preventDefault();

          if (payCash !== 0) {
            phoneElement.focus();

          } else {
            card1Element.focus();

          }

          return;

        }


        if (eTarget.type === 'text') {

          if (eTarget.className !== "card-section") {

            eTarget.blur();

            return;

          } else {

            e.preventDefault();

            phoneElement.focus();

            buttonSubmitElement.disabled = true;
            self.carValidOnEnter();

          }

        } else {

          self.elemOnEventClick(e);
        }

        break;

      case 37: //стрелка влево

        if (eTarget === phoneElement) {
          return;
        }


        if (eTarget !== sliderHandleElement) {
          self.arrowPress(eTarget, 'left');
        } else {

          self.arrowPressSlider(e, 'left');
        }
        break;

      case 39: //стрелка вправо

        if (eTarget === phoneElement) {
          return;
        }

        if (eTarget !== sliderHandleElement) {
          self.arrowPress(eTarget, 'right');
        } else {

          self.arrowPressSlider(e, 'right');
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



  //Функция, вызываюшая обработчики события Input
  this.elemOnEventInput = function(e) {

    inputCheckElement = e.target;
    inputCheckElement.setAttribute('checked', 'true');

    var action; //переменная, в которую заносится название обработчика события выбора
    if (inputCheckElement.classList.contains('card-section')) {
      action = 'cardPay';
    }

    if (inputCheckElement === phoneElement) {
      action = 'phone';
    }

    if (inputCheckElement === dateElement) {

      datErrorCreateElement.classList.add('invisible');
    }

    if (inputCheckElement === addressElement) {
      action = 'addressInput';
    }

    if (action) {
      self[action](inputCheckElement);
    }
  };



  //Функция определения кооржинат для ползуна слайдера
  this.getCoords = function(el) { // кроме IE8-
    var box = el.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };



  //Обработчик события mousedown при нажатии кнопки мыши на ползуне слайдера
  this.elemOnEventMouseSliderDown = function(e) {

    var sliderHandleCoords = self.getCoords(sliderHandleElement);

    shiftX = e.pageX - sliderHandleCoords.left;

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

    //Отображение времени начала и конца интервала  доставки на слайдере при движении ползуна по границе слайдера с интервалом в 15 минут
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
  };



  //Функция, блокирующая, или разблокирующая кнопку "Заказать" в зависимости от того валидны, или нет введенные поля. Вызывается в методах проверки валидности полей при потере ими фокуса.
  this.buttonSubmitEnabl = function() {

    if (pic === 1) {

      if (validBlur.tel === undefined) {

        buttonSubmitElement.disabled = false;

        buttonSubmitElement.scrollIntoView(true); //При разблокировании кнопки "Заказать" экран прокручивается к ней.

      } else {

        buttonSubmitElement.disabled = true;

      }


    } else { //pic === 0


      if (payCard === 1) {

        if ((validBlur.addr === undefined) && (validBlur.car === undefined) && (validBlur.tel === undefined) && (validBlur.dat === undefined)) {

          buttonSubmitElement.disabled = false;

          buttonSubmitElement.scrollIntoView(true);  //При разблокировании кнопки "Заказать" экран прокручивается к ней.

        } else {

          buttonSubmitElement.disabled = true;

        }

      } else {  // payCard === 0

        if ((validBlur.addr === undefined) && (validBlur.tel === undefined) && (validBlur.dat === undefined)) {

          buttonSubmitElement.disabled = false;

          buttonSubmitElement.scrollIntoView(true);  //При разблокировании кнопки "Заказать" экран прокручивается к ней.

        } else {

          buttonSubmitElement.disabled = true;

        }


      }

    }

  };



//Функция, проверяющая валидность введенного адреса при нажатии Enter на поле ввода адреса, или при потери фокуса элементом ввода адреса. Скрывает, или показывает сообщение об ошибке. ВЫзывает функцию, блокирующую, или разблокирующую кнопку "Заказать".
  this.addrValidOnBlur = function() {

    if (addressElement.value === '') {

      return;

    }

    var valid = /(\w+)+|([А-Яа-я0-9]+)+/.test(addressElement.value);

    var validNot = /[\\\/'"@<>;:&%!?+]/.test(addressElement.value);


    if (valid && !validNot) {

      delete validBlur.addr;

      addrErrorCreateElement.classList.add('invisible');

      self.buttonSubmitEnabl();

      if (buttonSubmitElement.disabled === true) {
         dateElement.focus();
      }

    } else {

      validBlur.addr = 0;

      addrErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;

    }

  };



//Функция, проверяющая валидность введенной даты при нажатии Enter на поле ввода даты доставки, или при потери фокуса элементом ввода даты, а так же при первоначальной загрузке страницы. Скрывает, или показывает сообщение об ошибке. ВЫзывает функцию, блокирующую, или разблокирующую кнопку "Заказать".
  this.datValidOnBlur = function() {

    if (dateElement.value.trim() === '') {

      validBlur.dat = 0;
      return;

     }

    var dateInputObject = new Date();

    var ddInput = dateElement.value.substring(0,2);

    ddInput = parseInt(ddInput, 10);

    var mmInput = dateElement.value.substring(3,5);

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

    if (ddInput === 0 || ddInput > 31 || mmInput === -1 || mmInput > 11 || yearInput === 0)  {

      datErrorCreateElement.classList.remove('invisible'); // Устанавливаем сообщение об ошибке

      buttonSubmitElement.disabled = true;

      return;
    }

    if (dateInputObject.getTime() >= today.getTime() + 24 * 60 * 60 * 1000 && dateInputObject.getTime() < today.getTime() + 8 * 24 * 60 * 60 * 1000)  {

      delete validBlur.dat;

      datErrorCreateElement.classList.add('invisible');

      self.buttonSubmitEnabl();

      if (buttonSubmitElement.disabled === true) {
        sliderHandleElement.focus();
      }



    } else {

      validBlur.dat = 0;

      datErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;

    }

  };



//Функция, проверяющая валидность введенного телефона при нажатии Enter на поле ввода номера телефона или при потери фокуса элементом ввода номера телефона. Скрывает, или показывает сообщение об ошибке. ВЫзывает функцию, блокирующую, или разблокирующую кнопку "Заказать".

  this.telValidOnBlur = function() {

    if (phoneElement.value === '')  {

      return;

    }

    var valid = /(\w+)+|([А-Яа-я0-9]+)+/.test(phoneElement.value);

    var validNot = /[\\\/'"@<>;:&%!?]/.test(phoneElement.value);


    if (valid && !validNot) {


      delete validBlur.tel;

      telErrorCreateElement.classList.add('invisible');

      self.buttonSubmitEnabl();

    } else {

      validBlur.tel = 0;

      telErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;

    }

  };



//Функция алгоритма Луна проверки валидности номера карты.
  this.cardLuhnValid = function() {

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

  };



//Обработчик события нажатия Enter при вводе номера карты. Вызывает функцию, проверяющую валидность введенного номера.
  this.carValidOnEnter = function() {

      buttonSubmitElement.disabled = true;

    var cardBlurArr = Array.prototype.slice.call(cardInputElement, 0);

    cardHiddenElement.value = cardBlurArr[0].value + cardBlurArr[1].value + cardBlurArr[2].value + cardBlurArr[3].value;

    if (cardHiddenElement.value.trim() === '') {
      buttonSubmitElement.disabled = true;
      validBlur.car = 0;

      return
    }

    if (cardHiddenElement.value.trim().length !== 16) {
      buttonSubmitElement.disabled = true;
      validBlur.car = 0;
      carErrorCreateElement.classList.remove('invisible');

      return
    }

    self.carValidOnBlur();

  };



//Функция, вызывающая функцию проверки валидности номера карты при событии потери фокуса  полями ввода номера.
  this.carValidOnBlur = function() {

    var cardBlurArr = Array.prototype.slice.call(cardInputElement, 0);

    cardHiddenElement.value = cardBlurArr[0].value + cardBlurArr[1].value + cardBlurArr[2].value + cardBlurArr[3].value;

    if (cardHiddenElement.value.trim().length !== 16)  {

      validBlur.car = 0;

      buttonSubmitElement.disabled = true;

      return;

    } else {

      self.carValid();

    }

  };



//Функция, проверяющая валидность введенного номера карты с использованием алгоритма Луна. Скрывает, или показывает сообщение об ошибке. ВЫзывает функцию, блокирующую, или разблокирующую кнопку "Заказать".
  this.carValid = function() {

    var cardHiddenValid = cardHiddenElement.value.search(/[^0-9]/);

    if (cardHiddenValid !== -1)  {

      validBlur.car = 0;

      carErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;

      return
    }

    self.cardLuhnValid();

    if (cardMod10 === 0) {

      delete validBlur.car;

      carErrorCreateElement.classList.add('invisible');

      self.buttonSubmitEnabl();

    } else {

      validBlur.car = 0;

      carErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;

    }

  };



  this.carBlur = function() {

    if (document.activeElement.className === "card-section") {

      console.log(document.activeElement);

    } else {

      console.log('uuuuuuuu');

    }

  }




  elem.onclick = self.elemOnEventClick;
  elem.oninput = self.elemOnEventInput;
  elem.onkeydown = self.elemOnEventKeyboard;
  sliderHandleElement.onmousedown = self.elemOnEventMouseSliderDown;
  sliderElement.onmousemove = self.elemOnEventMouseSliderMove;
  elem.onmouseup = self.elemOnEventMouseSliderUp;

  phoneElement.onblur = self.telValidOnBlur;
  addressElement.onblur = self.addrValidOnBlur;
  dateElement.onblur = self.datValidOnBlur;

  cardInputArr[0].onblur = self.carValidOnBlur;
  cardInputArr[1].onblur = self.carValidOnBlur;
  cardInputArr[2].onblur = self.carValidOnBlur;
  cardInputArr[3].onblur = self.carValidOnBlur;


  formElement.onsubmit = function() {
    return false;
  };

  sliderHandleElement.ondragstart = function() {
    return false;
  };

};




var actionSet = new GetGood(containerLayoutElement);

actionSet.pickup(checkedPickupElement);
actionSet.addrpickup(checkedPickupAddrElement);
actionSet.datValidOnBlur();


var focusFirstElement = actionSet.findLabelElement(checkedPickupElement);
focusFirstElement.focus();


