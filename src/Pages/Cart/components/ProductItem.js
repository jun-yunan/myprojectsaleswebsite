import classNames from 'classnames/bind';
import styles from '../Cart.module.scss';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchHandleDecrease, fetchHandleIncrease, fetchDeleteProduct, cartSlice } from '../cartSlice';

const cx = classNames.bind(styles);

function ProductItem({ product, productId }) {
    console.log(productId);
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.header.infoUser.userId);

    const handleIncrease = (productId) => {
        dispatch(fetchHandleIncrease({ userId, productId }));
    };

    const handleDecrease = (productId, quantity) => {
        if (quantity > 1) {
            dispatch(fetchHandleDecrease({ userId, productId }));
        }
    };

    const handleDelete = (productId) => {
        dispatch(fetchDeleteProduct({ userId, productId }));
    };

    const handleIsCheckbox = async (productId) => {
        dispatch(cartSlice.actions.toggleCheckbox(productId));
    };
    return (
        <div className={cx('item')} key={product._id}>
            <div className={cx('chose-product')}>
                <input
                    type="checkbox"
                    checked={product.isChecked}
                    onChange={() => {
                        handleIsCheckbox(product._id);
                    }}
                />
            </div>
            <div className={cx('product')}>
                <img src={product.image} alt="" />
                <p className={cx('text-product')}>{product.nameProduct}</p>
            </div>
            <div className={cx('price')}>
                <p className={cx('text-product')}>{product.price}</p>
            </div>
            <div className={cx('quantity')}>
                <button className={cx('decrease')} onClick={() => handleDecrease(product._id, product.quantity)}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <p className={cx('text-product', 'number')}>{product.quantity}</p>
                <button className={cx('increase')} onClick={() => handleIncrease(product._id)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className={cx('operation')} onClick={() => handleDelete(product._id)}>
                <button>Xoá</button>
            </div>
        </div>
    );
}

export default ProductItem;
