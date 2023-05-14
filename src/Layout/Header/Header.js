// library
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInSlice } from '~/Pages/UserAuthentication/components/SignIn/signInSlice';
import { profileSlice } from '~/Pages/Profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';

// font icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

// component
import styles from './Header.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const imageUpload = useSelector((state) => state.profileUser.image);

    const navigate = useNavigate();

    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const storedState = localStorage.getItem('reduxStateImage');
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            // console.log(parsedState);
            setAvatar(imageUpload);
            dispatch(profileSlice.actions.restoreStateImage(parsedState));
        }
    }, [dispatch, imageUpload]);

    function handleClick() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const [currentLogin, setCurrentLogin] = useState(false);
    const [decode, setDecode] = useState('');
    const cookie = Cookies.get('token');
    // console.log(cookie);

    useEffect(() => {
        if (cookie) {
            setCurrentLogin(true);
            const decoded = jwt_decode(cookie);
            setDecode(decoded);
            // console.log(decode);
            // dispatch(fetchUser(decode.username));
        } else {
            setCurrentLogin(false);
            console.log('Token không tồn tại');
        }
    }, [cookie, dispatch]);

    const handleLogOut = () => {
        Cookies.remove('token');
        setCurrentLogin(false);
        dispatch(signInSlice.actions.resetInitialState());
        dispatch(profileSlice.actions.resetFetchGetUser());
        navigate('/authentication?q=sign-in');
    };

    const handleClickResetState = () => {
        dispatch(profileSlice.actions.resetStatusUpdateUser());
    };

    const PreviewMenuOption = (props) => {
        return (
            <div className={cx('menu')} tabIndex="-1" {...props}>
                <div className={cx('arrow')}></div>
                <div className={cx('item')} onClick={handleClickResetState}>
                    <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                    <Link to={{ pathname: '/profile', search: `?q=${decode.username}` }} className={cx('title')}>
                        Quản lý tài khoản
                    </Link>
                </div>
                <div className={cx('item')} onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faRightFromBracket} className={cx('icon')} />
                    <p className={cx('title')}>Đăng xuất</p>
                </div>
            </div>
        );
    };

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
                    <TippyHeadless offset={[0, 0]} placement="bottom" interactive render={PreviewMenuOption}>
                        <div className={cx('wrapper-icon')}>
                            <div className={cx('avatar')}>
                                <img src={avatar} alt="" />
                            </div>
                            {/* <FontAwesomeIcon icon={faUser} className={cx('icon')} /> */}
                            <p className={cx('title')}>{decode.username}</p>
                        </div>
                    </TippyHeadless>
                ) : (
                    <>
                        {/* current login false */}
                        <Link
                            to={{ pathname: '/authentication', search: '?q=sign-up' }}
                            className={cx('link')}
                            onClick={handleClick}
                        >
                            <Button outline>Đăng Ký</Button>
                        </Link>
                        <Link to={{ pathname: '/authentication', search: '?q=sign-in' }} onClick={handleClick}>
                            <Button primary>Đăng Nhập</Button>
                        </Link>

                        {/* <TippyHeadless
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
                        </TippyHeadless> */}
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
