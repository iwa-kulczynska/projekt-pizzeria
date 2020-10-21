/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

//const { utils } = require('stylelint');
console.log(utils);
{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

  class Product {
    constructor(id, data){
      const thisProduct = this;

      thisProduct.id = id;
      thisProduct.data = data;

      thisProduct.renderInMenu();
      thisProduct.initAccordion();

      console.log('new Product:', thisProduct);
    }

    renderInMenu(){
      const thisProduct = this;

      /* generate HTML based on template */
      const generatedHTML = templates.menuProduct(thisProduct.data);
      /* create element using utils.createElementFromHTML */
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);
      /* find menu container */
      const menuContainer = document.querySelector(select.containerOf.menu);
      /* add element to menu */
      menuContainer.appendChild(thisProduct.element);

      //console.log(generatedHTML);
    }

    initAccordion(){
      const thisProduct = this;
      /* find the clickable trigger (the element that should react to clicking) */
      const buttonClicked = thisProduct.element.getElementsByClassName('product__icon')[0]; // document.getElementById(thisProduct.element);
      /* START: click event listener to trigger */
      buttonClicked.addEventListener('click', function(){

        /* prevent default action for event */
        console.log('clicked');

        /* find all active products */
        const products = document.querySelectorAll('.product.active');
        /* START LOOP: for each active product */
        if(products.length > 0) {
          for(const product in products){
            /* remove class active for the active product */
            products[product].classList.remove('active');
            /* END LOOP: for each active product */
          }
        }
        /* toggle active class on element of thisProduct */
        thisProduct.element.classList.add('active');
        /* END: click event listener to trigger */
      });
    //}
    }
  }
  
  console.log(Product);
  const app = {
    initMenu: function(){
      const thisApp = this;

      console.log('thisApp.data:', thisApp.data);

      for(let productData in thisApp.data.products){
        new Product(productData, thisApp.data.products[productData]);
      }
    },
    initData: function(){
      const thisApp = this;

      thisApp.data = dataSource;
    },
    init: function(){
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initData();
      thisApp.initMenu();
    },
  };

  app.initData();

  app.initMenu();

  app.init();
}
