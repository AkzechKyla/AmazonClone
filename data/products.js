import {formatCurrency} from '../scripts/utils/money.js';

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return ``;
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails); // calls the constructor of the parent class
    this.sizeChartLink = productDetails.sizeChartLink
  }

  extraInfoHTML() {
    return `
      <a href="../../${this.sizeChartLink}" target="_blank">Size Chart</a>
    `;
  }
}

class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
      <a href="../../${this.instructionsLink}" target="_blank">Instructions</a>
      <a href="../../${this.warrantyLink}" target="_blank">Warranty</a>
    `;
  }
}

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
      if (product.id === productId) {
         matchingProduct = product;
      }
  });

  return matchingProduct;
}

export let products = [];

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.type === 'appliance') {
        return new Appliance(productDetails);
      }

      return new Product(productDetails);
    });

    console.log('The products have been loaded.');
    fun(); // run the function after the response has loaded
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
