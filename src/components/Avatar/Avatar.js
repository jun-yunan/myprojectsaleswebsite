import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import { getUserSlice } from '~/Pages/Profile/profileSlice';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

const Avatar = ({ img }) => {
    const [avatarImage, setAvatarImage] = useState('');
    const dispatch = useDispatch();
    // const imageUpload = useSelector((state) => state.getUser.image);

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
            dispatch(getUserSlice.actions.uploadImage(reader.result));
        };
        reader.readAsDataURL(file);
    };

    // useEffect(() => {
    //     console.log('imageUpload: ', imageUpload);
    // }, [imageUpload]);

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
