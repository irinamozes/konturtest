'use strict';


module.exports = {

    //Функция, блокирующая, или разблокирующая кнопку "Заказать" в зависимости от того валидны, или нет введенные поля. Вызывается в методах проверки валидности полей при потере ими фокуса.
  buttonSubmitEnable: function(selectMenuObj, validBlurObj, buttonSubmitElement) {
          
//    console.log("thisVB  " + validBlurObj);

    if (selectMenuObj.pic === 1) {

      if (validBlurObj.tel === undefined) {

        buttonSubmitElement.disabled = false;

        //buttonSubmitElement.scrollIntoView(true); //При разблокировании кнопки "Заказать" экран прокручивается к ней.

      } else {

        buttonSubmitElement.disabled = true;

      } 
  
        
    } else { //pic === 0


      if (selectMenuObj.payCard === 1) {

        if ((validBlurObj.addr === undefined) && (validBlurObj.car === undefined) && (validBlurObj.tel === undefined) && (validBlurObj.dat === undefined)) {

          buttonSubmitElement.disabled = false;

          //buttonSubmitElement.scrollIntoView(true);  //При разблокировании кнопки "Заказать" экран прокручивается к ней.

        } else {

          buttonSubmitElement.disabled = true;
   
        }

      } else {  // payCard === 0

        if ((validBlurObj.addr === undefined) && (validBlurObj.tel === undefined) && (validBlurObj.dat === undefined)) {

          buttonSubmitElement.disabled = false;

          //buttonSubmitElement.scrollIntoView(true);  //При разблокировании кнопки "Заказать" экран прокручивается к ней.

        } else {

          buttonSubmitElement.disabled = true;

        }
 

      }
           
    }
  
  }

};
