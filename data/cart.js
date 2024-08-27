export const cart = [];

export function addToCart(productId) {
    const itemInCart = cart.find(item => item.productID === productId);
    const itemQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

    if (itemInCart) {
      itemInCart.quantity += Number(itemQuantity.value);
    } else {
      cart.push({
        productId,
        quantity: Number(itemQuantity.value)
      });
    }
  }
