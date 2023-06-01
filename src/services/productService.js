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
        console.error(error);
        throw error;
    }
};

export const getProductById = async (idProduct) => {
    try {
        const res = await httpRequest.get('/products/getById', {
            params: {
                idProduct,
            },
        });
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllProducts = async () => {
    try {
        const response = await httpRequest.get('/products/getAll');
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

class ProductService {
    async getProducts(limit) {
        try {
            const response = await httpRequest.get('/products', {
                params: {
                    limit,
                },
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const productService = new ProductService();
export default productService;
