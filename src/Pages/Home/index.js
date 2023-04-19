import classNames from 'classnames/bind';
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>Header</h2>
            </div>
        </div>
    );
}

export default Home;