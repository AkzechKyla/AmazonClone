import {generateOrderSummary} from './checkout/orderSummary.js'
import {generatePaymentSummary} from './checkout/paymentSummary.js'
import {Cart, loadCart} from '../data/cart-class.js';
import '../data/backend-practice.js';
import {loadProducts} from '../data/products.js';

export const cart = new Cart('cart1');

new Promise((resolve) => {
    console.log('start loading products');
    loadProducts(() => {
        console.log('finished loading products');
        resolve();
    });
}).then(() => {
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

// Multiple callbacks cause a lot of nesting
loadProducts(() => {
    loadCart(() => {
        generateOrderSummary();
        generatePaymentSummary();
    });
});
