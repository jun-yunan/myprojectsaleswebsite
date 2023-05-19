import { createSelector } from '@reduxjs/toolkit';

export const totalPriceSelector = (state) => state.cart.totalPrice.result;
export const cartSelector = (state) => state.cart.getProductCart.response.listProduct;

export const totalProductIsChecked = createSelector(cartSelector, (cartProducts) => {
    const findProductIsChecked = cartProducts?.filter((product) => product.isChecked);

    if (!findProductIsChecked) return;

    const total = findProductIsChecked.reduce((acc, cur) => {
        const price = parseInt(cur.price.replace(/,/g, ''), 10);
        return acc + price * cur.quantity;
    }, 0);

    const formattedNumber = total?.toLocaleString('en-US', { useGrouping: true }) || '';

    return formattedNumber;
});

export const selectProductById = createSelector(
    [(state) => state.cart.getProductCart.response.listProduct, (_, productId) => productId],
    (products, productId) => products.find((product) => product._id === productId),
);
