import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as productServices from '~/services/productService';
import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import { faCartPlus, faDongSign, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// components
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function ProductDetails() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryIdProduct = searchParams.get('id');

    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.getProductById(queryIdProduct);
            setProduct(result);
        };
        fetchApi();
    }, [queryIdProduct]);

    if (product) {
        console.log(product.data);
    }

    return (
        <div className={cx('wrapper')}>
            {product && product.data && (
                <div className={cx('container')}>
                    <div className={cx('product')}>
                        <div className={cx('image')}>
                            <p className={cx('heart')}>
                                <FontAwesomeIcon icon={faHeart} />
                            </p>
                            <p className={cx('like')}>Yêu thích</p>
                            <div className={cx('wrapper-image')}>
                                <img src={product.data.image} alt="" />
                            </div>
                            <div className={cx('start')}>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                        </div>
                        <div className={cx('info-product')}>
                            <p className={cx('name')}>{product.data.nameProduct}</p>
                            <div className={cx('price')}>
                                <p>{product.data.price}</p>
                                <FontAwesomeIcon icon={faDongSign} />
                            </div>
                        </div>
                        <div className={cx('button')}>
                            <div className={cx('buy')}>
                                <Button primary buy>
                                    Mua Ngay
                                </Button>
                            </div>
                            <div className={cx('add-cart')}>
                                <Button outline cart>
                                    <FontAwesomeIcon icon={faCartPlus} />
                                    Thêm vào giỏ hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('description')}>
                        <span>Đặc điểm nổi bật</span>
                        <p>{product.data.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
