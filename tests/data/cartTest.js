import {addToCart, cart} from '../../data/cart.js';

describe('Test Suite: addToCart', () => {
    beforeEach(() => {
        // Clear the cart array and spy on localStorage methods
        cart.length = 0;
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify(cart));

        // Create a mock element for quantity selector
        const mockQuantityInput = document.createElement('input');
        mockQuantityInput.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        mockQuantityInput.value = '1';
        document.body.appendChild(mockQuantityInput);
    });

    afterEach(() => {
        // Cleanup: remove the mock element from the DOM
        const mockQuantityInput = document.querySelector('.js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        if (mockQuantityInput) {
            document.body.removeChild(mockQuantityInput);
        }
    });

    it('Adds an existing product to the cart', () => {
        // Setup: Add a product to the cart
        cart.push({
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        });

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('Adds a new product to the cart', () => {
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});
