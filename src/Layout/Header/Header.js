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
import { faCartShopping, faMagnifyingGlass, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

// component
import styles from './Header.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Selector
    const getLoginUser = useSelector((state) => state.header.getUser);
    const isUpdateInfoUser = useSelector((state) => state.profileUser.fetchUpdateUser.status);
    const getAvatarUpload = useSelector((state) => state.header.avatar);
    // console.log(isUpdateInfoUser);

    console.log(getAvatarUpload);
    console.log(getLoginUser);

    // hook state
    const [currentLogin, setCurrentLogin] = useState(false);
    const [decode, setDecode] = useState('');

    const cookie = Cookies.get('token');

    useEffect(() => {
        if (currentLogin) {
            dispatch(fetchGetUserLogin(decode.username));
        }
    }, [currentLogin, decode.username, dispatch, isUpdateInfoUser]);

    console.log('getLoginUser: ', getLoginUser);

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
                            {getLoginUser.status && getLoginUser.response.data.avatar ? (
                                <div className={cx('avatar')}>
                                    <img
                                        src={
                                            (getLoginUser.status && getLoginUser.response.data.avatar) || ''
                                            // (imageUpload && isUpdateInfoUser)
                                        }
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
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
