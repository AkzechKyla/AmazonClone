import {generateOrderSummary} from './checkout/orderSummary.js'
import {generatePaymentSummary} from './checkout/paymentSummary.js'
import {Cart, loadCart} from '../data/cart-class.js';
import '../data/backend-practice.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';

export const cart = new Cart('cart1');

// run multiple promises at the same time using Promise.all()
// sample: load product and cart at the same time


Promise.all([ // array of promises
    loadProductsFetch(), // use fetch returns promise directly
    new Promise((resolve) => {
        console.log('start loading cart');
        loadCart(() => {
            console.log('finished loading cart');
            resolve('value2');
        });
    })
]).then((values) => {
    console.log(values);
    generateOrderSummary();
    generatePaymentSummary();
});


/*
new Promise((resolve) => {
    console.log('start loading products');
    loadProducts(() => {
        console.log('finished loading products');
        resolve('value1'); // you can add parameter on resolve
    });
}).then((value) => {
    console.log(value);

    return new Promise((resolve) => {
        console.log('start loading cart');
        loadCart(() => {
            console.log('finished loading cart');
            resolve();
        });
    });
}).then(() => {
    console.log('generate order summary');
    generateOrderSummary();
    generatePaymentSummary();
});
*/

// Multiple callbacks cause a lot of nesting

/*
loadProducts(() => {
    loadCart(() => {
        generateOrderSummary();
        generatePaymentSummary();
    });
});
*/
