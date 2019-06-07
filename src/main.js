// 'use strict';

var utils = require('./utils');

var menuSelection = require('./menu_selection');

var arrowPressMenuEvent = require('./arrow_press_menu_event');

var button_submit_enable_disable = require('./button_submit_enable_disable');

var input_tooltips_hide_render = require('./input_tooltips_hide_render');

var validation_addr_tel = require('./validation_addr_tel');

var date_element = require('./date_element');

var card_element = require('./card_element');

var slider = require('./slider');

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

          labelTargetElement = utils.findLabelElement(eTarget);

          labelTargetElement.click();

        }

        if (eTarget.hasAttribute('for')) {

          eTarget.click();

        }

        break;

      case 37: //стрелка влево

        if (eTarget === phoneElement || eTarget === addressElement || eTarget === dateElement || eTarget.className === "card-section") {
          return;
        }


        if (eTarget !== sliderHandleElement) {
          self.arrowPress(e, 'left');

        } else {

          self.arrowPressSlider(e, 'left', sliderElement, sliderHandleElement, timeFromInputElement, timeToInputElement, self.onScrollWindow, utils.getCoords);
        }
        break;

      case 39: //стрелка вправо

        if (eTarget === phoneElement || eTarget === addressElement || eTarget === dateElement || eTarget.className === "card-section") {
          return;
        }

        if (eTarget !== sliderHandleElement) {

          //console.log(self.arrowPress);
          self.arrowPress(e, 'right');
        } else {

          self.arrowPressSlider(e, 'right', sliderElement, sliderHandleElement, timeFromInputElement, timeToInputElement, self.onScrollWindow, utils.getCoords);
        }
        break;

      case 8: //backspace
        if (eTarget.className !== 'card-section') {
          return;
        }
        self.cardBackspace(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, self.formInputTooltips, self.buttonSubmitEnable, self.carValidOnBlur, self.carValid);
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


      self.cardPay(inputCheckElement, carTooltipElement, carErrorCreateElement, cardHiddenElement, tooltipSelectObj, buttonSubmitElement, self.formInputTooltips, self.buttonSubmitEnable, self.carValidOnBlur, self.carValid);

    }

    if (inputCheckElement === phoneElement) {

    self.formInputTooltips(tel, telErrorCreateElement, tooltipSelectObj, buttonSubmitElement,  utils.pageViewInputTooltip );

    self.validationAddrTel(tel, telErrorCreateElement, telTooltipElement, selectMenu, validBlur, buttonSubmitElement, self.buttonSubmitEnable);

    }

    if (inputCheckElement === dateElement) {

      datErrorCreateElement.classList.add('invisible');

      if (dateElement.value.length >= 10) {
        self.datValidOnBlur(dateElement, datErrorCreateElement, tooltipSelectObj, buttonSubmitElement, self.buttonSubmitEnable);
      }

    }

    if (inputCheckElement === addressElement) {

    self.formInputTooltips(addr, addrErrorCreateElement, tooltipSelectObj, buttonSubmitElement,  utils.pageViewInputTooltip);

        self.validationAddrTel(addr, addrErrorCreateElement, addressTooltipElement, selectMenu, validBlur, buttonSubmitElement, self.buttonSubmitEnable);

    }

  };


  elem.onclick = self.elemOnEventClick;
  elem.oninput = self.elemOnEventInput;
  elem.onkeydown = self.elemOnEventKeyboard;

  sliderHandleElement.onmousedown = function (e) {
    self.elemOnEventMouseSliderDown(e, sliderHandleElement, utils.getCoords);
  };

  sliderElement.onmousemove = function (e) {
    self.elemOnEventMouseSliderMove(e, sliderElement, sliderHandleElement, timeFromInputElement, timeToInputElement, self.onScrollWindow, utils.getCoords);
  };

  elem.onmouseup = function (e) {
    self.elemOnEventMouseSliderUp(sliderHandleElement);
  };

  formElement.onsubmit = function() {
    return false;
  };

  sliderHandleElement.ondragstart = function() {
    return false;
  };

};


GetGood.prototype.pickup = menuSelection.pickup;

GetGood.prototype.delivery = menuSelection.delivery;

GetGood.prototype.addrpickup = menuSelection.addrpickup;

GetGood.prototype.card = menuSelection.card;

GetGood.prototype.cash = menuSelection.cash;

GetGood.prototype.arrowPress = arrowPressMenuEvent.arrowPress;

GetGood.prototype.buttonSubmitEnable = button_submit_enable_disable.buttonSubmitEnable;

GetGood.prototype.formInputTooltips = input_tooltips_hide_render.formInputTooltips;

GetGood.prototype.validationAddrTel = validation_addr_tel.validationAddrTel;

GetGood.prototype.cardPay = card_element.cardPay;

GetGood.prototype.cardBackspace = card_element.cardBackspace;

GetGood.prototype.carValidOnBlur = card_element.carValidOnBlur;

GetGood.prototype.arrowPressSlider = slider.arrowPressSlider;

GetGood.prototype.datValidOnBlur = date_element.datValidOnBlur;

GetGood.prototype.elemOnEventMouseSliderDown = slider.elemOnEventMouseSliderDown;

GetGood.prototype.elemOnEventMouseSliderMove = slider.elemOnEventMouseSliderMove;

GetGood.prototype.elemOnEventMouseSliderUp = slider.elemOnEventMouseSliderUp;

GetGood.prototype.onScrollWindow = slider.onScrollWindow;

GetGood.prototype.carValid = card_element.carValid;

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

actionSet.datValidOnBlur(dateElement, datErrorCreateElement, tooltipSelectObj, buttonSubmitElement, actionSet.buttonSubmitEnable);

var focusFirstElement = utils.findLabelElement(methodPickupElement);
focusFirstElement.focus();
