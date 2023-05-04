import classNames from 'classnames/bind';
import Header from '../Header/Header';
// import Sidebar from './SideBar/Sidebar';
import Footer from './Footer/Footer';
import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('sidebar')}>{/* <Sidebar /> */}</div>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
