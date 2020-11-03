import {select, settings} from '../settings.js';

export class AmountWidget {
  constructor(element) {
    const thisWidget = this;

    thisWidget.getElements(element);
    thisWidget.setValue(thisWidget.input.value);

    //console.log('AmountWidget:' , thisWidget);
    //console.log('construktor arguments:' , element);
  }

  getElements(element) {
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);

  }

  setValue(value) {
    const thisWidget = this;

    const newValue = parseInt(value);
    if (newValue != thisWidget.value && (newValue >= settings.amountWidget.defaultMin || newValue <= settings.amountWidget.defaultMax)) {
      thisWidget.value = newValue;
      thisWidget.announce();
    }
    thisWidget.input.value = thisWidget.value;

    //thisWidget.amount = thisWidget.element.querySelector(select.widgets.amount);

    const input = thisWidget.value;
    console.log(input);
  }
  initActions() {
    const thisWidget = this;

    // thisWidget.input.addEventListener('updated', function(event){
    //   thisProduct.processOrder();
    //   //thisWidget.setValue(element);
    // });

    thisWidget.linkDecrease.addEventListener('click', function () {
      thisWidget.setValue(thisWidget.value - 1);
    });

    thisWidget.linkIncrease.addEventListener('click', function () {
      thisWidget.setValue(thisWidget.value + 1);
    });

  }
  announce() {
    const thisWidget = this;

    const event = new CustomEvent('updated', { bubbles: true });
    thisWidget.element.dispatchEvent(event);
  }

}