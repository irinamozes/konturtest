
// var utils = require('./utils');

var shiftX = null; // Переменная, показывающая была нажата кнопка мыши на ползуне слайдера, или нет.

var deliveryMaxInterval = 9; // Максимальное количество часов интервала доставки

module.exports = {

  // Обработчик событий передвижения ползуна слайдера с помощью клавиатуры
  arrowPressSlider: function(e, directArrow, sliderElement, sliderHandleElement, timeFromInputElement, timeToInputElement, onScrollWindowFunc) {
    var oldLeft; // Левая координата ползуна слайдера относительно родителя

    if (!e.altKey || !e.shiftKey) {
      return;
    }

    if (timeFromInputElement.value === '08:00') {
      sliderHandleElement.style.left = '0' + 'px';
    }

    window.onscroll = onScrollWindowFunc;

    var sliderCoordsW = sliderElement.getBoundingClientRect();

    // Интервал приращения горизонтальной координаты ползуна слайдера при его перемещении      с помощью клавиатуры, соответствующий 15-ти минутам
    var cooordIntervalSlider;

    // var sliderHandleCoords = getCoordsFunc(sliderHandleElement);

    oldLeft = parseInt(sliderHandleElement.style.left, 10);

    var oldValue = timeFromInputElement.value;

    var oldValueHours = oldValue.substring(0, 2);
    var oldValueMinutes = oldValue.substring(3);

    var oldMinutes = parseInt(oldValueHours, 10) * 60 + parseInt(oldValueMinutes, 10);

    var newMinutes;

    // Кол-во шагов, которые осталось пройти до начала, или конца максимального интервала  времени доставки
    var newSteps;

    // var newValue;

    var newLeftSlider;

    if (directArrow === 'left') {
      newSteps = Math.round((oldMinutes - 480) / 15);

      cooordIntervalSlider = Math.ceil(oldLeft / newSteps);

      newLeftSlider = oldLeft - cooordIntervalSlider;

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

      newLeftSlider = oldLeft + cooordIntervalSlider;

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
  },

  // Обработчик события mousedown при нажатии кнопки мыши на ползуне слайдера
  elemOnEventMouseSliderDown: function(e, sliderHandleElement, getCoordsFunc) {
    var sliderHandleCoords = getCoordsFunc(sliderHandleElement);

    shiftX = e.pageX - sliderHandleCoords.left;

    return shiftX;
  },

  // Обработчик события mousemove при движении мыши на родителе ползуна слайдера
  elemOnEventMouseSliderMove: function(e, sliderElement, sliderHandleElement, timeFromInputElement, timeToInputElement, onScrollWindowFunc, getCoordsFunc) {
    if (shiftX === null) {
      return;
    }

    var sliderCoords = getCoordsFunc(sliderElement);
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

    // Расчет начала интервала времени доставки в сотых долях часа, соответствующего части ширины слайдера, которую прошел ползун к текущему моменту, если вся ширина слайдера соответствует 9-ти часам (с 8-ми до 17-ти часов)
    var inputSliderSize = timeFromInputElement.getBoundingClientRect();

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

    // Отображение времени начала и конца интервала  доставки на слайдере при движении ползуна по границе слайдера с интервалом в 15 минут
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
  },

  // Обработчик события mouseup при прекращении движения ползуна слайдера
  elemOnEventMouseSliderUp: function(sliderHandleElement) {
    shiftX = null;
    sliderHandleElement.blur();
  },

  // Обработчик события scroll при движении ползуна слайдера с помощью клавиатуры
  onScrollWindow: function(sliderHandleElement) {
    if (document.activeElement === sliderHandleElement) {
      window.scrollTo(0, 0);

      var labelDataElement = document.querySelector('label[for = "date"]');

      labelDataElement.scrollIntoView(true);
    } else {

    }
  }

};
