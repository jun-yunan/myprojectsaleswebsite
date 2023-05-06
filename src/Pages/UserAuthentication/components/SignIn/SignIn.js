import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SignIn({ children }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryAuth = searchParams.get('q');
    console.log(queryAuth);
    const navigate = useNavigate();

    const handleClickSignUp = () => {
        navigate('/authentication?q=sign-up');
    };

    const handleClickSignIn = () => {
        navigate('/authentication?q=sign-in');
    };
    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-sign')} action="/">
                <h2 className={cx('title')}>{children}</h2>
                <div className={cx('username')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                    <input className={cx('input-username')} type="text" name="username" required />
                    <label>Username</label>
                </div>
                <div className={cx('password')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                    <input type="password" name="password" required />
                    <label>Password</label>
                </div>
                <div className={cx('button')}>
                    <button
                        onClick={queryAuth === 'sign-in' ? () => {} : handleClickSignIn}
                        className={cx('sign-in')}
                        type="submit"
                    >
                        Đăng Nhập
                    </button>
                    <button onClick={handleClickSignUp} className={cx('sign-up')} type="submit">
                        Đăng Ký
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
