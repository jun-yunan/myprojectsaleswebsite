import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as productServices from '~/services/productService';
import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';

// components

const cx = classNames.bind(styles);

function ProductDetails() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryIdProduct = searchParams.get('id');

    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.getProductById(queryIdProduct);
            setProduct(result);
        };
        fetchApi();
    }, [queryIdProduct]);

    if (product) {
        console.log(product.data);
    }

    return (
        <div className={cx('wrapper')}>
            {product && product.data && (
                <div className={cx('container')}>
                    <div className={cx('info-product')}>
                        <div className={cx('image')}>
                            <img src={product.data.image} alt="" />
                        </div>
                        <p>{product.data.nameProduct}</p>
                        <p>{product.data.price}</p>
                    </div>
                    <div className={cx('description')}>
                        <p>{product.data.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
