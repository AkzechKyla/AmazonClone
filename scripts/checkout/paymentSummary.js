import {cart, getCartQuantity} from '../../data/cart.js'
import {getProduct} from '../../data/products.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';

export function generatePaymentSalary() {
    console.log(`
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${getCartQuantity()}):</div>
        <div class="payment-summary-money">$${getItemsPrice()}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${getShippingFee()}</div>
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
    let itemsPrice = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        itemsPrice += product.priceCents * cartItem.quantity;
      });

    return itemsPrice / 100;
}

export function getShippingFee() {
    let shippingFee = 0;

    cart.forEach((cartItem) => {
        let matchingDeliveryOption;
        deliveryOptions.forEach((option) => {
            if (cartItem.deliveryOptionId === option.id) {
                matchingDeliveryOption = option;
            }
        });

        shippingFee += matchingDeliveryOption.priceCents;
    });

    return shippingFee / 100;
}
