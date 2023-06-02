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

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProductsByType } from './productSlice';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

function Products() {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryTypeProduct = searchParams.get('type');

    const productsByType = useSelector((state) => state.product.data);
    const isLoading = useSelector((state) => state.product.isLoading);
    // console.log(isLoading);
    // console.log(productsByType);

    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const result = await productServices.product(queryTypeProduct);
    //         setProducts(result);
    //         // console.log(result);
    //     };
    //     fetchApi();
    // }, [queryTypeProduct]);

    useEffect(() => {
        dispatch(fetchGetProductsByType(queryTypeProduct));
    }, [dispatch, queryTypeProduct]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <SimpleSlider />
            </div>
            <div className={cx('category')}>
                <Category />
            </div>
            <div className={cx('ui-products')}>
                {isLoading ? (
                    <div className={cx('loading')}>
                        <Loading />
                    </div>
                ) : (
                    productsByType?.products?.map((product, index) => (
                        <PreviewProduct
                            key={index}
                            nameProduct={product.nameProduct}
                            image={product.image}
                            price={product.price}
                            id={product._id}
                        >
                            <FontAwesomeIcon icon={faDongSign} />
                        </PreviewProduct>
                    ))
                )}
            </div>
        </div>
    );
}

export default Products;
