import React from 'react';
import classNames from 'classnames/bind';
import Styles from './paginate.module.scss';
import Button from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Paginate({ totalPages, currentPage, setCurrentPage }) {
    let pages = [];

    let startPage = Math.max(0, currentPage - 1);
    let endPage = Math.min(startPage + 2, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    const handleprev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className={cx('paginate-container')}>
            <div className={cx('pagination')}>
                <div className={cx('move')}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        onClick={handleprev}
                        className={cx('move-icon', { disabled: currentPage === 0 })}
                    />
                </div>
                <div className={cx('pages')}>
                    {currentPage >= totalPages - 2 && totalPages > 3 && <span className={cx('vv')}>. . .</span>}
                    {pages.map((page, index) => (
                        <Button
                            className={cx('page-btn', { active: page === currentPage })}
                            key={index}
                            onClick={() => {
                                setCurrentPage(page);
                            }}
                        >
                            {page + 1}
                        </Button>
                    ))}
                    {currentPage <= 1 && totalPages > 3 && <span className={cx('vv')}>. . .</span>}
                </div>
                <div className={cx('move')}>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        onClick={handleNext}
                        className={cx('move-icon', { disabled: currentPage === totalPages - 1 })}
                    />
                </div>
            </div>
        </div>
    );
}

export default Paginate;
