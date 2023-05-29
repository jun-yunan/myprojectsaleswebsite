import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            {/* <h2>Footer</h2> */}
            <div className={cx('wrapper-support-pay')}>
                <div className={cx('support')}>
                    <h2>Tổng đài hỗ trợ miễn phí</h2>
                    <p>
                        Gọi mua hàng <span>1800.2097</span> (7h30 - 22h00)
                    </p>
                    <p>
                        Gọi khiếu nại <span>1800.2063</span> (8h00 - 21h30)
                    </p>
                    <p>
                        Gọi bảo hành <span>1800.2064</span> (8h00 - 21h00)
                    </p>
                </div>

                <div className={cx('pay')}>
                    <h2>Phương thức thanh toán</h2>
                    <div className={cx('logo-pay')}>
                        <img src={process.env.PUBLIC_URL + 'Pay/alepay-logo.png'} alt="" />
                        <img src={process.env.PUBLIC_URL + 'Pay/kredivo-logo.png'} alt="" />
                        <img src={process.env.PUBLIC_URL + 'Pay/moca-logo.png'} alt="" />
                        <img src={process.env.PUBLIC_URL + 'Pay/mpos-logo.png'} alt="" />
                        <img src={process.env.PUBLIC_URL + 'Pay/onepay-logo.png'} alt="" />
                        <img src={process.env.PUBLIC_URL + 'Pay/vnpay-logo.png'} alt="" />
                        <img src={process.env.PUBLIC_URL + 'Pay/zalopay-logo.png'} alt="" />
                    </div>
                </div>
            </div>

            <div className={cx('information-and-policy')}>
                <h2>Thông tin và chính sách</h2>
                <Link>Mua hàng và thanh toán online</Link>
                <Link>Mua hàng trả góp online</Link>
                <Link>Tra thông tin đơn hàng</Link>
                <Link>Tra điểm Smember</Link>
                <Link>Xem ưu đãi Smember</Link>
                <Link>Tra thông tin bảo hành</Link>
                <Link>Tra cứu hoá đơn điện tử</Link>
                <Link>Thông tin hoá đơn mua hàng</Link>
                <Link>Trung tâm bảo hành chính hãng</Link>
                <Link>Quy định về việc sao lưu dữ liệu</Link>
            </div>

            <div className={cx('service')}>
                <h2>Dịch vụ và thông tin khác</h2>
                <Link>Khách hàng doanh nghiệp (B2B)</Link>
                <Link>Ưu đãi thanh toán</Link>
                <Link>Quy chế hoạt động</Link>
                <Link>Chính sách Bảo hành</Link>
                <Link>Liên hệ hợp tác kinh doanh</Link>
                <Link>Tuyển dụng</Link>
                <Link>Dịch vụ bảo hành điện thoại</Link>
                <Link>Dịch vụ bảo hành mở rộng</Link>
            </div>

            <div className={cx('connect-with-us')}>
                <h2>Kết nối với chúng tôi</h2>
                <div className={cx('logo-social')}>
                    <img src="https://img.icons8.com/color/96/zalo.png" alt="zalo" />
                    <img src="https://img.icons8.com/color/96/youtube-play.png" alt="youtube-play" />
                    <img src="https://img.icons8.com/fluency/96/facebook-new.png" alt="facebook-new" />
                    <img src="https://img.icons8.com/ios-filled/100/tiktok--v1.png" alt="tiktok--v1" />
                    <img src="https://img.icons8.com/color/96/google-logo.png" alt="google-logo" />
                    <img src="https://img.icons8.com/color/96/instagram-new--v1.png" alt="instagram-new--v1" />
                    <img src="https://img.icons8.com/fluency/96/twitter.png" alt="twitter" />
                </div>
            </div>
        </div>
    );
}

export default Footer;
