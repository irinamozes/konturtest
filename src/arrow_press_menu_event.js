
var utils = require('./utils');

var methodMenuElement = document.querySelectorAll('label[for*="delivery"]');
var addrPickupMenuElement = document.querySelectorAll('label[for*="pickup-point"]');
var paymentMenuElement = document.querySelectorAll('label[for*="payment"]');

var methodMenuArr = Array.prototype.slice.call(methodMenuElement, 0);
var lengthMethodMenu = methodMenuArr.length;

var addrPickupMenuArr = Array.prototype.slice.call(addrPickupMenuElement, 0);
var lengthAddrPickupMenu = addrPickupMenuArr.length;

var paymentMenuArr = Array.prototype.slice.call(paymentMenuElement, 0);
var lengthPaymentMenu = paymentMenuArr.length;

var methodInputElements = document.querySelectorAll('input[name="delivery-method"]');
var addrPickupInputElements = document.querySelectorAll('input[name="pickup-point"]');
var paymentInputElements = document.querySelectorAll('input[name="payment-method"]');

var methodInputArr = Array.prototype.slice.call(methodInputElements, 0);
var lengthMethodInput = methodMenuArr.length;

var addrPickupInputArr = Array.prototype.slice.call(addrPickupInputElements, 0);
var lengthAddrPickupInput = addrPickupInputArr.length;

var paymentInputArr = Array.prototype.slice.call(paymentInputElements, 0);
var lengthPaymentInput = paymentInputArr.length;

var lab = 0; // признак того, какой элемент активен - label, или input.

var menuArr;
var menuArrLength;
var indexMenuArr;

module.exports = {

  // Обработчик событий нажатия стрелок влево и вправо для установки фокуса на элементах меню

  arrowPress: function(e, direct) {
    e.preventDefault();

    var eArrowTarget = e.target;

    if (eArrowTarget.parentElement.getAttribute('role') !== 'radiogroup') {
      return;
    };

    if (e.target.hasAttribute('for')) { // когда элемент меню label был активирован клавишей Tab
      lab = 1;

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
    } else { // когда элемент меню input был активирован кликом, Enter или был активирован стрелкой
      lab = 0;

      if (methodInputArr.indexOf(eArrowTarget) !== -1) {
        menuArr = methodInputArr;
        menuArrLength = lengthMethodInput;
        indexMenuArr = methodInputArr.indexOf(eArrowTarget);
      }

      if (addrPickupInputArr.indexOf(eArrowTarget) !== -1) {
        menuArr = addrPickupInputArr;
        menuArrLength = lengthAddrPickupInput;
        indexMenuArr = addrPickupInputArr.indexOf(eArrowTarget);
      }

      if (paymentInputArr.indexOf(eArrowTarget) !== -1) {
        menuArr = paymentInputArr;
        menuArrLength = lengthPaymentInput;
        indexMenuArr = paymentInputArr.indexOf(eArrowTarget);
      }
    }

    var inputArr;
    switch (indexMenuArr) {
      case 0:
        if (direct === 'left') {
          if (lab === 1) {
            inputArr = utils.findInputElement(menuArr[menuArrLength - 1]);
            inputArr.focus();
          } else {
            menuArr[menuArrLength - 1].focus();
          }
        } else { // right
          if (lab === 1) {
            inputArr = utils.findInputElement(menuArr[1]);
            inputArr.focus();
          } else {
            menuArr[1].focus();
          }
        }

        break;

      case menuArrLength - 1:

        if (direct === 'left') {
          if (lab === 1) {
            inputArr = utils.findInputElement(menuArr[menuArrLength - 2]);
            inputArr.focus();
          } else {
            menuArr[menuArrLength - 2].focus();
          }
        } else { // right
          if (lab === 1) {
            inputArr = utils.findInputElement(menuArr[0]);
            inputArr.focus();
          } else {
            menuArr[0].focus();
          }
        }
        break;

      default:
        if (direct === 'left') {
          if (lab === 1) {
            inputArr = utils.findInputElement(menuArr[indexMenuArr - 1]);
            inputArr.focus();
          } else {
            menuArr[indexMenuArr - 1].focus();
          }
        } else { // right
          if (lab === 1) {
            inputArr = utils.findInputElement(menuArr[indexMenuArr + 1]);
            inputArr.focus();
          } else {
            menuArr[indexMenuArr + 1].focus();
          }
        }

        break;
    }
  }

};
