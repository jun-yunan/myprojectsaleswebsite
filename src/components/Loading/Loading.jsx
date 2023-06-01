import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('wrapper')}>
            <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
            </svg>
            <div data-text="Searching" className={cx('text')}>
                Loading...
            </div>
        </div>
    );
}

export default Loading;
