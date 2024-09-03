import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('Test Suite: addToCart', () => {
    it('Adds an existing product to the cart', () => {
        // create mock to avoid saving test changes on localStorage
        spyOn(localStorage, 'setItem');

        // create a mock of localStorage data (object to mock [str], method [str])
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); // checks if localStorage is called; only works if mocked with spyOn
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });

    it('Adds a new product to the cart', () => {
        // create mock to avoid saving test changes on localStorage
        spyOn(localStorage, 'setItem');

        // create a mock of localStorage data (object to mock [str], method [str])
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]); // return an empty array string
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); // checks if localStorage is called; only works if mocked with spyOn
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});
