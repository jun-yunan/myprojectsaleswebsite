// library
import classNames from "classnames/bind";
// import Tippy from "@tippyjs/react";
import TippyHeadless from "@tippyjs/react/headless";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';

// font icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faEllipsisVertical, faMagnifyingGlass, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

// component
import styles from './Header.module.scss'
import Button from "~/components/Button/Button";
import { Link } from "react-router-dom";


const cx = classNames.bind(styles)

const menuList = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Quản lý tài khoản',
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: 'Đăng xuất'
    }
]

function Header() {

    const PreviewMenuOption = (props) => {
        return (
            <div className={cx('menu-item')} tabIndex='-1' {...props}>
                {menuList.map((item, index) => (
                    <button key={index} className={cx('item-btn')}>
                        <div className={cx('icon')}>{item.icon}</div>
                        <p className={cx('title')}>{item.title}</p>
                    </button>
                ))}
            </div>
        )
    }

    const currentLogin = false
    return (
        <header className={cx('header')}>
            {/* logo */}
            <Link to='/' className={cx('logo')}>
                <FontAwesomeIcon className={cx('icon-logo')} icon={faBagShopping} />
                <p className={cx('text-logo')}>Shopping</p>
            </Link>

            {/* search */}
            <div className={cx('search')}>
                <div className={cx('wrapper-search')}>
                    <input className={cx('search-product')} type="text" placeholder="Tìm kiếm sản phẩm?..." />
                    <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                </div>
            </div>

            {/* account */}
            <div className={cx('account')}>
                {currentLogin ? (
                    <>
                        {/* current login true */}
                    </>
                ) : (
                    <>
                        {/* current login false */}
                        <Button outline>Đăng Ký</Button>
                        <Button primary>Đăng Nhập</Button>
                        <TippyHeadless
                            // visible
                            offset={[0, 10]}
                            content="menu"
                            placement="bottom-start"
                            interactive
                            render={PreviewMenuOption}
                        >
                            <div className={cx('icon-options')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </div>
                        </TippyHeadless>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;