// library
import classNames from 'classnames/bind';
// import Tippy from "@tippyjs/react";
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';

// font icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBagShopping,
    faCartShopping,
    faEllipsisVertical,
    faMagnifyingGlass,
    faRightFromBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

// component
import styles from './Header.module.scss';
import Button from '~/components/Button/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const menuList = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Quản lý tài khoản',
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: 'Đăng xuất',
    },
];

function Header() {
    const PreviewMenuOption = (props) => {
        return (
            <div className={cx('menu-item')} tabIndex="-1" {...props}>
                {menuList.map((item, index) => (
                    <button key={index} className={cx('item-btn')}>
                        <div className={cx('icon')}>{item.icon}</div>
                        <p className={cx('title')}>{item.title}</p>
                    </button>
                ))}
            </div>
        );
    };

    const currentLogin = false;
    return (
        <header className={cx('header')}>
            {/* logo */}
            <Link to="/" className={cx('logo')}>
                <img src={process.env.PUBLIC_URL + 'logo1_prev_ui.png'} alt="" />
                {/* <FontAwesomeIcon className={cx('icon-logo')} icon={faBagShopping} /> */}
                <div className={cx('title')}>
                    <p className={cx('text-logo')}>Online Shop</p>
                    <p className={cx('sub-text')}>Every product delivered to you.</p>
                </div>
            </Link>

            {/* search */}
            <div className={cx('search')}>
                <div className={cx('wrapper-search')}>
                    <input className={cx('search-product')} type="text" placeholder="Tìm kiếm sản phẩm?..." />
                    <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                </div>
                <div className={cx('cart')}>
                    <FontAwesomeIcon icon={faCartShopping} className={cx('icon-cart')} />
                </div>
            </div>

            {/* account */}
            <div className={cx('account')}>
                {currentLogin ? (
                    <>{/* current login true */}</>
                ) : (
                    <>
                        {/* current login false */}
                        <Link to={{ pathname: '/authentication', search: '?q=sign-up' }} className={cx('link')}>
                            <Button outline>Đăng Ký</Button>
                        </Link>
                        <Link to={{ pathname: '/authentication', search: '?q=sign-in' }}>
                            <Button primary>Đăng Nhập</Button>
                        </Link>

                        <TippyHeadless
                            // visible
                            offset={[0, 10]}
                            content="menu"
                            placement="bottom-start"
                            interactive
                            render={PreviewMenuOption}
                        >
                            <div className={cx('icon-options')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} className={cx('icon')} />
                            </div>
                        </TippyHeadless>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
