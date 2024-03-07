import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './item.module.scss';
import Button from '../../../../../Component/button/Button';
import Img from '../../../../Component/Assets/Img/news-1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Index() {
    const data = [
        {
            img: Img,
            date: '19/04/2023',
            title: 'Có nên đến lò luyện thi cho phần đánh giá năng lực hằng năm?',
            description:
                'Có nên đến “lò” luyện thi cho phần đánh giá năng lực hằng năm? Khi kết quả của kỳ thi đánh giá năng lực (ĐGNL) được nhiều trường sử dụng để tuyển sinh đại học, cũng là lúc mà nhiều “lò” luyện thi năng lực trở nên rầm rộ. Dẫn đến việc các em học sinh cấp 3 đều “đổ xô” đến đây để ôn thi.',
        },
        {
            img: Img,
            date: '19/04/2023',
            title: 'Có nên đến lò luyện thi cho phần đánh giá năng lực hằng năm?',
            description:
                'Có nên đến “lò” luyện thi cho phần đánh giá năng lực hằng năm? Khi kết quả của kỳ thi đánh giá năng lực (ĐGNL) được nhiều trường sử dụng để tuyển sinh đại học, cũng là lúc mà nhiều “lò” luyện thi năng lực trở nên rầm rộ. Dẫn đến việc các em học sinh cấp 3 đều “đổ xô” đến đây để ôn thi.',
        },
        {
            img: Img,
            date: '19/04/2023',
            title: 'Có nên đến lò luyện thi cho phần đánh giá năng lực hằng năm?',
            description:
                'Có nên đến “lò” luyện thi cho phần đánh giá năng lực hằng năm? Khi kết quả của kỳ thi đánh giá năng lực (ĐGNL) được nhiều trường sử dụng để tuyển sinh đại học, cũng là lúc mà nhiều “lò” luyện thi năng lực trở nên rầm rộ. Dẫn đến việc các em học sinh cấp 3 đều “đổ xô” đến đây để ôn thi.',
        },
        {
            img: Img,
            date: '19/04/2023',
            title: 'ĐIỀU KIỆN THI ĐẠI HỌC CHÍNH QUY',
            description:
                'Có nên đến “lò” luyện thi cho phần đánh giá năng lực hằng năm? Khi kết quả của kỳ thi đánh giá năng lực (ĐGNL) được nhiều trường sử dụng để tuyển sinh đại học, cũng là lúc mà nhiều “lò” luyện thi năng lực trở nên rầm rộ. Dẫn đến việc các em học sinh cấp 3 đều “đổ xô” đến đây để ôn thi.',
        },
        {
            img: Img,
            date: '19/04/2023',
            title: 'XÂY DỰNG TINH THẦN TỰ HỌC',
            description:
                'Có nên đến “lò” luyện thi cho phần đánh giá năng lực hằng năm? Khi kết quả của kỳ thi đánh giá năng lực (ĐGNL) được nhiều trường sử dụng để tuyển sinh đại học, cũng là lúc mà nhiều “lò” luyện thi năng lực trở nên rầm rộ. Dẫn đến việc các em học sinh cấp 3 đều “đổ xô” đến đây để ôn thi.',
        },
        {
            img: Img,
            date: '19/04/2023',
            title: 'VĂN BẰNG QUỐC GIA',
            description:
                'Có nên đến “lò” luyện thi cho phần đánh giá năng lực hằng năm? Khi kết quả của kỳ thi đánh giá năng lực (ĐGNL) được nhiều trường sử dụng để tuyển sinh đại học, cũng là lúc mà nhiều “lò” luyện thi năng lực trở nên rầm rộ. Dẫn đến việc các em học sinh cấp 3 đều “đổ xô” đến đây để ôn thi.',
        },
    ];

    const [currentpage, setCurrentpage] = useState(1);

    const itemsPerPage = 3;
    const startIndex = (currentpage - 1) * itemsPerPage;
    const endIndex = itemsPerPage + startIndex;
    const currentdata = data.slice(startIndex, endIndex);

    let pages = [];

    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const handlePrev = () => {
        setCurrentpage(currentpage - 1);
        if (currentpage === 1) {
            setCurrentpage(Math.ceil(data.length / itemsPerPage));
        }
    };

    const handleNext = () => {
        setCurrentpage(currentpage + 1);
        if (currentpage === Math.ceil(data.length / itemsPerPage)) {
            setCurrentpage(1);
        }
    };
    const autoChangePage = () => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        if (currentpage < totalPages) {
            setCurrentpage(currentpage + 1);
        } else {
            setCurrentpage(1);
        }
    };

    useEffect(() => {
        const timer = setTimeout(autoChangePage, 5000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentpage]);
    return (
        <div className={cx('wrapper')}>
            <Button className={cx('btn-prev')} onClick={handlePrev}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            {currentdata.map((item, index) => (
                <div className={cx('item')} key={index}>
                    <div className={cx('container')}>
                        <Button className={cx('content')} to="/">
                            <img src={item.img} alt="anh" />
                            <div className={cx('title')}>{item.title}</div>
                            <div className={cx('date')}>
                                <FontAwesomeIcon icon={faCalendarDays} className={cx('icon')} />
                                <span>{item.date}</span>
                            </div>
                            <div className={cx('description')}>{item.description}</div>
                        </Button>{' '}
                        <Button className={cx('more')} to="/">
                            Xem thêm
                        </Button>
                    </div>
                </div>
            ))}
            <Button className={cx('btn-next')} onClick={handleNext}>
                <FontAwesomeIcon icon={faArrowRight} />
            </Button>
            <div className={cx('pagination-dots')}>
                {pages.map((page, index) => (
                    <div
                        key={index}
                        className={cx('page-dot', {
                            active: page === currentpage,
                        })}
                        onClick={() => setCurrentpage(page)}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default Index;
