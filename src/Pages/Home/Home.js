import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect } from 'react';
import { faDongSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// components
import PreviewProduct from '~/components/PreviewProduct/PreviewProduct';
import SimpleSlider from '~/components/SimpleSlider/SimpleSlider';
import Category from '~/components/Category/Category';

// redux
import { fetchGetAllProduct } from './homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsSelector } from '~/storeRedux/selector';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const getAllProducts = useSelector(getAllProductsSelector);
    const isLoading = useSelector((state) => state.home.getAllProducts.isLoading);

    useEffect(() => {
        dispatch(fetchGetAllProduct());
    }, []);

    return (
        <div className={cx('wrapper')}>
            {/* <h2>Home Page</h2> */}
            <div className={cx('banner')}>
                {/* <Banner /> */}
                <SimpleSlider />
            </div>

            <div className={cx('category')}>
                <Category />
            </div>

            <div className={cx('product')}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className={cx('wrapper-product')}>
                        {getAllProducts?.data?.products?.map((product, index) => (
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
                )}
            </div>
        </div>
    );
}

export default Home;
