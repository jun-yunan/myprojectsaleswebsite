import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';
import { faAngleLeft, faDongSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchGetProductCart, cartSlice } from './cartSlice';
import { quantityIsCheckbox, totalProductIsChecked } from '~/storeRedux/selector';
import { userIdSelector } from '~/storeRedux/selector';

// components
import ProductItem from './components/ProductItem';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

function Cart() {
    const dispatch = useDispatch();
    const userId = useSelector(userIdSelector);
    const resultFetchGetProductCart = useSelector((state) => state.cart.getProductCart);
    const listProductCart = useSelector((state) => state.cart.getProductCart.response.listProduct);
    const cart = useSelector((state) => state.cart);
    const isLoading = useSelector((state) => state.cart.getProductCart.isLoading);

    const lengthIsCheckbox = useSelector(quantityIsCheckbox);

    const totalProductSelected = useSelector(totalProductIsChecked);

    useEffect(() => {
        dispatch(fetchGetProductCart(userId));
    }, [userId, dispatch]);

    const handleIsCheckboxAll = () => {
        dispatch(cartSlice.actions.toggleSelectAll());
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-cart')}>
                <div className={cx('wrapper-button-back')}>
                    <Link to={'/'} className={cx('button-back')}>
                        <FontAwesomeIcon icon={faAngleLeft} className={cx('icon')} />
                        <p>Trở về</p>
                    </Link>
                    <p className={cx('title-header')}>Giỏ Hàng Của Tôi</p>
                </div>
                <div className={cx('title')}>
                    <div className={cx('chose-product')}>
                        <input type="checkbox" hidden />
                    </div>
                    <div className={cx('product')}>
                        <p className={cx('text')}>Sản phẩm</p>
                    </div>
                    <div className={cx('price')}>
                        <p className={cx('text')}>Đơn Giá</p>
                    </div>
                    <div className={cx('quantity')}>
                        <p className={cx('text')}>Số lượng</p>
                    </div>
                    <div className={cx('operation')}>
                        <p className={cx('text')}>Thao tác</p>
                    </div>
                </div>
            </div>
            <div className={cx('body-cart')}>
                {isLoading ? (
                    <Loading />
                ) : (
                    resultFetchGetProductCart?.response?.listProduct?.map((product) => (
                        <ProductItem key={product._id} product={product} />
                    ))
                )}
                {listProductCart?.length === 0 && (
                    <div className={cx('cart-empty')}>
                        <h2>Không có sản phẩm nào được thêm vào giỏ hàng</h2>
                    </div>
                )}
            </div>
            <div className={cx('pay')}>
                <div className={cx('chose-all')}>
                    <input type="checkbox" checked={cart.selectAll} onChange={handleIsCheckboxAll} />
                    <p>Chọn tất cả</p>
                </div>
                <div className={cx('sum-price')}>
                    <p>
                        Tổng thanh toán ( {lengthIsCheckbox} sản phẩm ): {totalProductSelected}
                        <FontAwesomeIcon icon={faDongSign} className={cx('icon')} />
                    </p>
                </div>
                <button className={cx('btn-pay')}>Thanh Toán</button>
            </div>
        </div>
    );
}

export default Cart;
