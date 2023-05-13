// library
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

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

// action
import { fetchUser, fetchUpdateUser } from './profileSlice';

// scss
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);

function Profile() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryUsername = searchParams.get('q');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.getUser);
    const imageUpload = useSelector((state) => state.getUser.image);
    const responseFetchUpdateUser = useSelector((state) => state.getUser.responseFetchUpdateUser);

    const [formData, setFormData] = useState({
        username: '',
        avatar: '',
        email: '',
        fullName: '',
        gender: '',
        date: '',
        numberPhone: '',
        address: '',
        _id: '',
    });

    useEffect(() => {
        dispatch(fetchUser(queryUsername));
        let fetchGetUserData = {};
        if (user.status && user.fetchGetUser.status) {
            const { username, avatar, email, fullName, gender, date, numberPhone, address, _id } =
                user.fetchGetUser.data;
            fetchGetUserData = {
                username,
                avatar,
                email,
                fullName,
                gender,
                date,
                numberPhone,
                address,
                _id,
            };
            setFormData(fetchGetUserData);
        }
    }, [dispatch, queryUsername, user.status, user.fetchGetUser.status]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        const formUpdateUser = new FormData(event.target);
        const formUpdateUserData = Object.fromEntries(formUpdateUser.entries());

        console.log('formUpdateUserData: ', formUpdateUserData);

        dispatch(fetchUpdateUser(formUpdateUserData));
    };

    useEffect(() => {
        console.log('responseFetchUpdateUser: ', responseFetchUpdateUser);
        if (responseFetchUpdateUser.status) {
            responseFetchUpdateUser.data.status
                ? alert(responseFetchUpdateUser.data.message)
                : alert(responseFetchUpdateUser.data.message);
        }
    }, [responseFetchUpdateUser]);

    return (
        <div className={cx('wrapper')}>
            {formData && user && user.fetchGetUser && user.fetchGetUser.status && (
                <>
                    <div className={cx('view-user')}>
                        <div className={cx('user')}>
                            <div className={cx('avatar')}>
                                <Avatar img={formData.avatar} />
                                {/* <img src={account.data.avatar} alt="" /> */}
                            </div>
                            <p>{formData.username}</p>
                        </div>
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
                            <p>Cập nhật thông tin tài khoản</p>
                        </div>
                        <form className={cx('info-user')} onSubmit={handleSubmitForm}>
                            <input
                                type="text"
                                hidden
                                name="avatar"
                                defaultValue={imageUpload}
                                onChange={handleChange}
                            />
                            <input type="text" hidden name="_id" value={formData._id} onChange={handleChange} />
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
