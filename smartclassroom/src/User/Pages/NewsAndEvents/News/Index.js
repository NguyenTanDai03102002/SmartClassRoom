import React from 'react';
import News from '../Component/Index';
import Img from '../../../Component/Assets/Img/news-1.png';

function Index() {
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
        <div>
            <News data={dataNews} />
        </div>
    );
}

export default Index;
