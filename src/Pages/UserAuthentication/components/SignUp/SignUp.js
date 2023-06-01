import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateAccount } from './signUpSlice';

// Components
import NextSignUp from './NextSignUp/NextSignUp';
import Notify from '~/components/Notify/Notify';

const cx = classNames.bind(styles);

function SignUp({ children }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryAuth = searchParams.get('q');

    const createAccount = useSelector((state) => state.signUp);
    // const isCreateAccount = useSelector((state) => state.signUp.data?.status);

    console.log(createAccount);

    const [formData, setFormData] = useState({});
    const [showNotify, setShowNotify] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        setFormData(data);
        dispatch(fetchCreateAccount(data));
        setShowNotify(true);

        setTimeout(() => {
            setShowNotify(false);
            navigate('/authentication?q=sign-in');
        }, 2500);
    };
    return (
        <div className={cx('wrapper')}>
            {queryAuth === 'continue-sign-up' ? (
                <NextSignUp data={formData}>Tiếp Tục Đăng Ký</NextSignUp>
            ) : (
                <form className={cx('form-sign')} onSubmit={handleSubmit}>
                    {showNotify && (
                        <Notify isError={createAccount.data?.error || undefined}>{createAccount.data?.message}</Notify>
                    )}
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
