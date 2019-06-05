'use strict';

var utils = require('./utils');

var arrow_press_menu_event = require('./arrow_press_menu_event');

var button_submit_enable_disable = require('./button_submit_enable_disable');

var input_tooltips_hide_render = require('./input_tooltips_hide_render');

var bodyElement = document.querySelector('body');

var legendElement = document.querySelector('legend');

var containerLayoutElement = document.querySelector('#layout');

var formElement = document.querySelector('form');

var sectionElement = document.querySelector('section');


var checkedPickupElement = document.querySelector('input[name = "delivery-method"]:checked');
var checkedPickupAddrElement = document.querySelector('input[name = "pickup-point"]:checked');

var addressPickup; //Переменная для хранения выбранного адреса самовывоза


var addressElement = document.querySelector('#address');

//Создание элемента, который будет содержать сообщение об ошибке ввода адреса доставки
var addrErrorCreateElement = document.createElement('div');

var addrErrorMes = 'Ошибка: в адресе должны быть буквенно-цифровые символы (буквы латинские и\/или русские), не должно быть символов, указанных в квадратных скобках: [\\\/\'\"@<>;:&%!?+].';

utils.displayMes(addressElement, addrErrorCreateElement, addrErrorMes, 'red', 'none', 'invisible');

var addressTooltipElement = document.querySelector('#tooltip');


var today = new Date();

var labelDataElement = document.querySelector('label[for = "date"]');

var dateElement = document.querySelector('#date');

//Создание элемента, который будет содержать сообщение об ошибке ввода даты доставки
var datErrorCreateElement  = document.createElement('div');

var datErrorMes = 'Ошибка: указывать можно только будущие даты, дата доставки должна отстоять не дальше чем на неделю от сегодняшнего дня, либо дата введена по неправильному шаблону.';

utils.displayMes(dateElement, datErrorCreateElement, datErrorMes, 'red', 'none', 'invisible');

//Переменная, для даты доставки по умолчанию
var valueDateDefault = utils.calcDateDefault();

dateElement.setAttribute('value', valueDateDefault);

//Создание элемента, который будет показывать шаблон ввода даты доставки
var datTooltipTemplateElement = document.createElement('div');

var datTooltipTemplateMes = 'Шаблон ввода даты: ДД/ММ/ГГГГ';

utils.displayMes(dateElement, datTooltipTemplateElement, datTooltipTemplateMes, 'white', 'right', 'tooltip');


var cashMenuRadioElement = document.querySelector('#payment-cash');

var cardMenuRadioElement = document.querySelector('#payment-card');

var cardMod10; //переменная для результата проверки по алгоритму Луна.

var cardHiddenElement = document.querySelector('input[name = "credit-card"]');

var cardNumberElement = document.querySelector('.card');
var cardInputElement = document.querySelectorAll('.card-section');
var cardInputArr = Array.prototype.slice.call(cardInputElement, 0);

//Создание элемента, который будет показывать подсказку для ввода номера карты
var carTooltipElement = document.createElement('div');

var carTooltipMes = 'В номере карты должно быть 16 знаков';

utils.displayMes(cardInputArr[3], carTooltipElement, carTooltipMes, 'red', 'right', 'tooltip');


var card1Element = document.querySelector('#card-1');

//Создание элемента, который будет содержать сообщение об ошибке ввода номера карты
var carErrorCreateElement = document.createElement('div');

var carErrorMes = 'Ошибка: в номере карты должны быть только цифры, либо введены неправильные цифры.';

utils.displayMes(card1Element, carErrorCreateElement, carErrorMes, 'red', 'none', 'invisible');

var phoneElement = document.querySelector('#phone');

//Создание элемента, который будет показывать подсказку для ввода телефона
var telTooltipElement = document.createElement('div');

var telTooltipMes = 'Пожалуйста, укажите телефон. Введите не менее трех знаков.';

utils.displayMes(phoneElement, telTooltipElement, telTooltipMes, 'white', 'right', 'tooltip');

var phoneDeliveryPElement = document.querySelector('.phone-description-delivery');

var phonePickupPElement = document.querySelector('.phone-description-pickup');

//Создание элемента, который будет содержать сообщение об ошибке ввода номера телефона
var telErrorCreateElement = document.createElement('div');

 var telErrorMes = 'Ошибка: в тлефоне должны быть буквенно-цифровые символы (буквы латинские и\/или русские), не должно быть символов, указанных в квадратных скобках: [\\\/\'\"@<>;:&%!?].';

utils.displayMes(phoneElement, telErrorCreateElement, telErrorMes, 'red', 'none', 'invisible');


var methoDelivElement = document.querySelector('#delivery-2');


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


var containerSubmitElement = document.querySelector('.submit');

var buttonSubmitElement = containerSubmitElement.childNodes[1];

//Элемент для вывода на экран сообщения сервера
var serverResponseCreateElement = document.createElement('h3');


var tooltipSubmitElement = document.querySelector('.submit p');
tooltipSubmitElement.childNodes[6].setAttribute('for', 'phone');
tooltipSubmitElement.childNodes[2].setAttribute('for', 'address');
tooltipSubmitElement.childNodes[4].setAttribute('for', 'card-1');

var pCreateElement = document.createElement('p');//Создание элемента надписи с выбранным адресом самовывоза на карте

var mapContainerElement = document.querySelector('.map-container');
mapContainerElement.appendChild(pCreateElement);


//Объект, показывающий какой пункт в двупунктном меню выбран
var selectMenu = {};
selectMenu.pic = 0;
selectMenu.deliv = 0;
selectMenu.payCard = 0;
selectMenu.payCash = 0;


//Объекты с характеристиками полей заполнения
const addr = {
  elem: addressElement,
  name: 'addr',
  numberChildText: 0,
  textValue: 'Осталось заполнить:',
  numberChildLabel: 2
};

const car = {
  elem: card1Element,
  name: 'car',
  numberChildText: 3,
  textValue: ' и ',
  numberChildLabel: 4
};

const tel = {
  elem: phoneElement,
  name: 'tel',
  numberChildText: 5,
  textValue: '  Ну, и неплохо бы ',
  numberChildLabel: 6
};


//Объект со свойствами, показывающими какое из обзательных полей заполнено правильно, а какое нет при потере фокуса или нажатии Enter, обеспечивающий возможность делать доступной, или недоступной кнопку "Заказать"
var validBlur = {};
validBlur.addr = 0;
validBlur.tel = 0;
validBlur.car = 0;
validBlur.dat = 0;




//Конструктор объекта-контейнера с id = #layout, которому делегируются большинство событий.

var GetGood = function(elem) {

  var self = this;

  // this.arrowPress = this.arrowPress.bind(this);

  //Обработчик события выбора пункта Самовывоз в меню способа получения товара
  this.pickup = function(checkedMethodElement) {

    buttonSubmitElement.disabled = true;

    sectionElement.childNodes[1].classList.remove('invisible');
    sectionElement.childNodes[3].classList.add('invisible');

    addressTooltipElement.classList.add('invisible');
    phoneDeliveryPElement.classList.add('invisible');
    phonePickupPElement.classList.remove('invisible');

    tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
    tooltipSubmitElement.childNodes[2].classList.add('invisible');
    tooltipSubmitElement.childNodes[3].data = '';
    tooltipSubmitElement.childNodes[4].classList.add('invisible');

    tooltipSubmitElement.childNodes[5].data = '';
    tooltipSubmitElement.childNodes[6].classList.remove('invisible');


    selectMenu.pic = 1;
    selectMenu.deliv = 0;

    self.buttonSubmitEnable(selectMenu, validBlur, buttonSubmitElement);

    self.formInputTooltips(tel, telErrorCreateElement, selectMenu, validBlur, tooltipSubmitElement, buttonSubmitElement);

    self.telValidOnBlur();

    utils.setStyleLabelElement(checkedMethodElement, currentMethodCheckedElement);

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

    tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
    tooltipSubmitElement.childNodes[2].classList.remove('invisible');
    tooltipSubmitElement.childNodes[3].data = ' и ';
    tooltipSubmitElement.childNodes[5].data = '';
    tooltipSubmitElement.childNodes[6].classList.remove('invisible');

    selectMenu.pic = 0;
    selectMenu.deliv = 1;

    utils.setStyleLabelElement(checkedMethodElement, currentMethodCheckedElement);

    currentMethodCheckedElement = checkedMethodElement;

    console.log('Доставка по городу');

    if (selectMenu.payCard === 1) {
      self.card(cardMenuRadioElement);

    } else {

      self.cash(cashMenuRadioElement);

    }
  };


  //Обработчик события выбора адреса самовывоза в меню адресов самовывоза
  this.addrpickup = function(checkedAddrElement) {

    var labelPointElement = utils.findLabelElement(checkedAddrElement);

    addressPickup = labelPointElement.textContent;

    pCreateElement.innerHTML = '<strong>Адрес самовывоза: </strong>' + addressPickup;

    utils.setStyleLabelElement(checkedAddrElement, currentPickupAddrCheckedElement);

    currentPickupAddrCheckedElement = checkedAddrElement;

    return currentPickupAddrCheckedElement;

  };



  //Обработчик события выбора пункта Карта в меню способа оплаты товара
  this.card = function(checkCardElement) {

    cardNumberElement.classList.remove('invisible');

    utils.setStyleLabelElement(checkCardElement, currentCardCheckedElement);

    currentCardCheckedElement = checkCardElement;

    tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';

    tooltipSubmitElement.childNodes[3].data = ' и ';
    tooltipSubmitElement.childNodes[4].classList.remove('invisible');

    selectMenu.payCard = 1;
    selectMenu.payCash = 0;

    self.buttonSubmitEnable(selectMenu, validBlur, buttonSubmitElement);

    self.formInputTooltips(tel, telErrorCreateElement, selectMenu, validBlur, tooltipSubmitElement, buttonSubmitElement);

    self.formInputTooltips(car, carErrorCreateElement, selectMenu, validBlur, tooltipSubmitElement, buttonSubmitElement);

    self.formInputTooltips(addr, addrErrorCreateElement, selectMenu, validBlur, tooltipSubmitElement, buttonSubmitElement);

    self.telValidOnBlur();

    self.addrValidOnBlur();

    self.datValidOnBlur();

    //self.carValidOnEnter();

    console.log('Карта');

    return currentCardCheckedElement;
  };



  //Обработчик события выбора пункта Наличными курьеру в меню способа оплаты товара
  this.cash = function(checkCardElement) {

    cardNumberElement.classList.add('invisible');

    utils.setStyleLabelElement(checkCardElement, currentCardCheckedElement);

    currentCardCheckedElement = checkCardElement;

    console.log('Наличными курьеру');

    tooltipSubmitElement.childNodes[3].data = '';
    tooltipSubmitElement.childNodes[4].classList.add('invisible');

    selectMenu.payCard = 0;
    selectMenu.payCash = 1;

    self.formInputTooltips(tel, telErrorCreateElement, selectMenu, validBlur, tooltipSubmitElement, buttonSubmitElement);

    self.formInputTooltips(addr, addrErrorCreateElement, selectMenu, validBlur, tooltipSubmitElement, buttonSubmitElement);

    self.telValidOnBlur();

    self.addrValidOnBlur();

    self.datValidOnBlur();

    self.buttonSubmitEnable(selectMenu, validBlur, buttonSubmitElement);

    return currentCardCheckedElement;
  };


  //Обработчик события выбора элемента label, соответствующего полю телефона
  this.phoneSetFocus = function() {
    phoneElement.focus();
  };


 //Обработчик события ввода номера карты
  this.cardPay = function(cardElement) {

    self.formInputTooltips(car, carErrorCreateElement, selectMenu, validBlur, tooltipSubmitElement, buttonSubmitElement);

    if (cardElement.value.length === 4 && cardElement.getAttribute('id') !== 'card-4') {
      var indexCard = cardInputArr.indexOf(cardElement);
      cardInputArr[indexCard + 1].focus();
    }

    self.carValidOnBlur();

  };


  //Обработчик события удаления символа в номере карты с помощью backspace
  this.cardBackspace = function(cardElement) {

    validBlur.car = 0;

    buttonSubmitElement.disabled = true;


    if (cardElement === card1Element) {

      self.formInputTooltips(car, carErrorCreateElement, selectMenu, validBlur, tooltipSubmitElement, buttonSubmitElement);

    }

    if (cardElement.value.length === 0 && cardElement.getAttribute('id') !== 'card-1') {
      var indexCard = cardInputArr.indexOf(cardElement);
      cardInputArr[indexCard - 1].focus();
    }

     self.carValidOnBlur();

  };



  //Функция, вызывающая обработчики события выбора различных элементов формы с помощью клика
  this.elemOnEventClick = function(e) {

    var target = e.target;

    if (target === buttonSubmitElement) {
//      console.log('заказ принят');

      self.runOrder();

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

    inputCheckElement = utils.findInputElement(e.target);
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

//      console.log(self);

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


  //Функция, вызывающая обработчики событий при работе с элементами формы с клавиатуры
  this.elemOnEventKeyboard = function(e) {

    var eTarget = e.target;

    switch(e.keyCode) {

      case 13: //Enter

        if (eTarget === buttonSubmitElement) {

          self.elemOnEventClick(e);

          return;

        }

        if (eTarget === addressElement) {
          e.preventDefault();
          dateElement.focus();
          return;
        }


        if (eTarget === dateElement) {
          e.preventDefault();
          sliderHandleElement.focus();
          return;
        }

        if (eTarget === sliderHandleElement) {
          e.preventDefault();

          if (selectMenu.payCash !== 0) {
            phoneElement.focus();

          } else {
            card1Element.focus();

          }
          return;
        }


        if (eTarget.className === "card-section") {

          e.preventDefault();

          phoneElement.focus();

//          buttonSubmitElement.disabled = true;
          //self.carValidOnEnter();

        }

        if (eTarget === phoneElement) {
          e.preventDefault();
          phoneElement.focus();
          return;

        }

        if (eTarget.type === 'radio') {

          self.elemOnEventClick(e);
        }

        if (eTarget.hasAttribute('for')) {

          eTarget.click();
          //self.elemOnEventClick(e);
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

    if (inputCheckElement.classList.contains('card-section')) {

      self.cardPay(inputCheckElement);

    }

    if (inputCheckElement === phoneElement) {

      self.formInputTooltips(tel, telErrorCreateElement, selectMenu, validBlur, tooltipSubmitElement, buttonSubmitElement);

      if (phoneElement.value.length >= 1) {
        self.telValidOnBlur();
      }

    }

    if (inputCheckElement === dateElement) {

      datErrorCreateElement.classList.add('invisible');

      if (dateElement.value.length >= 10) {
        self.datValidOnBlur();
      }

    }

    if (inputCheckElement === addressElement) {


      self.formInputTooltips(addr, addrErrorCreateElement, selectMenu, validBlur, tooltipSubmitElement, buttonSubmitElement);

      if (addressElement.value.length >= 1) {
        self.addrValidOnBlur();
      }

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


//Функция, проверяющая валидность введенного адреса. Скрывает, или показывает сообщение об ошибке. ВЫзывает функцию, блокирующую, или разблокирующую кнопку "Заказать".
  this.addrValidOnBlur = function() {


    if (addressElement.value === '')  {

      return;

    }

    var valid = /(\w+)+|([А-Яа-я0-9]+)+/.test(addressElement.value);

    var validNot = /[\\\/'"@<>;:&%!?]/.test(addressElement.value);


    if (valid && !validNot && addressElement.value.trim().length >= 3) {


      delete validBlur.addr;

      addrErrorCreateElement.classList.add('invisible');

      self.buttonSubmitEnable(selectMenu, validBlur, buttonSubmitElement);

      addressTooltipElement.classList.add('invisible');

    }

    if (addressElement.value.trim().length < 3) {

      validBlur.addr = 0;

      buttonSubmitElement.disabled = true;

      addrErrorCreateElement.classList.add('invisible');

      addressTooltipElement.classList.remove('invisible');

    }

    if ((!valid || validNot) && addressElement.value.trim().length >= 3) {

      validBlur.addr = 0;

      buttonSubmitElement.disabled = true;

      addrErrorCreateElement.classList.remove('invisible');

      addressTooltipElement.classList.add('invisible');

    }

  };


//Функция, проверяющая валидность введенной даты доставки, в том числе при первоначальной загрузке страницы. Скрывает, или показывает сообщение об ошибке. ВЫзывает функцию, блокирующую, или разблокирующую кнопку "Заказать".
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

      self.buttonSubmitEnable(selectMenu, validBlur, buttonSubmitElement);

      if (buttonSubmitElement.disabled === true) {
        sliderHandleElement.focus();
      }

    } else {

      validBlur.dat = 0;

      datErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;

    }

  };



//Функция, проверяющая валидность введенного телефона. Скрывает, или показывает сообщение об ошибке. ВЫзывает функцию, блокирующую, или разблокирующую кнопку "Заказать".

  this.telValidOnBlur = function() {

    if (phoneElement.value === '')  {

      return;

    }

    var valid = /(\w+)+|([А-Яа-я0-9]+)+/.test(phoneElement.value);

    var validNot = /[\\\/'"@<>;:&%!?]/.test(phoneElement.value);


    if (valid && !validNot && phoneElement.value.trim().length >= 3) {


      delete validBlur.tel;

      telErrorCreateElement.classList.add('invisible');

      telTooltipElement.classList.add('invisible');

      self.buttonSubmitEnable(selectMenu, validBlur, buttonSubmitElement);

    }

    if (phoneElement.value.trim().length < 3) {

      validBlur.tel = 0;

      buttonSubmitElement.disabled = true;

      telTooltipElement.classList.remove('invisible');

      telErrorCreateElement.classList.add('invisible');

    }

    if ((!valid || validNot) && phoneElement.value.trim().length >= 3) {

      validBlur.tel = 0;

      buttonSubmitElement.disabled = true;

      telTooltipElement.classList.add('invisible');

      telErrorCreateElement.classList.remove('invisible');

    }

  };


//Функция, вызывающая функцию проверки валидности номера карты.
  this.carValidOnBlur = function() {

    var cardBlurArr = Array.prototype.slice.call(cardInputElement, 0);

    cardHiddenElement.value = cardBlurArr[0].value + cardBlurArr[1].value + cardBlurArr[2].value + cardBlurArr[3].value;

    if (cardHiddenElement.value.trim().length !== 16)  {

      carTooltipElement.classList.remove('invisible');
      validBlur.car = 0;

      buttonSubmitElement.disabled = true;

      return;

    } else {


      carTooltipElement.classList.add('invisible');
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

    cardMod10 = utils.cardLuhnValid(cardHiddenElement);

    if (cardMod10 === 0) {

      delete validBlur.car;

      carErrorCreateElement.classList.add('invisible');

      self.buttonSubmitEnable(selectMenu, validBlur, buttonSubmitElement);

    } else {

      validBlur.car = 0;

      carErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;

    }

  };

//Функция, вызываемая при отправке формы.
  this.runOrder = function() {


    //Объект для данных формы, если выбрана доставка по городу
    var jsonDeliv = {};

    //Объект для  данных  формы, если выбран самовывоз
    var jsonPickup = {};

    //Переменная для данных, отправляемых на сервер в формате json
    var jsonOrder;

    if (selectMenu.pic === 0) {

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

      if (selectMenu.payCard === 1) {

        jsonDeliv[creditCard] = cardHiddenElement.value;

      }


      jsonOrder = JSON.stringify(jsonDeliv);

      formElement.reset();

      sliderHandleElement.style.left = '0' + 'px';

      methoDelivElement.setAttribute('checked', 'true');

      self.delivery(methoDelivElement);

    } else {

      buttonSubmitElement.disabled = true;

      buttonSubmitElement.blur();

      jsonPickup.phone = phoneElement.value;

      jsonPickup.address = addressPickup;

      jsonOrder = JSON.stringify(jsonPickup);

      phoneElement.value = '';

      self.pickup(checkedPickupElement);
      self.addrpickup(checkedPickupAddrElement);

    }

    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {

      if ( xhr.status === 200) {

        var serverResMes = 'Заявка принята!';

        utils.displayMes(containerSubmitElement, serverResponseCreateElement, serverResMes, 'green', 'none');

      } else {

        var serverResMes = xhr.responseText;

        utils.displayMes(containerSubmitElement, serverResponseCreateElement, serverResMes, 'red', 'none');


      }

      var timeout;

      //Переменная для количества секунд, в течении которого будет виден ответ сервера
      var timeSeconds;


      if ( xhr.status === 200) {

        timeSeconds = 1000;

      } else {

        timeSeconds = 5000;

      }


      timeout = setTimeout(function(){

        serverResponseCreateElement.textContent = '';

        legendElement.scrollIntoView(true);

        addressElement.focus();

      }, timeSeconds);

    };

    xhr.open('POST', '/', true);

    xhr.send(jsonOrder);

  };


  elem.onclick = self.elemOnEventClick;
  elem.oninput = self.elemOnEventInput;
  elem.onkeydown = self.elemOnEventKeyboard;
  sliderHandleElement.onmousedown = self.elemOnEventMouseSliderDown;
  sliderElement.onmousemove = self.elemOnEventMouseSliderMove;
  elem.onmouseup = self.elemOnEventMouseSliderUp;


  formElement.onsubmit = function() {
    return false;
  };

  sliderHandleElement.ondragstart = function() {
    return false;
  };

};



GetGood.prototype.arrowPress = arrow_press_menu_event.arrowPress;

GetGood.prototype.buttonSubmitEnable = button_submit_enable_disable.buttonSubmitEnable;

GetGood.prototype.formInputTooltips = input_tooltips_hide_render.formInputTooltips;

var actionSet = new GetGood(containerLayoutElement);

selectMenu.pic = 1;
selectMenu.deliv = 0;
selectMenu.payCard = 1;
selectMenu.payCash = 0;


actionSet.pickup(checkedPickupElement);
actionSet.addrpickup(checkedPickupAddrElement);
actionSet.datValidOnBlur();

var focusFirstElement = utils.findLabelElement(checkedPickupElement);
focusFirstElement.focus();

