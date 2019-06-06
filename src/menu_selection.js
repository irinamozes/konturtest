'use strict';

var utils = require('./utils');

var sectionElement = document.querySelector('section');

var pCreateElement = document.createElement('p');//Создание элемента надписи с выбранным адресом самовывоза на карте

var mapContainerElement = document.querySelector('.map-container');
mapContainerElement.appendChild(pCreateElement);


var cardNumberElement = document.querySelector('.card');

var phoneDeliveryPElement = document.querySelector('.phone-description-delivery');

var phonePickupPElement = document.querySelector('.phone-description-pickup');


var cashMenuRadioElement = document.querySelector('#payment-cash');

var cardMenuRadioElement = document.querySelector('#payment-card');


module.exports = {

  //Обработчик события выбора пункта Самовывоз в меню способа получения товара
  pickup: function(checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, buttonSubmitEnable, funcsObj) {    

    buttonSubmitElement.disabled = true;

    sectionElement.childNodes[1].classList.remove('invisible');
    sectionElement.childNodes[3].classList.add('invisible');
    phoneDeliveryPElement.classList.add('invisible');
    phonePickupPElement.classList.remove('invisible');

    tooltipSelectObj.tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:'; 
    tooltipSelectObj.tooltipSubmitElement.childNodes[2].classList.add('invisible');
    tooltipSelectObj.tooltipSubmitElement.childNodes[3].data = '';
    tooltipSelectObj.tooltipSubmitElement.childNodes[4].classList.add('invisible'); 
     
    tooltipSelectObj.tooltipSubmitElement.childNodes[5].data = '';
    tooltipSelectObj.tooltipSubmitElement.childNodes[6].classList.remove('invisible');


    tooltipSelectObj.selectMenu.pic = 1;
    tooltipSelectObj.selectMenu.deliv = 0;

    utils.setStyleLabelElement(checkedMenuElementsObj.menuCheckElement, checkedMenuElementsObj.currentMethodCheckedElement);

    checkedMenuElementsObj.currentMethodCheckedElement = checkedMenuElementsObj.checkedMethodElement;

    utils.pageViewInputTooltips(tooltipSelectObj, buttonSubmitElement, utils.pageViewInputTooltip);

    buttonSubmitEnable(tooltipSelectObj.selectMenu, tooltipSelectObj.validBlur, buttonSubmitElement);

    console.log('Самовывоз');

  },



  //Обработчик события выбора пункта Доставка по городу в меню способа получения товара
  delivery: function(checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, buttonSubmitEnable, funcsObj)

{    

    sectionElement.childNodes[3].classList.remove('invisible');
    sectionElement.childNodes[1].classList.add('invisible');

    buttonSubmitElement.disabled = true;
    phoneDeliveryPElement.classList.remove('invisible');
    phonePickupPElement.classList.add('invisible');

    tooltipSelectObj.tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
    tooltipSelectObj.tooltipSubmitElement.childNodes[2].classList.remove('invisible');
    tooltipSelectObj.tooltipSubmitElement.childNodes[3].data = ' и ';      
    tooltipSelectObj.tooltipSubmitElement.childNodes[5].data = '';
    tooltipSelectObj.tooltipSubmitElement.childNodes[6].classList.remove('invisible');
    
    tooltipSelectObj.selectMenu.pic = 0;
    tooltipSelectObj.selectMenu.deliv = 1;

    utils.setStyleLabelElement(checkedMenuElementsObj.menuCheckElement, checkedMenuElementsObj.currentMethodCheckedElement);

    checkedMenuElementsObj.currentMethodCheckedElement = checkedMenuElementsObj.checkedMethodElement;

    console.log('Доставка по городу');

    if (tooltipSelectObj.selectMenu.payCard === 1) {

      checkedMenuElementsObj.menuCheckElement = cardMenuRadioElement;

      funcsObj.card(checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, buttonSubmitEnable, funcsObj);

    } else {

      checkedMenuElementsObj.menuCheckElement = cashMenuRadioElement;

      funcsObj.cash(checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, buttonSubmitEnable, funcsObj);

    } 
  
  },



  //Обработчик события выбора пункта Карта в меню способа оплаты товара
  card: function(checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, buttonSubmitEnable, funcsObj) {
  
    cardNumberElement.classList.remove('invisible');

    utils.setStyleLabelElement(checkedMenuElementsObj.menuCheckElement, checkedMenuElementsObj.currentCardCheckedElement);

    checkedMenuElementsObj.currentCardCheckedElement = checkedMenuElementsObj.menuCheckElement;

    tooltipSelectObj.tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';

    tooltipSelectObj.tooltipSubmitElement.childNodes[3].data = ' и ';
    tooltipSelectObj.tooltipSubmitElement.childNodes[4].classList.remove('invisible');

    tooltipSelectObj.selectMenu.payCard = 1;
    tooltipSelectObj.selectMenu.payCash = 0;
     
    utils.pageViewInputTooltips(tooltipSelectObj, buttonSubmitElement, utils.pageViewInputTooltip);

    buttonSubmitEnable(tooltipSelectObj.selectMenu, tooltipSelectObj.validBlur, buttonSubmitElement);

    console.log('Карта');

  },



  //Обработчик события выбора пункта Наличными курьеру в меню способа оплаты товара
  cash: function(checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, buttonSubmitEnable, funcsObj) {

    cardNumberElement.classList.add('invisible');

    utils.setStyleLabelElement(checkedMenuElementsObj.menuCheckElement, checkedMenuElementsObj.currentCardCheckedElement);

    checkedMenuElementsObj.currentCardCheckedElement = checkedMenuElementsObj.menuCheckElement;

    console.log('Наличными курьеру');
    
    tooltipSelectObj.tooltipSubmitElement.childNodes[3].data = '';
    tooltipSelectObj.tooltipSubmitElement.childNodes[4].classList.add('invisible');

    tooltipSelectObj.selectMenu.payCard = 0;
    tooltipSelectObj.selectMenu.payCash = 1;

    utils.pageViewInputTooltips(tooltipSelectObj, buttonSubmitElement, utils.pageViewInputTooltip);

    buttonSubmitEnable(tooltipSelectObj.selectMenu, tooltipSelectObj.validBlur, buttonSubmitElement);

  },



  //Обработчик события выбора адреса самовывоза в меню адресов самовывоза
  addrpickup: function(checkedMenuElementsObj, tooltipSelectObj, buttonSubmitElement, buttonSubmitEnable, funcsObj) {

    var labelPointElement = utils.findLabelElement(checkedMenuElementsObj.menuCheckElement);

    checkedMenuElementsObj.addressPickup = labelPointElement.textContent;

    pCreateElement.innerHTML = '<strong>Адрес самовывоза: </strong>' + checkedMenuElementsObj.addressPickup;
    
    utils.setStyleLabelElement(checkedMenuElementsObj.menuCheckElement, checkedMenuElementsObj.currentPickupAddrCheckedElement);

    checkedMenuElementsObj.currentPickupAddrCheckedElement = checkedMenuElementsObj.menuCheckElement;

  }

}

