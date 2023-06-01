// library
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInSlice } from '~/Pages/UserAuthentication/components/SignIn/signInSlice';
import { profileSlice } from '~/Pages/Profile/profileSlice';
import { fetchGetUserLogin, headerSlice } from './headerSlice';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';

// font icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

// component
import styles from './Header.module.scss';
import Button from '~/components/Button/Button';
import SearchHeader from './SearchHeader/SearchHeader';

const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Selector
    const getLoginUser = useSelector((state) => state.header.getUser);
    const isUpdateInfoUser = useSelector((state) => state.profileUser.fetchUpdateUser.status);
    const isLoading = useSelector((state) => state.header.getUser.isLoading);

    // hook state
    const [currentLogin, setCurrentLogin] = useState(false);
    const [decode, setDecode] = useState('');

    const cookie = Cookies.get('token');

    useEffect(() => {
        if (currentLogin) {
            dispatch(fetchGetUserLogin(decode.username));
        }
    }, [currentLogin, decode.username, dispatch, isUpdateInfoUser]);

    useEffect(() => {
        if (getLoginUser.status) {
            dispatch(
                headerSlice.actions.getUserId({
                    userId: getLoginUser.response?.data?._id,
                    username: getLoginUser.response?.data?.username,
                }),
            );
        }
    }, [dispatch, getLoginUser.status]);

    useEffect(() => {
        if (cookie) {
            setCurrentLogin(true);
            const decoded = jwt_decode(cookie);
            setDecode(decoded);
        } else {
            setCurrentLogin(false);
            console.log('Token không tồn tại');
        }
    }, [cookie]);

    const handleLogOut = () => {
        Cookies.remove('token');
        setCurrentLogin(false);
        // sessionStorage.clear();
        dispatch(headerSlice.actions.resetStateHeader());
        dispatch(signInSlice.actions.resetInitialState());
        dispatch(profileSlice.actions.resetFetchGetUser());
        dispatch(profileSlice.actions.resetImageUpload());
        navigate('/authentication?q=sign-in');
    };

    function handleClick() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const handleClickResetState = () => {
        dispatch(profileSlice.actions.resetStatusUpdateUser());
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
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
                <div className={cx('title')}>
                    <p className={cx('text-logo')}>Online Shop</p>
                    <p className={cx('sub-text')}>Every product delivered to you.</p>
                </div>
            </Link>

            {/* search */}
            <div className={cx('search')}>
                <SearchHeader />
            </div>

            {/* account */}
            <div className={cx('account')}>
                <Link onClick={handleClick} to={'/cart'} className={cx('cart')}>
                    <FontAwesomeIcon icon={faCartShopping} className={cx('icon-cart')} />
                    {/* <p>Giỏ hàng</p> */}
                </Link>
                {currentLogin ? (
                    <TippyHeadless offset={[0, 15]} placement="bottom" interactive render={PreviewMenuOption}>
                        <div className={cx('wrapper-icon')}>
                            {isLoading ? (
                                <div className={cx('loading-avatar')}>
                                    <svg viewBox="25 25 50 50">
                                        <circle r="20" cy="50" cx="50"></circle>
                                    </svg>
                                </div>
                            ) : getLoginUser?.status && getLoginUser?.response?.data?.avatar ? (
                                <div className={cx('avatar')}>
                                    <img
                                        src={(getLoginUser.status && getLoginUser.response?.data?.avatar) || ''}
                                        alt=""
                                    />
                                </div>
                            ) : (
                                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                            )}
                            <p className={cx('title')}>{decode.username}</p>
                        </div>
                    </TippyHeadless>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
