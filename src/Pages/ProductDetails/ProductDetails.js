import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import { faCartPlus, faDongSign, faHeart, faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddToCart, fetchGetProductById, productDetailSlice } from './productDetailSlice';

// components
import Button from '~/components/Button/Button';
import Notify from '~/components/Notify/Notify';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

function ProductDetails() {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryIdProduct = searchParams.get('id');

    // const responseFetchAddToCart = useSelector((state) => state.productDetail.addToCart);
    const getInfoUser = useSelector((state) => state.header.infoUser);
    const userId = useSelector((state) => state.header.infoUser.userId);
    const username = useSelector((state) => state.header.infoUser.username);
    const quantity = useSelector((state) => state.productDetail.quantity);
    const productById = useSelector((state) => state.productDetail.getProductById.data?.product);
    const isLoading = useSelector((state) => state.productDetail.getProductById.isLoading);

    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = () => {
        productById &&
            getInfoUser.status &&
            dispatch(
                fetchAddToCart({
                    productId: queryIdProduct,
                    userId,
                    username,
                    nameProduct: productById?.nameProduct,
                    quantity,
                }),
            );
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
            dispatch(productDetailSlice.actions.resetQuantity());
        }, 3000);
    };

    useEffect(() => {
        dispatch(fetchGetProductById(queryIdProduct));
    }, [dispatch, queryIdProduct]);

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
            {isLoading ? (
                <Loading />
            ) : (
                productById && (
                    <div className={cx('container')}>
                        {showNotification && <Notify>Thêm vào giỏ hàng thành công!!!</Notify>}
                        <div className={cx('product')}>
                            <div className={cx('image')}>
                                <p className={cx('heart')}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </p>
                                <p className={cx('like')}>Yêu thích</p>
                                <div className={cx('wrapper-image')}>
                                    <img src={productById?.image} alt="" />
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
                                <p className={cx('name')}>{productById?.nameProduct}</p>
                                <div className={cx('price')}>
                                    <p>{productById?.price}</p>
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
                            <p>{productById?.description}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default ProductDetails;
