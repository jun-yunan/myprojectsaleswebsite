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
import axios from 'axios';
import { useState } from 'react';

// import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function NextSignUp({ children, data }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryAuth = searchParams.get('q');
    console.log(queryAuth);
    const navigate = useNavigate();

    // const handleClickSignUp = () => {};
    const [formData, setFormData] = useState({
        ...data,
        fullname: '',
        gender: '',
        date: '',
        numberPhone: '',
        address: '',
    });

    data && console.log(data);
    const handleChangeInput = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/users/checkLogin', formData);
            // navigate('/authentication?q=continue-sign-up');
        } catch (error) {
            // console.error(error);
        }
    };

    const handleBack = () => {
        navigate('/authentication?q=sign-up');
    };

    return (
        <div className={cx('wrapper')}>
            <button className={cx('back')} onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <form className={cx('form-sign')} onSubmit={handleSubmit}>
                <h2 className={cx('title')}>{children}</h2>
                <div className={cx('username', 'container')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                    <input
                        className={cx('input-username')}
                        type="text"
                        name="fullname"
                        required
                        onChange={handleChangeInput}
                    />
                    <label>Full name</label>
                </div>
                <div className={cx('password', 'container')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faVenusMars} />
                    <select name="gender" onChange={handleChangeInput}>
                        <option value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <label className={cx('gender')}>Gender</label>
                </div>
                <div className={cx('password', 'container')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faCalendarDays} />
                    <input type="date" name="date" required onChange={handleChangeInput} />
                    <label>Birthday</label>
                </div>
                <div className={cx('password', 'container')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faPhone} />
                    <input type="text" required name="numberPhone" onChange={handleChangeInput} />
                    <label>Number Phone</label>
                </div>
                <div className={cx('password', 'container')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faMapLocationDot} />
                    <input type="text" required name="address" onChange={handleChangeInput} />
                    <label>Address</label>
                </div>
                <div className={cx('button')}>
                    <button className={cx('sign-in')} type="submit">
                        Đăng Ký
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
