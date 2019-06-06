'use strict';


module.exports = {

    //Функция, блокирующая, или разблокирующая кнопку "Заказать" в зависимости от того валидны, или нет введенные поля.
  buttonSubmitEnable: function(selectMenuObj, validBlurObj, buttonSubmitElement) {
          
    if (selectMenuObj.pic === 1) {

      if (validBlurObj.vtel === undefined) {

        buttonSubmitElement.disabled = false;


      } else {

        buttonSubmitElement.disabled = true;

      } 
  
        
    } else { //pic === 0


      if (selectMenuObj.payCard === 1) {

        if ((validBlurObj.vaddr === undefined) && (validBlurObj.vcar === undefined) && (validBlurObj.vtel === undefined) && (validBlurObj.vdat === undefined)) {

          buttonSubmitElement.disabled = false;

          //buttonSubmitElement.scrollIntoView(true);  //При разблокировании кнопки "Заказать" экран прокручивается к ней.

        } else {

          buttonSubmitElement.disabled = true;
   
        }

      } else {  // payCard === 0

        if ((validBlurObj.vaddr === undefined) && (validBlurObj.vtel === undefined) && (validBlurObj.vdat === undefined)) {

          buttonSubmitElement.disabled = false;

          //buttonSubmitElement.scrollIntoView(true);  //При разблокировании кнопки "Заказать" экран прокручивается к ней.

        } else {

          buttonSubmitElement.disabled = true;

        }
 

      }
           
    }
  
  }

};
