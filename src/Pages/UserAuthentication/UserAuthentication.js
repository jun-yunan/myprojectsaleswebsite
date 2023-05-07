import { useLocation } from 'react-router-dom';
// import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserAuthentication.module.scss';

//component
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Login() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryAuth = searchParams.get('q');

    const [isActive, setIsActive] = useState(false);

    console.log(queryAuth);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <div className={cx('body')}>
                    <img src={process.env.PUBLIC_URL + 'logo1_prev_ui.png'} alt="" />
                    <div className={cx('title')}>
                        <p className={cx('text-logo')}>Online Shop</p>
                        <p className={cx('sub-text')}>Every product delivered to you.</p>
                    </div>
                </div>
            </div>
            <div className={cx('auth')}>
                {queryAuth === 'sign-in' ? <SignIn signInLeft>Đăng Nhập</SignIn> : <SignUp>Đăng Ký</SignUp>}
            </div>
        </div>
    );
}

export default Login;
