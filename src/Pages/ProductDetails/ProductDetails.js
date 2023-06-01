import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as productServices from '~/services/productService';
import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import { faCartPlus, faDongSign, faHeart, faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddToCart, productDetailSlice } from './productDetailSlice';

// components
import Button from '~/components/Button/Button';
import Notify from '~/components/Notify/Notify';

const cx = classNames.bind(styles);

function ProductDetails() {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryIdProduct = searchParams.get('id');

    const responseFetchAddToCart = useSelector((state) => state.productDetail.addToCart);
    const getInfoUser = useSelector((state) => state.header.infoUser);
    const userId = useSelector((state) => state.header.infoUser.userId);
    const username = useSelector((state) => state.header.infoUser.username);
    const quantity = useSelector((state) => state.productDetail.quantity);

    // getInfoUser.status && console.log('getInfoUser: ', getInfoUser);
    const [product, setProduct] = useState({});
    const [showNotification, setShowNotification] = useState(false);
    // const [showMessageSuccess, setShowMessageSuccess] = useState(false);

    // console.log(showMessageSuccess);

    const handleAddToCart = () => {
        product &&
            product.data &&
            getInfoUser.status &&
            dispatch(
                fetchAddToCart({
                    productId: queryIdProduct,
                    userId,
                    username,
                    nameProduct: product.data.nameProduct,
                    quantity,
                }),
            );
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
            dispatch(productDetailSlice.actions.resetQuantity());
        }, 3000);
    };

    console.log('responseFetchAddToCart: ', responseFetchAddToCart);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.getProductById(queryIdProduct);
            setProduct(result);
        };
        fetchApi();
    }, [queryIdProduct]);

    // if (product && product.data) {
    //     console.log(product.data.nameProduct);
    // }

    const handleDecrease = () => {
        if (quantity > 1) {
            dispatch(productDetailSlice.actions.decrease());
        }
    };

    const handleIncrease = () => {
        dispatch(productDetailSlice.actions.increase());
    };

    return (
        <div className={cx('wrapper')}>
            {product && product.data && (
                <div className={cx('container')}>
                    {showNotification && <Notify>Thêm vào giỏ hàng thành công!!!</Notify>}
                    <div className={cx('product')}>
                        <div className={cx('image')}>
                            <p className={cx('heart')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </p>
                            <p className={cx('like')}>Yêu thích</p>
                            <div className={cx('wrapper-image')}>
                                <img src={product.data.image} alt="" />
                            </div>
                            <div className={cx('start')}>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                        </div>
                        <div className={cx('info-product')}>
                            <p className={cx('name')}>{product.data.nameProduct}</p>
                            <div className={cx('price')}>
                                <p>{product.data.price}</p>
                                <FontAwesomeIcon icon={faDongSign} />
                            </div>
                        </div>
                        <div className={cx('wrapper-button')}>
                            <div className={cx('wrapper-quantity')}>
                                <p>Số lượng</p>
                                <div className={cx('quantity')}>
                                    <button className={cx('decrease')} onClick={handleDecrease}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <span className={cx('number')}>{quantity}</span>
                                    <button className={cx('increase')} onClick={handleIncrease}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('button')}>
                                <div className={cx('buy')}>
                                    <Button primary buy>
                                        Mua Ngay
                                    </Button>
                                </div>
                                <div className={cx('add-cart')} onClick={handleAddToCart}>
                                    <Button outline cart>
                                        <FontAwesomeIcon icon={faCartPlus} />
                                        Thêm vào giỏ hàng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('description')}>
                        <span>Đặc điểm nổi bật</span>
                        <p>{product.data.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
