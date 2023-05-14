import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import { profileSlice } from '~/Pages/Profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Avatar = ({ img }) => {
    const [avatarImage, setAvatarImage] = useState('');
    const dispatch = useDispatch();
    // const imageUpload = useSelector((state) => state.profileUser.image);
    // console.log(imageUpload);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        if (!file.type.startsWith('image/')) {
            console.log('File selected is not an image');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarImage(reader.result);
            localStorage.setItem('reduxStateImage', JSON.stringify(reader.result));
            dispatch(profileSlice.actions.uploadImage(reader.result));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <div className={cx('avatar-wrapper')}>
                <img className={cx('avatar')} src={avatarImage || img} alt="Avatar" />
                <div className={cx('overlay')}>
                    <label htmlFor="image-upload" className={cx('button')}>
                        Thay đổi
                    </label>
                    <input
                        id="image-upload"
                        //
                        hidden
                        className={cx('image-upload')}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Avatar;
