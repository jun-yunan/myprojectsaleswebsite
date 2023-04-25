// library
import classNames from "classnames/bind";

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
                        <div className={cx('icon-options')}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;