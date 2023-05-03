import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as productServices from '~/services/productService';
import PreviewProduct from '~/components/PreviewProduct/PreviewProduct';
import { faDongSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';

const cx = classNames.bind(styles);

function Products() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryTypeProduct = searchParams.get('type');

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.product(queryTypeProduct);
            setProducts(result);
            // console.log(result);
        };
        fetchApi();
    }, [queryTypeProduct]);

    if (products) {
        console.log(products.data);
    }

    return (
        <div className={cx('wrapper')}>
            {products &&
                products.data &&
                products.data.map((product, index) => (
                    <PreviewProduct
                        key={index}
                        nameProduct={product.nameProduct}
                        image={product.image}
                        price={product.price}
                    >
                        <FontAwesomeIcon icon={faDongSign} />
                    </PreviewProduct>
                ))}
        </div>
    );
}

export default Products;
