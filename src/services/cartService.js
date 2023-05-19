import * as httpRequest from '~/utils/httpRequest';

export const addToCart = async (data) => {
    try {
        const response = await httpRequest.post('/carts/addToCart', data);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getProductCart = async (userId) => {
    try {
        const response = await httpRequest.get('/carts/productInCart', {
            params: {
                userId: userId,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const decreaseQuantity = async (data) => {
    try {
        const response = await httpRequest.post('/carts/decreaseQuantity', data);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const increaseQuantity = async (data) => {
    try {
        const response = await httpRequest.post('/carts/increaseQuantity', data);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const deleteProduct = async (data) => {
    try {
        const response = await httpRequest.post('/carts/deleteProduct', data);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const totalPrice = async (data) => {
    try {
        const response = await httpRequest.post('/carts/totalPrice', data);
        return response;
    } catch (error) {
        console.error(error);
    }
};
