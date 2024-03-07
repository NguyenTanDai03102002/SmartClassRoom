import React from 'react';
import classNames from 'classnames/bind';
import Styles from './paginate.module.scss';
import Button from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Paginate({ totalPage, postsPerPage, currentPage, setCurrentPage }) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPage / postsPerPage); i++) {
        pages.push(i);
    }

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleNext = () => {
        if (currentPage < pages.length) setCurrentPage(currentPage + 1);
    };
    // const visiblePages = pages.slice(Math.max(0, currentPage - 2), Math.min(pages.length, currentPage + 1));

    return (
        <div className={cx('paginate-container')}>
            <div className={cx('pagination')}>
                <div className={cx('move')} onClick={handlePrev}>
                    <FontAwesomeIcon icon={faAngleLeft} className={cx('move-icon', { disabled: currentPage === 1 })} />
                </div>
                <div className={cx('pages')}>
                    {pages.map((page, index) => (
                        <Button
                            className={cx('page-btn', { active: page === currentPage })}
                            key={index}
                            onClick={() => {
                                setCurrentPage(page);
                            }}
                        >
                            {page}
                        </Button>
                    ))}
                </div>
                <div className={cx('move')} onClick={handleNext}>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className={cx('move-icon', { disabled: currentPage === pages.length })}
                    />
                </div>
            </div>
        </div>
    );
}

export default Paginate;
