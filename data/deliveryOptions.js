import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function getDeliveryOption(productDeliveryOptionId) {
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if (productDeliveryOptionId === option.id) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOption[0];
}

export function calculateDeliveryDate(days, timeDescription) {
    const dateToday = dayjs();
    let deliveryDate = dateToday;

    for (let i = 0; i <= days; i++) {
        deliveryDate = dateToday.add(i, timeDescription);
        if (isWeekend(deliveryDate)) {
            continue;
        }
    }

    return deliveryDate.format('dddd, MMMM D');
}

function isWeekend(date) {
    if (date.format('dddd') === 'Saturday' ||
    date.format('dddd') === 'Sunday') {
        return true;
    }
    return false;
}

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];
