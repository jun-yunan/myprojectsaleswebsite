import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';

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
        // console.log(courses.data.image);
    }

    return (
        <div className={cx('wrapper')}>
            {/* <h2>Home Page</h2> */}
            <div className={cx('banner')}>Banner</div>
            <div className={cx('product')}>
                {courses && courses.data && (
                    <div>
                        <ul>
                            <li>{courses.data.nameProduct}</li>
                            <li>{courses.data.description}</li>
                            <li>{courses.data.price}</li>
                            <li>
                                <img src={courses.data.image} alt="" />
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
