import classNames from 'classnames/bind';
import styles from './PreviewProduct.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function PreviewProduct({ children, nameProduct, image, price, id }) {
    function handleClick() {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth',
        });
    }
    return (
        <Link to={{ pathname: '/product-details', search: `?id=${id}` }} onClick={handleClick}>
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
        </Link>
    );
}

export default PreviewProduct;
