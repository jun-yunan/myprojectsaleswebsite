import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import * as usersService from '~/services/usersService';

// Components
import NextSignUp from './NextSignUp/NextSignUp';

const cx = classNames.bind(styles);

function SignUp({ children }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryAuth = searchParams.get('q');

    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        setFormData(data);
        const fetchApi = async () => {
            const result = await usersService.postSignUpUser(data);
            console.log(result);
            result && result.status === true
                ? alert('Đăng ký tài khoản thành công!')
                : alert('Đăng ký tài khoản thất bại!');
            navigate('/authentication?q=sign-in');
        };
        fetchApi();
    };

    return (
        <div className={cx('wrapper')}>
            {queryAuth === 'continue-sign-up' ? (
                <NextSignUp data={formData}>Tiếp Tục Đăng Ký</NextSignUp>
            ) : (
                // <form method="POST" className={cx('form-sign')} action="http://localhost:3001/api/users/checkLogin">
                <form className={cx('form-sign')} onSubmit={handleSubmit}>
                    <h2 className={cx('title')}>{children}</h2>
                    <div className={cx('username', 'container')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                        <input
                            className={cx('input-username')}
                            type="text"
                            name="username"
                            required
                            autoComplete="username"
                        />
                        <label>Username</label>
                    </div>
                    <div className={cx('password', 'container')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                        <input type="email" name="email" required autoComplete="email" />
                        <label>Email</label>
                    </div>
                    <div className={cx('password', 'container')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                        <input type="password" name="password" required autoComplete="password" />
                        <label>Password</label>
                    </div>
                    <div className={cx('password', 'container')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                        <input type="password" required autoComplete="password" />
                        <label>Confirm password</label>
                    </div>
                    <div className={cx('button')}>
                        <button className={cx('next-sign-up')} type="submit">
                            Tiếp Tục
                        </button>
                    </div>
                    <div className={cx('other-auth')}>
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
            )}
        </div>
    );
}

export default SignUp;
