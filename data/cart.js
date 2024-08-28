export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];
}

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    const itemInCart = cart.find(item => item.productId === productId);
    const itemQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

    if (itemInCart) {
      itemInCart.quantity += Number(itemQuantity.value);
    } else {
      cart.push({
        productId,
        quantity: Number(itemQuantity.value)
      });
    }

  saveToLocalStorage();
}

export function deleteProductToCart(productId) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cart.splice(cart.indexOf(cartItem), 1);
    }
  });

  saveToLocalStorage();
}
