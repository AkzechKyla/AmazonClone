import {orders} from '../data/orders.js';
import {formatCurrency} from './utils/money.js';
import {products, loadProductsFetch, getProduct} from '../data/products.js';

function generateOrderPageHTML() {
    console.log('test');
    console.log(orders);
    let orderHTML = ''

    orders.forEach((order) => {
      console.log(products);
      console.log(order.products[0]);

      orderHTML += (`
        <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${generateOrderDetailsHTML(order.products)}
          </div>
        </div>
      `);
    });

    console.log(orderHTML);
    document.querySelector('.orders-grid').innerHTML = orderHTML;
}

function generateOrderDetailsHTML(orderProducts) {
  let orderDetailsHTML = '';
  let matchingProduct;

  orderProducts.forEach((product) => {
    matchingProduct = getProduct(product.productId);
    console.log(matchingProduct);

    orderDetailsHTML += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: June 17
        </div>
        <div class="product-quantity">
          Quantity: 2
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  console.log(orderProducts);
  return orderDetailsHTML;
}

function formatDate(date) {
  let orderDate = new Date(date);
  let orderDateFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric'
  }).format(orderDate);

  return orderDateFormatted;
}

await loadProductsFetch();
generateOrderPageHTML();
