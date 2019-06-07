'use strict';

var utils = require('./utils');

var menu_selection = require('./menu_selection');

var arrow_press_menu_event = require('./arrow_press_menu_event');

var button_submit_enable_disable = require('./button_submit_enable_disable');

var input_tooltips_hide_render = require('./input_tooltips_hide_render');

var validation_addr_tel = require('./validation_addr_tel');

var run_order = require('./run_order');

var bodyElement = document.querySelector('body');

var legendElement = document.querySelector('legend');

var containerLayoutElement = document.querySelector('#layout');

var formElement = document.querySelector('form');

var methodPickupElement = document.querySelector('#delivery-1');
var checkedPicAddrElement = document.querySelector('input[name = "pickup-point"]:checked');

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

var cardMod10; //переменная для результата проверки по алгоритму Луна.

var cardHiddenElement = document.querySelector('input[name = "credit-card"]');

//var cardNumberElement = document.querySelector('.card'); // не надо
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

var telTooltipMes = 'Пожалуйста, укажите телефон.';

utils.displayMes(phoneElement, telTooltipElement, telTooltipMes, 'white', 'right', 'tooltip');

//Создание элемента, который будет содержать сообщение об ошибке ввода номера телефона
var telErrorCreateElement = document.createElement('div');

 var telErrorMes = 'Ошибка: в тлефоне должны быть буквенно-цифровые символы (буквы латинские и\/или русские), не должно быть символов, указанных в квадратных скобках: [\\\/\'\"@<>;:&%!?].';

utils.displayMes(phoneElement, telErrorCreateElement, telErrorMes, 'red', 'none', 'invisible');


var methodDelivElement = document.querySelector('#delivery-2');


var labelTargetElement; //Элемент Label, на который надо установить фокус после клика или нажатия клавиши

var menuCheckElement; //Элемент меню, выбранный при каком-либо событии

var currentMethodCheckedElement; //Элемент Input в меню способа получения товара, который был с атрибутом checked перед следующим событием в этом меню
var currentPickupAddrCheckedElement; //Элемент Input в меню адресов самовывоза, который был с атрибутом checked перед следующим событием в этом меню
var currentCardCheckedElement; //Элемент Input в меню оплаты, который был с атрибутом checked перед следующим событием в этом меню


var inputCheckElement; //Элемент ввода в форме, в который производится ввод в данный момент

var timeFromInputElement = document.querySelector('#time-from');
var timeToInputElement = document.querySelector('#time-to');

var sliderElement = document.querySelector('.time-slider');
var sliderHandleElement = document.querySelector('.time-slider-handle');
var inputSliderSize = timeFromInputElement.getBoundingClientRect();
var oldLeft = 0; //Левая координата ползуна слайдера относительно родителя
sliderHandleElement.style.left = '0' + 'px';

var shiftX = null; //Переменная, показывающая была нажата кнопка мыши на ползуне слайдера, или нет.

var deliveryMaxInterval = 9; //Максимальное количество часов интервала доставки


var containerSubmitElement = document.querySelector('.submit');

var buttonSubmitElement = containerSubmitElement.childNodes[1];


var tooltipSubmitElement = document.querySelector('.submit p');
tooltipSubmitElement.childNodes[6].setAttribute('for', 'phone');
tooltipSubmitElement.childNodes[2].setAttribute('for', 'address');
tooltipSubmitElement.childNodes[4].setAttribute('for', 'card-1');


//Объект, показывающий какой пункт в двупунктном меню выбран
var selectMenu = {};
selectMenu.pic = 0;
selectMenu.deliv = 0;
selectMenu.payCard = 0;
selectMenu.payCash = 0;


//Массив объектов с характеристиками полей заполнения, которые имеют подсказки рядом с кнопкой "Заказать".
const inputFieldsArr = [
  {
    elem: addressElement,
    name: 'addr',
    numberChildText: 0,
    textValue: 'Осталось заполнить:',
    numberChildLabel: 2
  }, {
    elem: card1Element,
    name: 'car',
    numberChildText: 3,
    textValue: ' и ',
    numberChildLabel: 4
  }, {
    elem: phoneElement,
    name: 'tel',
    numberChildText: 5,
    textValue: '  Ну, и неплохо бы ',
    numberChildLabel: 6
  }
]

const addr = inputFieldsArr[0];
const car = inputFieldsArr[1];
const tel = inputFieldsArr[2];


//Объект со свойствами, показывающими какое из обзательных полей заполнено, а какое нет, обеспечивающий возможность выводить, или убирать текст "Осталось заполнить", который может использоваться в качестве параметра функций
var tooltipInput = {};
tooltipInput.iaddr = 0;
tooltipInput.itel = 0;
tooltipInput.icar = 0;


//Объект со свойствами, показывающими какое из обзательных полей заполнено правильно, а какое нет, обеспечивающий возможность делать доступной, или недоступной кнопку "Заказать", который может использоваться в качестве параметра функций
var validBlur = {};
validBlur.vaddr = 0;
validBlur.vtel = 0;
validBlur.vcar = 0;
validBlur.vdat = 0;



//Объект, объединяющий несколько объектов, которые могут использоваться в качестве параметров функций
var tooltipSelectObj = {inputFieldsArr, tooltipInput, selectMenu, validBlur, tooltipSubmitElement};


//Объект, объединяющий активные элементы различных меню, которые могут использоваться в качестве параметров функций
var checkedMenuElementsObj = {menuCheckElement, currentMethodCheckedElement, currentCardCheckedElement, currentPickupAddrCheckedElement, addressPickup};


//Объект элементов, значения или состояния которых учитываются при обмене информацией с сервером, которые могут использоваться в качестве параметров функций
var serverSendingElementsObj = {legendElement, formElement, sliderHandleElement, methodDelivElement, methodPickupElement, checkedPicAddrElement, addressTooltipElement, carTooltipElement, telTooltipElement, addressElement, phoneElement, dateElement, timeFromInputElement, timeToInputElement, cardHiddenElement}




//Конструктор объекта-контейнера с id = #layout, которому делегируются большинство событий.

var GetGood = function(elem) {

  var self = this;

  this.arrowPress = this.arrowPress.bind(this);


  var pickup = self.pickup;
  var delivery = self.delivery;
  var addrpickup = self.addrpickup;
  var card = self.card;
  var cash = self.cash;

  //Объект, объединяющий функции, которые могут использоваться в качестве параметров других функций
  var funcsObj = {pickup, delivery, addrpickup, card, cash};


  //Обработчик события выбора элемента label, соответствующего полю телефона
  this.phoneSetFocus = function() {
    phoneElement.focus();
  };


  //Функция, вызывающая обработчики события выбора различных элементов формы с помощью клика
  this.elemOnEventClick = function(e) {

    var target = e.target;

    if (target === buttonSubmitElement) {

//      formElement.reset();
      e.preventDefault();

      self.runOrder(serverSendingElementsObj, checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, self.buttonSubmitEnable, funcsObj);

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

    checkedMenuElementsObj.menuCheckElement = utils.findInputElement(e.target);
    checkedMenuElementsObj.menuCheckElement.setAttribute('checked', 'true');

    if (checkedMenuElementsObj.menuCheckElement.id !== 'phone') {
      checkedMenuElementsObj.menuCheckElement.setAttribute('tabindex', '-1');
    }

    var action; //переменная, в которую заносится название обработчика события выбора
    if (checkedMenuElementsObj.menuCheckElement.getAttribute('type') === 'radio') {
      action = checkedMenuElementsObj.menuCheckElement.getAttribute('value');

    } else {
      action = 'phoneSetFocus';
    }

    if (action) {

      self[action](checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, self.buttonSubmitEnable, funcsObj);

    } else {

      return;

    }

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

        }

        if (eTarget === phoneElement) {
          e.preventDefault();
          phoneElement.focus();
          return;

        }

        if (eTarget.type === 'radio') {

          eTarget.click();

        }

        if (eTarget.hasAttribute('for')) {

          eTarget.click();

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

          //console.log(self.arrowPress);
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

    self.formInputTooltips(tel, telErrorCreateElement, tooltipSelectObj, buttonSubmitElement,  utils.pageViewInputTooltip );

    self.validationAddrTel(tel, telErrorCreateElement, telTooltipElement, selectMenu, validBlur, buttonSubmitElement, self.buttonSubmitEnable);

    }

    if (inputCheckElement === dateElement) {

      datErrorCreateElement.classList.add('invisible');

      if (dateElement.value.length >= 10) {
        self.datValidOnBlur();
      }

    }

    if (inputCheckElement === addressElement) {

    self.formInputTooltips(addr, addrErrorCreateElement, tooltipSelectObj, buttonSubmitElement,  utils.pageViewInputTooltip);

        self.validationAddrTel(addr, addrErrorCreateElement, addressTooltipElement, selectMenu, validBlur, buttonSubmitElement, self.buttonSubmitEnable);

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

    //inputSliderSize = timeFromInputElement.getBoundingClientRect();

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



//Функция, проверяющая валидность введенной даты доставки, в том числе при первоначальной загрузке страницы. Скрывает, или показывает сообщение об ошибке. ВЫзывает функцию, блокирующую, или разблокирующую кнопку "Заказать".
  this.datValidOnBlur = function() {

    if (dateElement.value.trim() === '') {

      validBlur.vdat = 0;
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

      delete validBlur.vdat;

      datErrorCreateElement.classList.add('invisible');

      self.buttonSubmitEnable(selectMenu, validBlur, buttonSubmitElement);

      if (buttonSubmitElement.disabled === true) {
        sliderHandleElement.focus();
      }

    } else {

      validBlur.vdat = 0;

      datErrorCreateElement.classList.remove('invisible');

      buttonSubmitElement.disabled = true;

    }

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


GetGood.prototype.pickup = menu_selection.pickup;

GetGood.prototype.delivery = menu_selection.delivery;

GetGood.prototype.addrpickup = menu_selection.addrpickup;

GetGood.prototype.card = menu_selection.card;

GetGood.prototype.cash = menu_selection.cash;

GetGood.prototype.arrowPress = arrow_press_menu_event.arrowPress;

GetGood.prototype.buttonSubmitEnable = button_submit_enable_disable.buttonSubmitEnable;

GetGood.prototype.formInputTooltips = input_tooltips_hide_render.formInputTooltips;

GetGood.prototype.validationAddrTel = validation_addr_tel.validationAddrTel;

GetGood.prototype.runOrder = run_order.runOrder;


var actionSet = new GetGood(containerLayoutElement);


selectMenu.pic = 1;
selectMenu.deliv = 0;
selectMenu.payCard = 1;
selectMenu.payCash = 0;


checkedMenuElementsObj.menuCheckElement = methodPickupElement;

actionSet.pickup(checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, actionSet.buttonSubmitEnable);

checkedMenuElementsObj.menuCheckElement = checkedPicAddrElement;
actionSet.addrpickup(checkedMenuElementsObj);

actionSet.datValidOnBlur();

var focusFirstElement = utils.findLabelElement(methodPickupElement);
focusFirstElement.focus();

