import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import { Link } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Category() {
    return (
        <div className={cx('wrapper')}>
            <h2>
                <FontAwesomeIcon icon={faBars} />
                <p>Danh mục</p>
            </h2>
            <div className={cx('list-category')}>
                <Link to={{ pathname: '/products', search: '?type=phone' }}>
                    <div className={cx('image')}>
                        <img src={process.env.PUBLIC_URL + 'Xoa phong/t_m_18-PhotoRoom.png-PhotoRoom.png'} alt="" />
                    </div>
                    <p>Điện thoại</p>
                </Link>

                <Link to={{ pathname: '/products', search: '?type=laptop' }}>
                    <div className={cx('image')}>
                        <img
                            src={process.env.PUBLIC_URL + 'Xoa phong/Apple-Macbook-Pro-Transparent-Image.png'}
                            alt=""
                        />
                    </div>
                    <p>Laptop</p>
                </Link>

                <Link to={{ pathname: '/products', search: '?type=tablet' }}>
                    <div className={cx('image')}>
                        <img src={process.env.PUBLIC_URL + 'Xoa phong/5_160_6-transformed.png'} alt="" />
                    </div>
                    <p>Máy tính bảng</p>
                </Link>

                <Link to={{ pathname: '/products', search: '?type=tivi' }}>
                    <div className={cx('image')}>
                        <img src={process.env.PUBLIC_URL + 'Xoa phong/1_74_38_1-transformed.png'} alt="" />
                    </div>
                    <p>Tivi</p>
                </Link>

                <Link to={{ pathname: '/products', search: '?type=earphone' }}>
                    <div className={cx('image')}>
                        <img src={process.env.PUBLIC_URL + 'Xoa phong/R-PhotoRoom.png-PhotoRoom.png'} alt="" />
                    </div>
                    <p>Tai nghe</p>
                </Link>

                <Link to={{ pathname: '/products', search: '?type=phone-components' }}>
                    <div className={cx('image')}>
                        <img src={process.env.PUBLIC_URL + 'Xoa phong/OIP-PhotoRoom.png-PhotoRoom.png'} alt="" />
                    </div>
                    <p>Phụ kiện Apple</p>
                </Link>
            </div>
        </div>
    );
}

export default Category;
