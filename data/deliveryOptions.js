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

export function calculateDeliveryDate(days) {
    const date = dayjs();
    let deliveryDate = date;
    let addedDays = 0;

    while (true) {
        if (addedDays === days) {
            return deliveryDate;
        }

        deliveryDate = deliveryDate.add(1, 'days');

        if (isWeekend(deliveryDate)) continue;

        addedDays++;
    }
}

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
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
