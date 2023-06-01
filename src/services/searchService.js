import * as httpRequest from '~/utils/httpRequest';

export const result = async () => {
    try {
        const response = await httpRequest.get('/search');
        return response;
    } catch (error) {
        console.error(error);
    }
};
