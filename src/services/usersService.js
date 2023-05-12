import * as httpRequest from '~/utils/httpRequest';

export const getAllUser = async () => {
    try {
        const response = await httpRequest.get('/users/getAllUser');
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (username) => {
    try {
        const response = await httpRequest.get('/users/getUser', {
            params: {
                username,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const postSignUpUser = async (data) => {
    try {
        const response = await httpRequest.post('/users/createAccount', data);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const postSignInUser = async (data) => {
    try {
        const response = await httpRequest.post('/users/checkLogin', data);
        return response;
    } catch (error) {
        console.log(error);
    }
};
