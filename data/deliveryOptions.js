export function getDeliveryOption(productDeliveryOptionId) {
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if (productDeliveryOptionId === option.id) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOption[0];
}

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 11,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 5,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 3,
    priceCents: 999
}];
