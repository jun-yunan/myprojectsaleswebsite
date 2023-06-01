import { createSelector } from '@reduxjs/toolkit';

export const totalPriceSelector = (state) => state.cart.totalPrice.result;
export const cartSelector = (state) => state.cart.getProductCart.response.listProduct;
export const updateQuantitySelector = (state) => state.cart.updateQuantity.response;
export const userIdSelector = (state) => state.header.infoUser.userId;
export const searchTextSelector = (state) => state.searchHeader.searchValue;
export const searchResultSelector = (state) => state.searchHeader.searchResult?.result;
export const historySearchSelector = (state) => state.searchHeader.historySearch;
export const getAllProductsSelector = (state) => state.home.getAllProducts;

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

export const quantityIsCheckbox = createSelector(cartSelector, (cartProducts) => {
    const findProductIsChecked = cartProducts?.filter((product) => product.isChecked);

    if (!findProductIsChecked) return;

    return findProductIsChecked.length;
});

export const searchValueRemaining = createSelector(searchTextSelector, (searchValue) => {
    return searchValue;
});

export const searchResultRemaining = createSelector(searchResultSelector, (searchResult) => {
    return searchResult;
});
