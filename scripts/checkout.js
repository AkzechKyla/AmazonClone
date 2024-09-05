import {generateOrderSummary} from './checkout/orderSummary.js'
import {generatePaymentSummary} from './checkout/paymentSummary.js'
import {Cart} from '../../data/cart-class.js';

export const cart = new Cart('cart1');

generateOrderSummary();
generatePaymentSummary();
