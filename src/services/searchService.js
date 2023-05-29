import * as httpRequest from '~/utils/httpRequest';

export const result = async (idProduct) => {
    try {
        const response = await httpRequest.post('search/result', idProduct);
        return response;
    } catch (error) {
        console.error(error);
    }
};
