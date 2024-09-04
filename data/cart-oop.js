function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

            if (!this.cartItems) {
                this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
              }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '1'
              }];
            }
        },

        saveToLocalStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        addToCart(productId) {
            const itemInCart = this.cartItems.find(item => item.productId === productId);
            const itemQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

            if (itemInCart) {
              itemInCart.quantity += Number(itemQuantity.value);
            } else {
              this.cartItems.push({
                productId,
                quantity: 1,
                deliveryOptionId: '1'
              });
            }

          this.saveToLocalStorage();
        },

        deleteProductToCart(productId) {
            this.cartItems.forEach((cartItem) => {
              if (cartItem.productId === productId) {
                this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
              }
            });

            this.saveToLocalStorage();
        },

        getCartQuantity() {
            let cartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
              cartQuantity += cartItem.quantity;
            });
            return cartQuantity;
        },

        updateQuantity(productId, newQuantity) {
            this.cartItems.forEach((cartItem) => {
              if (cartItem.productId === productId) {
                cartItem.quantity = newQuantity;
              }
            });

            this.saveToLocalStorage();
        },

        updateDeliveryOption(productId, deliveryOptionId) {
            this.cartItems.forEach((cartItem) => {
              if (cartItem.productId === productId) {
                cartItem.deliveryOptionId = deliveryOptionId;
              }
            });

            this.saveToLocalStorage();
        }
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

businessCart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

console.log(cart);
console.log(businessCart);
