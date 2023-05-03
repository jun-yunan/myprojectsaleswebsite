import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import classNames from 'classnames/bind';
import styles from './SimpleSlider.module.scss';

import './SimpleSlider.css';

const cx = classNames.bind(styles);

export default function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className={cx('wrapper')}>
            <Slider {...settings} autoplay={true} autoplaySpeed={3300}>
                <div>
                    <img src={process.env.PUBLIC_URL + 'Banner/638165128219834891_F-H1_800x300.png'} alt="" />
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + 'Banner/638179299155501768_F-H1_800x300.png'} alt="" />
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + 'Banner/638181254425011850_F-H1_800x300.png'} alt="" />
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + 'Banner/638183175738166902_F-H1_800x300.png'} alt="" />
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + 'Banner/638185372265181221_F-H1_800x300.png'} alt="" />
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + 'Banner/638187226176877712_F-H1_800x300.png'} alt="" />
                </div>
            </Slider>
        </div>
    );
}
