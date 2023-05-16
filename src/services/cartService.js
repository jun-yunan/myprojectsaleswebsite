import * as httpRequest from '~/utils/httpRequest';

export const addToCart = async (data) => {
    try {
        const response = await httpRequest.post('/carts/post/addToCart', data);
        return response;
    } catch (error) {
        console.error(error);
    }
};
