import React from 'react';
import classNames from 'classnames/bind';
import Styles from './News.module.scss';
import Left from './Left/Index';
import Right from './Right/Index';
import Img from '../../../Component/Assets/Img/news-1.png';

const cx = classNames.bind(Styles);

function Index({ data }) {
    const dataNews = [
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
        {
            img: Img,
            date: '19/04/2023',
            title: 'VĂN BẰNG QUỐC GIA',
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
        {
            img: Img,
            date: '19/04/2023',
            title: 'VĂN BẰNG QUỐC GIA',
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
        {
            img: Img,
            date: '19/04/2023',
            title: 'VĂN BẰNG QUỐC GIA',
            description:
                'Có nên đến “lò” luyện thi cho phần đánh giá năng lực hằng năm? Khi kết quả của kỳ thi đánh giá năng lực (ĐGNL) được nhiều trường sử dụng để tuyển sinh đại học, cũng là lúc mà nhiều “lò” luyện thi năng lực trở nên rầm rộ. Dẫn đến việc các em học sinh cấp 3 đều “đổ xô” đến đây để ôn thi.',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('left')}>
                    <Left data={data} />
                </div>
                <div className={cx('right')}>
                    <Right data={dataNews} />
                </div>
            </div>
        </div>
    );
}

export default Index;
