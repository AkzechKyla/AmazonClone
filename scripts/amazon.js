import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-add-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

document.querySelector('.products-grid').innerHTML = productsHTML;

document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const {productId} = button.dataset;

    addToCart(productId);
    updateCartQuantity();
    showAddedMessage(productId);
  });
});

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

// store timeouts for each product
let addedMessageTimeouts = {};

function showAddedMessage(productId) {
  const addMessage = document.querySelector(`.js-add-to-cart-${productId}`);

  // Clear the existing timeout for this product if it exists
  if (addedMessageTimeouts[productId]) {
    clearTimeout(addedMessageTimeouts[productId]);
  }

  addMessage.classList.add('visible');
  const timeoutId = setTimeout(() => {
    addMessage.classList.remove('visible');
    // Remove the timeout from the object once it has executed
    delete addedMessageTimeouts[productId];
  }, 2000);

  // Store the timeout ID for this product
  addedMessageTimeouts[productId] = timeoutId;
}
