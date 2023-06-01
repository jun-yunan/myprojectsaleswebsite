import { faCircleCheck, faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './Notify.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Notify({ children, isError, checkLogin = false }) {
    const [hide, setHide] = useState(false);

    const handleClick = () => {
        setHide(true);
    };

    return (
        <>
            {hide ? (
                <></>
            ) : (
                <div className={cx('notification', { isError, checkLogin })}>
                    <button onClick={handleClick}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    {isError ? (
                        <FontAwesomeIcon icon={faCircleExclamation} className={cx('icon')} />
                    ) : (
                        <FontAwesomeIcon icon={faCircleCheck} className={cx('icon')} />
                    )}
                    <p>{children}</p>
                </div>
            )}
        </>
    );
}

export default Notify;
