import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Banner() {
    return (
        <div className={cx('wrapper')}>
            <button className={cx('back')}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <img src={process.env.PUBLIC_URL + 'Banner/638165128219834891_F-H1_800x300.png'} alt="" />
            <img src={process.env.PUBLIC_URL + 'Banner/638179299155501768_F-H1_800x300.png'} alt="" />
            <img src={process.env.PUBLIC_URL + 'Banner/638181254425011850_F-H1_800x300.png'} alt="" />
            <img src={process.env.PUBLIC_URL + 'Banner/638183175738166902_F-H1_800x300.png'} alt="" />
            <img src={process.env.PUBLIC_URL + 'Banner/638185372265181221_F-H1_800x300.png'} alt="" />
            <img src={process.env.PUBLIC_URL + 'Banner/638187226176877712_F-H1_800x300.png'} alt="" />
            <button className={cx('next')}>
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </div>
    );
}

export default Banner;
