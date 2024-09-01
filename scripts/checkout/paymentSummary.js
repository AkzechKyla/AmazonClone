import {cart, getCartQuantity} from '../../data/cart.js'
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';

export function generatePaymentSummary() {
    const productPriceCents = calculateItemsPrice();
    const shippingPriceCents = calculateShippingFee();
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    console.log(document.querySelector('.payment-summary'));
    document.querySelector('.payment-summary').innerHTML = (`
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${getCartQuantity()}):</div>
        <div class="payment-summary-money">$${(productPriceCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${(shippingPriceCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${(totalBeforeTaxCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${(taxCents / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${(totalCents / 100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>`
    );
}

function calculateItemsPrice() {
    let productPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
      });

    return productPriceCents;
}

function calculateShippingFee() {
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    return shippingPriceCents;
}
