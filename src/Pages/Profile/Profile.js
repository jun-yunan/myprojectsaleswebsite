// library
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchUser } from './profileSlice';

// font icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faEnvelope,
    faMapLocationDot,
    faPhone,
    faUser,
    faVenusMars,
} from '@fortawesome/free-solid-svg-icons';

// component
import Avatar from '~/components/Avatar/Avatar';

// scss
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);

function Profile() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryUsername = searchParams.get('q');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.signIn);

    useEffect(() => {
        dispatch(fetchUser(queryUsername));
    }, [dispatch, queryUsername]);

    const { username, password, avatar, email, fullName, gender, date, numberPhone, address } = user.data.getUser;

    const [formData, setFormData] = useState({
        username,
        avatar,
        email,
        fullName,
        gender,
        date,
        numberPhone,
        address,
    });

    console.log(formData.fullName);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    return (
        <div className={cx('wrapper')}>
            {user && user.data && (
                <>
                    <div className={cx('view-user')}>
                        <div className={cx('user')}>
                            <div className={cx('avatar')}>
                                <Avatar img={formData.avatar} />
                                {/* <img src={account.data.avatar} alt="" /> */}
                            </div>
                            <p>{formData.username}</p>
                        </div>
                        {/* <input type="file" /> */}
                        <div className={cx('options')}>
                            <h2>Tài khoản của tôi</h2>
                            <ul>
                                <li>Hồ sơ</li>
                                <li>Ngân hàng</li>
                                <li>Địa chỉ</li>
                                <li>Đổi mật khẩu</li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('wrapper-info-user')}>
                        <div className={cx('title')}>
                            <h2>Hồ sơ của tôi</h2>
                        </div>
                        <form className={cx('info-user')}>
                            {/* <p>{formData.username}</p> */}
                            <div className={cx('container', 'email')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                                <input
                                    onChange={handleChange}
                                    value={formData.email}
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                />
                                <label>Email</label>
                            </div>
                            <div className={cx('container', 'fullname')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                <input
                                    onChange={handleChange}
                                    value={formData.fullName}
                                    className={cx('')}
                                    type="text"
                                    name="fullName"
                                />
                                <label>Full name</label>
                            </div>
                            <div className={cx('container', 'gender')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faVenusMars} />
                                <select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <label className={cx('')}>Gender</label>
                            </div>
                            <div className={cx('container', 'date')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faCalendarDays} />
                                <input onChange={handleChange} value={formData.date} type="date" name="date" />
                                <label>Birthday</label>
                            </div>
                            <div className={cx('container', 'number-phone')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faPhone} />
                                <input
                                    onChange={handleChange}
                                    value={formData.numberPhone}
                                    type="text"
                                    name="numberPhone"
                                />
                                <label>Number Phone</label>
                            </div>
                            <div className={cx('container', 'address')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMapLocationDot} />
                                <input onChange={handleChange} value={formData.address} type="text" name="address" />
                                <label>Address</label>
                            </div>
                            <div className={cx('btn-submit')}>
                                <button type="submit">Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;
