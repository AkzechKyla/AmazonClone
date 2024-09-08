// import {cart, getCartQuantity} from '../../data/cart.js'
import {cart} from '../checkout.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/orders.js'

export function generatePaymentSummary() {
    const productPriceCents = calculateItemsPrice();
    const shippingPriceCents = calculateShippingFee();
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = (`
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${cart.getCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>`
    );

    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.place-order-button').addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // sending js object
                },
                body: JSON.stringify({ // actual data to send to the backend
                    cart: cart // need to convert to string
                })
            });

            const order = await response.json(); // get the data - order created by backend
            addOrder(order);
        } catch {
            console.log('Unexpected error. Try again later.');
        }
    });
}

function calculateItemsPrice() {
    let productPriceCents = 0;

    cart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
      });

    return productPriceCents;
}

function calculateShippingFee() {
    let shippingPriceCents = 0;

    cart.cartItems.forEach((cartItem) => {
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    return shippingPriceCents;
}
