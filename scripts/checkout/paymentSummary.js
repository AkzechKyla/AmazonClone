import {cart, getCartQuantity} from '../../data/cart.js'
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';

export function generatePaymentSalary() {
    console.log(`
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${getCartQuantity()}):</div>
        <div class="payment-summary-money">$${getItemsPrice().toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${getShippingFee().toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$47.74</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$4.77</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$52.51</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>`
    );
}

export function getItemsPrice() {
    let productPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
      });

    return productPriceCents / 100;
}

export function getShippingFee() {
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    return shippingPriceCents / 100;
}
