import * as httpRequest from '~/utils/httpRequest';

export const product = async (typeProduct) => {
    try {
        const res = await httpRequest.get('products/get', {
            params: {
                typeProduct,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
