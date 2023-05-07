import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

// import { Link } from 'react-router-dom';
import NextSignUp from './NextSignUp/NextSignUp';

const cx = classNames.bind(styles);

function SignUp({ children }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryAuth = searchParams.get('q');
    console.log(queryAuth);
    const navigate = useNavigate();

    const handleClickContinueSignUp = () => {
        // navigate('/authentication?q=continue-sign-up');
    };

    const handleSubmit = () => {
        navigate('/authentication?q=continue-sign-up');
    };

    return (
        <div className={cx('wrapper')}>
            {queryAuth === 'continue-sign-up' ? (
                <NextSignUp>Tiếp Tục Đăng Ký</NextSignUp>
            ) : (
                <form method="POST" className={cx('form-sign')} action="/authentication?continue-sign-up">
                    <h2 className={cx('title')}>{children}</h2>
                    <div className={cx('username', 'container')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                        <input className={cx('input-username')} type="text" name="username" required />
                        <label>Username</label>
                    </div>
                    <div className={cx('password', 'container')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                        <input type="email" name="email" required />
                        <label>Email</label>
                    </div>
                    <div className={cx('password', 'container')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                        <input type="password" name="password" required />
                        <label>Password</label>
                    </div>
                    <div className={cx('password', 'container')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                        <input type="password" required />
                        <label>Confirm password</label>
                    </div>
                    <div className={cx('button')}>
                        {/* <button
                        onClick={queryAuth === 'sign-in' ? () => {} : handleClickSignIn}
                        className={cx('sign-in')}
                        type="submit"
                    >
                        Đăng Nhập
                    </button>
                    <button onClick={handleClickSignUp} className={cx('sign-up')} type="submit">
                        Đăng Ký
                    </button> */}
                        <button
                            onClick={handleClickContinueSignUp}
                            onSubmit={handleSubmit}
                            className={cx('next-sign-up')}
                            type="submit"
                        >
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
