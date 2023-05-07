import classNames from 'classnames/bind';
import styles from './Ex.module.scss';
import { useState } from 'react';

import SignIn from './SignIn/SignUp';
import SignUp from './SignUp/SignUp';

const cx = classNames.bind(styles);

function Ex() {
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sign-up', `${isActive ? 'active' : 'notActive'}`)}>
                <button onClick={handleClick}>{!isActive ? <SignUp /> : <SignIn />}</button>
            </div>
            <div className={cx('logo', `${isActive ? 'activeLogo' : 'notActiveLogo'}`)}>
                <h2>Logo</h2>
            </div>
        </div>
    );
}

export default Ex;
