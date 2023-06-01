// React
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCheckLogin } from './signInSlice';
import { useDispatch, useSelector } from 'react-redux';

// mui
// import { Alert, AlertTitle, Button } from '@mui/material';
import Notify from '~/components/Notify/Notify';

// FONT ICON
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// scss
import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
const cx = classNames.bind(styles);

function SignIn({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchCheckLoginResult = useSelector((state) => state.signIn);
    // console.log(fetchCheckLoginResult);

    const isLogin = useSelector((state) => state.signIn.data?.status);

    const searchParams = new URLSearchParams(location.search);
    const queryAuth = searchParams.get('q');
    // console.log(queryAuth);

    const [showNotify, setShowNotify] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleOnchange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // console.log(formData);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData) {
            alert('Không có dữ liệu');
        }
        dispatch(fetchCheckLogin(formData));
    };

    useEffect(() => {
        if (fetchCheckLoginResult.status) {
            if (fetchCheckLoginResult?.data?.status) {
                navigate('/');
            } else {
                // alert(fetchCheckLoginResult?.data?.message);
                setShowNotify(true);

                setTimeout(() => {
                    setShowNotify(false);
                }, 2500);
            }
        }
    }, [fetchCheckLoginResult.data?.status, fetchCheckLoginResult.status, navigate]);

    return (
        <div className={cx('wrapper')}>
            {showNotify && (
                <div>
                    <Notify checkLogin isError={!isLogin || undefined}>
                        {fetchCheckLoginResult?.data?.message || 'Tài khoản hoặc mật khẩu không hợp lệ!!!'}
                    </Notify>
                </div>
            )}
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
