import {cart, deleteProductToCart, getCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';

export function generateOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    let deliveryDate;

    deliveryOptions.forEach((deliveryOption) => {
      if (deliveryOption.id === cartItem.deliveryOptionId) {
        deliveryDate = getDeliveryDate(deliveryOption.deliveryDays, 'days');
      }
    });

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span
                class="update-quantity-link link-primary"
                onclick="window.updateItemQuantity('${matchingProduct.id}')"
              >
                Update
              </span>
              <input type="number" max="1000" min="1" value="${cartItem.quantity}" class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span
                class="save-quantity-link link-primary js-save-quantity-link-${matchingProduct.id}"
                onclick="window.saveItemQuantity('${matchingProduct.id}')"
                >Save</span>
              <span
                class="delete-quantity-link link-primary"
                onclick="window.deleteCartProduct('${matchingProduct.id}')"
              >
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${generateDeliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `
  });

  document.querySelector('.order-summary').innerHTML = cartSummaryHTML;
  updateCheckoutHeader();
}

function generateDeliveryOptionsHTML(matchingProduct, cartItem) {
  let deliveryOptionsHTML = '';

  deliveryOptions.forEach((deliveryOption) => {
    let deliveryDate = getDeliveryDate(deliveryOption.deliveryDays, 'days');
    let shippingPrice = `$${deliveryOption.priceCents / 100} - Shipping`;
    let isChecked = cartItem.deliveryOptionId === deliveryOption.id ? 'checked' : '' ;

    if (deliveryOption.priceCents === 0) {
      shippingPrice = 'FREE Shipping';
    }

    deliveryOptionsHTML += `
      <div
        class="delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}"
        onclick="window.updateDeliveryDate(this)"
      >
        <input type="radio" ${isChecked} class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${shippingPrice}
          </div>
        </div>
      </div>
    `;
  });

  return deliveryOptionsHTML;
}

function updateCheckoutHeader() {
  let cartQuantity = getCartQuantity();
  let itemText = cartQuantity === 0 ? "item" : "items";
  document.querySelector('.return-to-home-link').textContent = `${cartQuantity} ${itemText}`;
}

function getDeliveryDate(days, timeDescription) {
  const dateToday = dayjs();
  let deliveryDate = dateToday.add(days, timeDescription);

  return deliveryDate.format('dddd, MMMM D');
}

window.updateDeliveryDate = (option) => {
  const {productId, deliveryOptionId} = option.dataset;
  updateDeliveryOption(productId, deliveryOptionId);
  generateOrderSummary();
}

window.deleteCartProduct = (productId) => {
  deleteProductToCart(productId);
  generateOrderSummary();
  updateCheckoutHeader();
};

window.updateItemQuantity = (productId) => {
  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.add('is-editing-quantity');
}

window.saveItemQuantity = (productId) => {
  const inputQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
  const container = document.querySelector(`.js-cart-item-container-${productId}`);

  if (inputQuantity >= 0 && inputQuantity < 1000) {
    updateQuantity(productId, inputQuantity);
    updateCheckoutHeader();
    generateOrderSummary();
    container.classList.remove('is-editing-quantity');
  } else {
    alert('Quantity must be at least 0 and less than 1000');
  }
}
