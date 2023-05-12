import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as productServices from '~/services/productService';
import { faDongSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';

// components
import PreviewProduct from '~/components/PreviewProduct/PreviewProduct';
import SimpleSlider from '~/components/SimpleSlider/SimpleSlider';
import Category from '~/components/Category/Category';

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

    // if (products && products.data) {
    //     console.log(products.data);
    // }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <SimpleSlider />
            </div>
            <div className={cx('category')}>
                <Category />
            </div>
            <div className={cx('ui-products')}>
                {products &&
                    products.data &&
                    products.data &&
                    products.data.map((product, index) => (
                        <PreviewProduct
                            key={index}
                            nameProduct={product.nameProduct}
                            image={product.image}
                            price={product.price}
                            id={product._id}
                        >
                            <FontAwesomeIcon icon={faDongSign} />
                        </PreviewProduct>
                    ))}
            </div>
        </div>
    );
}

export default Products;
