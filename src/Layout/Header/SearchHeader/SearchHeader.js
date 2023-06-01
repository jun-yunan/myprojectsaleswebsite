import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';

import Loading from '~/components/Loading/Loading';

import styles from './SearchHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faDongSign, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchProduct, searchHeaderSlice } from './searchHeaderSlice';
import { searchResultRemaining, historySearchSelector } from '~/storeRedux/selector';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function SearchHeader() {
    const dispatch = useDispatch();
    const searchResult = useSelector(searchResultRemaining);
    // const response = useSelector((state) => state.searchHeader.searchResult);
    const isLoading = useSelector((state) => state.searchHeader.isLoading);
    const historySearch = useSelector(historySearchSelector);
    // console.log('historySearch: ', historySearch);

    // console.log(response);
    const inputRef = useRef();
    // const tippyInstance = useRef();

    const [searchText, setSearchText] = useState('');

    const debouncedValue = useDebounce(searchText, 500);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        if (debouncedValue !== '') {
            dispatch(fetchSearchProduct({ searchValue: debouncedValue }));
            dispatch(searchHeaderSlice.actions.addHistorySearch(debouncedValue));
        }
    }, [debouncedValue, dispatch]);

    useEffect(() => {
        if (!searchText) {
            dispatch(searchHeaderSlice.actions.resetSearchResult());
        }
    }, [dispatch, searchText]);

    const handleClick = () => {
        scroll.scrollToTop({
            duration: 500,
            smooth: true,
        });
    };

    const handleDeleteSearchText = () => {
        setSearchText('');
        inputRef.current.focus();
        // tippyInstance.current.show();
    };

    const PreviewResultSearch = (props) => {
        return (
            <>
                {searchText ? (
                    <div className={cx('list-result-search')}>
                        {searchResult?.length > 0 ? (
                            searchResult.map((item) => (
                                <Link
                                    to={`/product-details?id=${item._id}`}
                                    key={item._id}
                                    className={cx('item-search')}
                                    onClick={handleClick}
                                >
                                    <div className={cx('image-product')}>
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className={cx('info-product')}>
                                        <p className={cx('name-product')}>{item.nameProduct}</p>
                                        <p className={cx('price-product')}>
                                            {item.price}
                                            <FontAwesomeIcon icon={faDongSign} />
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className={cx('loading')}>
                                {isLoading ? (
                                    <Loading />
                                ) : (
                                    <div>
                                        <h2>Không tìm thấy sản phẩm</h2>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={cx('history-search')}>
                        <div className={cx('container')}>
                            <h2>Lịch sử tìm kiếm</h2>
                            {historySearch?.map((item, index) => (
                                <Link to={'/'} key={index} className={cx('item')}>
                                    <p className={cx('text')}>{item} </p>
                                    <p className={cx('icon')}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    };
    return (
        <div>
            <Tippy
                // reference={tippyInstance}
                offset={[0, 15]}
                placement="bottom"
                trigger="focusin"
                interactive
                render={PreviewResultSearch}
                // visible={false}
            >
                <div className={cx('wrapper-search')}>
                    <input
                        ref={inputRef}
                        value={searchText}
                        className={cx('search-product')}
                        onChange={handleSearchChange}
                        type="text"
                        placeholder="Tìm kiếm sản phẩm?..."
                    />
                    <div className={cx('icon')}>
                        {searchText && (
                            <div className={cx('icon-delete')} onClick={handleDeleteSearchText}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </div>
                        )}
                        {/* {isLoading && <FontAwesomeIcon icon={faSpinner} className={cx('icon-loading')} />} */}
                        <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default SearchHeader;
