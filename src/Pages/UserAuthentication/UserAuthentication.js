import { Link, useLocation } from 'react-router-dom';
// import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserAuthentication.module.scss';

// import * as usersService from '../../services/usersService';
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
    // const [users, setUsers] = useState([]);

    console.log(queryAuth);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const result = await usersService.getAllUser();
    //         setUsers(result);
    //     };

    //     fetchApi();
    // }, []);

    // users ? console.log(users) : console.log('error');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo', `${isActive ? 'activeLogo' : 'notActiveLogo'}`)}>
                <div className={cx('body')}>
                    <img src={process.env.PUBLIC_URL + 'logo1_prev_ui.png'} alt="" />
                    <div className={cx('title')}>
                        <p className={cx('text-logo')}>Online Shop</p>
                        <p className={cx('sub-text')}>Every product delivered to you.</p>
                    </div>
                </div>
                <Link
                    onClick={handleClick}
                    className={cx('btn-auth')}
                    to={`${queryAuth === 'sign-in' ? '/authentication?q=sign-up' : '/authentication?q=sign-in'}`}
                >
                    <span>{queryAuth === 'sign-up' ? 'Đăng Nhập' : 'Đăng Ký'}</span>
                </Link>
            </div>
            <div className={cx('auth', `${isActive ? 'activeAuth' : 'notActiveAuth'}`)}>
                {queryAuth === 'sign-in' ? <SignIn>Đăng Nhập</SignIn> : <SignUp>Đăng Ký</SignUp>}
            </div>
        </div>
    );
}

export default Login;
