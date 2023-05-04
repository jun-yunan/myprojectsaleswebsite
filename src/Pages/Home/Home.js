import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import { faDongSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// components
import PreviewProduct from '~/components/PreviewProduct/PreviewProduct';
// import Banner from '~/components/Banner/Banner';
import SimpleSlider from '~/components/SimpleSlider/SimpleSlider';
import Category from '~/components/Category/Category';

const cx = classNames.bind(styles);

function Home() {
    const [courses, setCourses] = useState({});

    // call api
    useEffect(() => {
        fetch('http://localhost:3001/api/getProductAll')
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch(() => console.log('error'));
    }, []);

    if (courses && courses.data) {
        console.log(courses);
    }

    return (
        <div className={cx('wrapper')}>
            {/* <h2>Home Page</h2> */}
            <div className={cx('banner')}>
                {/* <Banner /> */}
                <SimpleSlider />
            </div>

            <div className={cx('category')}>
                <Category />
            </div>

            <div className={cx('product')}>
                <div className={cx('wrapper-product')}>
                    {courses &&
                        courses.data &&
                        courses.data.map((product, index) => (
                            <PreviewProduct
                                key={index}
                                nameProduct={product.nameProduct}
                                image={product.image}
                                price={product.price}
                            >
                                <FontAwesomeIcon icon={faDongSign} />
                            </PreviewProduct>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
