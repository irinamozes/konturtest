'use strict';

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

module.exports = {

//Обработчик событий нажатия стрелок влево и вправо для установки фокуса на элементах меню

  arrowPress: function(eArrowTarget, direct) {

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

  }

};
