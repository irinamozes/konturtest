'use strict';

//Объект со свойствами, показывающими какое из обзательных полей заполнено, а какое нет, обеспечивающий возможность выводить, или убирать текст "Осталось заполнить"
var tooltipInput = {};
tooltipInput.addr = 0;
tooltipInput.tel = 0;
tooltipInput.car = 0;


module.exports = {

  //Метод, убирающий, или восстанавливающий подсказку  или сообщение об ошибке в зависимости от того начат или нет ввод в элемент формы
  formInputTooltips: function(elementInputObj, elErrorCreateElement, selectMenuObj, validBlurObj, tooltipSubmitElement, buttonSubmitElement) {

    elErrorCreateElement.classList.add('invisible');

    if (elementInputObj.elem.value.trim() !== '') {


      elErrorCreateElement.classList.add('invisible');

      if (selectMenuObj.pic === 1) {

        tooltipSubmitElement.childNodes[elementInputObj.numberChildLabel].classList.add('invisible');

        delete tooltipInput[elementInputObj.name];

        tooltipSubmitElement.childNodes[0].data = '';

      } else { //pic === 0

        tooltipSubmitElement.childNodes[elementInputObj.numberChildLabel].classList.add('invisible');
        tooltipSubmitElement.childNodes[elementInputObj.numberChildText].data = '';

        delete tooltipInput[elementInputObj.name];

        if (selectMenuObj.payCard === 1) {

          if ((tooltipInput.addr === undefined) && (tooltipInput.car === undefined) && (tooltipInput.tel === undefined)) {

            tooltipSubmitElement.childNodes[0].data = '';

          } else {

            tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
            buttonSubmitElement.disabled = true;
          }

        } else {  // payCard === 0

          //if (!("addr" in tooltipInput)) {
          if ((tooltipInput.addr === undefined) && (tooltipInput.tel === undefined)) {

            tooltipSubmitElement.childNodes[0].data = '';

          } else {

            tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';
            buttonSubmitElement.disabled = true;
          }

        }
      }

    } else {

      elErrorCreateElement.classList.add('invisible');


      if (selectMenuObj.pic === 1) {

        tooltipSubmitElement.childNodes[elementInputObj.numberChildLabel].classList.remove('invisible');

        tooltipInput.tel = 0;

        validBlurObj.tel = 0;

        tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить';

        buttonSubmitElement.disabled = true;

      } else {

        tooltipSubmitElement.childNodes[elementInputObj.numberChildLabel].classList.remove('invisible');
        tooltipSubmitElement.childNodes[elementInputObj.numberChildText].data = elementInputObj.textValue;
        //tooltipSubmitElement.childNodes[4].classList.remove('invisible');
        //tooltipSubmitElement.childNodes[3].data = ' и ';

        tooltipInput[elementInputObj.name] = 0;
        validBlurObj[elementInputObj.name] = 0;

        tooltipSubmitElement.childNodes[0].data = 'Осталось заполнить:';

        buttonSubmitElement.disabled = true;

      }

    }

  }

};

