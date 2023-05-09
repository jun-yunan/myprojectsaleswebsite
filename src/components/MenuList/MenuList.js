// library
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import Cookies from 'js-cookie';

// font icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

// component
import styles from './MenuList.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuList({ children }) {
    const navigate = useNavigate();
    const handleClick = () => {
        Cookies.remove('token');
        navigate('/');
    };

    const PreviewMenuOption = (props) => {
        return (
            <div className={cx('menu')} tabIndex="-1" {...props}>
                <div className={cx('arrow')}></div>
                <div className={cx('item')}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <p className={cx('title')}>Quản lý tài khoản</p>
                </div>
                <div className={cx('item')} onClick={handleClick}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </div>
                    <p className={cx('title')}>Đăng xuất</p>
                </div>
            </div>
        );
    };
    return (
        <Tippy offset={[0, 0]} placement="bottom" interactive render={PreviewMenuOption}>
            <div className={cx('wrapper')}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                <p className={cx('title')}>{children}</p>
            </div>
        </Tippy>
    );
}

export default MenuList;
