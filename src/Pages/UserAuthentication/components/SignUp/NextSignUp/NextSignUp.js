import classNames from 'classnames/bind';
import styles from './NextSignUp.module.scss';
import {
    faArrowLeft,
    faCalendarDays,
    faMapLocationDot,
    faPhone,
    faUser,
    faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

// import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function NextSignUp({ children }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryAuth = searchParams.get('q');
    console.log(queryAuth);
    const navigate = useNavigate();

    const handleClickSignUp = () => {};
    const handleClickSignIn = () => {
        navigate('/authentication?q=sign-in');
    };
    const handleBack = () => {
        navigate('/authentication?q=sign-up');
    };
    return (
        <div className={cx('wrapper')}>
            <button className={cx('back')} onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <form className={cx('form-sign')} action="/">
                <h2 className={cx('title')}>{children}</h2>
                <div className={cx('username', 'container')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                    <input className={cx('input-username')} type="text" name="fullname" required />
                    <label>Full name</label>
                </div>
                <div className={cx('password', 'container')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faVenusMars} />
                    <select name="gender">
                        <option value="" key=""></option>
                        <option value="male" key="">
                            Male
                        </option>
                        <option value="female" key="">
                            Female
                        </option>
                        <option value="other" key="">
                            Other
                        </option>
                    </select>
                    <label className={cx('gender')}>Gender</label>
                </div>
                <div className={cx('password', 'container')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faCalendarDays} />
                    <input type="date" name="date" required />
                    <label>Birthday</label>
                </div>
                <div className={cx('password', 'container')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faPhone} />
                    <input type="text" required name="numberPhone" />
                    <label>Number Phone</label>
                </div>
                <div className={cx('password', 'container')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faMapLocationDot} />
                    <input type="text" required name="address" />
                    <label>Address</label>
                </div>
                <div className={cx('button')}>
                    <button onClick={handleClickSignUp} className={cx('sign-in')} type="submit">
                        Đăng Ký
                    </button>
                    <button onClick={handleClickSignIn} className={cx('sign-up')} type="submit">
                        Đăng Nhập
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
        </div>
    );
}

export default NextSignUp;
