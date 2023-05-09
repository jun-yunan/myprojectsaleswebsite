import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as usersService from '~/services/usersService';
import { useState } from 'react';

import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

function SignIn({ children }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryAuth = searchParams.get('q');
    console.log(queryAuth);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleOnchange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData) {
            console.log('Không có dữ liệu');
        }
        // formData && console.log(formData);
        const fetchApi = async () => {
            const result = await usersService.postSignInUser(formData);
            console.log('result: ', result);

            if (result.cookie) {
                Cookies.set(result.cookie.nameCookie, result.cookie.valueCookie);
                const cookie = Cookies.get(result.cookie.nameCookie);
                console.log('cookie: ', cookie);
                const decoded = jwt_decode(cookie);
                console.log('decoded: ', decoded);
            }
            result.status ? navigate('/') : alert(result.message);
        };

        fetchApi();
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-sign')} onSubmit={handleSubmit}>
                <h2 className={cx('title')}>{children}</h2>
                <div className={cx('username')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                    <input
                        className={cx('input-username')}
                        type="text"
                        name="username"
                        required
                        autoComplete="username"
                        onChange={handleOnchange}
                    />
                    <label>Username</label>
                </div>
                <div className={cx('password')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                    <input type="password" name="password" required autoComplete="password" onChange={handleOnchange} />
                    <label>Password</label>
                </div>
                <div className={cx('button')}>
                    <button className={cx('sign-in')} type="submit">
                        Đăng Nhập
                    </button>
                </div>
                <div className={cx('other-auth')}>
                    <Link>Quên mật khẩu?</Link>
                    <p className={cx('text')}>Hoặc</p>
                    <p className={cx('title-auth')}>Đăng nhập với</p>
                    <div className={cx('option')}>
                        <div className={cx('icon')}>
                            <img src="https://img.icons8.com/color/48/null/google-logo.png" alt="" />

                            <p>Google</p>
                        </div>
                        <div className={cx('icon')}>
                            <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" alt="" />
                            <p>Facebook</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
