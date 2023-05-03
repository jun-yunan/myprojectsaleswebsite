import classNames from 'classnames/bind';
import styles from './PreviewProduct.module.scss';

const cx = classNames.bind(styles);

function PreviewProduct({ children, nameProduct, image, price }) {
    return (
        <ul className={cx('wrapper')}>
            <li className={cx('image')}>
                <img src={image} alt={nameProduct} />
            </li>
            <li className={cx('name')}>{nameProduct}</li>
            <li className={cx('price')}>
                {price}
                <p className={cx('icon-price')}>{children}</p>
            </li>
        </ul>
    );
}

export default PreviewProduct;
