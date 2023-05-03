import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <h2>Danh mục</h2>
            <div className={cx('list-menu')}>
                <ul>
                    <li>
                        <Link to={{ pathname: '/products', search: '?type=phone' }}>Điện thoại</Link>
                    </li>
                    <li>
                        <Link to={{ pathname: '/products', search: '?type=laptop' }}>Laptop</Link>
                    </li>
                    <li>
                        <Link to={{ pathname: '/products', search: '?type=tablet' }}>Máy tính bảng</Link>
                    </li>
                    <li>
                        <Link to={{ pathname: '/products', search: '?type=tivi' }}>Tivi</Link>
                    </li>
                    <li>
                        <Link to={{ pathname: '/products', search: '?type=earphone' }}>Tai nghe</Link>
                    </li>
                    <li>
                        <Link to={{ pathname: '/products', search: '?type=phone-components' }}>
                            Linh kiện điện thoại
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
