
var utils = require('./utils');

module.exports = {

  // Метод, убирающий, или восстанавливающий подсказку  или сообщение об ошибке в зависимости от того начат или нет ввод в элемент формы

  formInputTooltips: function(elementInputObj, elErrorCreateElement, tooltipSelectObj, buttonSubmitElement, viewTooltipFunc) {
    elErrorCreateElement.classList.add('invisible');

    if (elementInputObj.elem.value.trim() !== '') {
      delete tooltipSelectObj.tooltipInput['i' + elementInputObj.name];
    } else {
      tooltipSelectObj.tooltipInput['i' + elementInputObj.name] = 0;
      tooltipSelectObj.validBlur['v' + elementInputObj.name] = 0;
    }

    utils.pageViewInputTooltips(tooltipSelectObj, buttonSubmitElement, viewTooltipFunc);
  }

};
