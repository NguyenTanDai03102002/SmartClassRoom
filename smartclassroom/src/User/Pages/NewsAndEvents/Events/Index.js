import React from 'react';
import Events from '../Component/Index';
import Img from '../../../Component/Assets/Img/event-1.png';

function Index() {
    const dataEvents = [
        {
            img: Img,
            date: '19/04/2023',
            title: 'Giải bóng đá nam tại trường',
            description:
                'GIẢI BÓNG ĐÁ NAM VIỆT ÂU Chiều ngày 04/08/2022 vừa qua, trên sân bóng trường đã diễn ra LỄ KHAI MẠC Giải Bóng đá Chào mừng năm học mới trường THPT Việt Âu năm học 2022 – 2023. Buổi Lễ nhận được sự quan tâm từ phía HĐQT – BGH – Công đoàn trường, sự cổ vũ nhiệt tình của hơn 1000 cổ động viên toàn trường dành cho 29 đội bóng thi đấu. Sau phát động buổi lễ, trận thi đấu đầu tiên Khai mạc cho một mùa giải đầy kịch tính của 2 đội tuyển CĐ 12A5 vs CĐ 12D3 đã đem lại sự cuồng nhiệt hơn của các cổ động viên có mặt.',
        },
        {
            img: Img,
            date: '19/04/2023',
            title: 'Giải bóng đá nam tại trường',
            description:
                'GIẢI BÓNG ĐÁ NAM VIỆT ÂU Chiều ngày 04/08/2022 vừa qua, trên sân bóng trường đã diễn ra LỄ KHAI MẠC Giải Bóng đá Chào mừng năm học mới trường THPT Việt Âu năm học 2022 – 2023. Buổi Lễ nhận được sự quan tâm từ phía HĐQT – BGH – Công đoàn trường, sự cổ vũ nhiệt tình của hơn 1000 cổ động viên toàn trường dành cho 29 đội bóng thi đấu. Sau phát động buổi lễ, trận thi đấu đầu tiên Khai mạc cho một mùa giải đầy kịch tính của 2 đội tuyển CĐ 12A5 vs CĐ 12D3 đã đem lại sự cuồng nhiệt hơn của các cổ động viên có mặt.',
        },
        {
            img: Img,
            date: '19/04/2023',
            title: 'Giải bóng đá nam tại trường',
            description:
                'GIẢI BÓNG ĐÁ NAM VIỆT ÂU Chiều ngày 04/08/2022 vừa qua, trên sân bóng trường đã diễn ra LỄ KHAI MẠC Giải Bóng đá Chào mừng năm học mới trường THPT Việt Âu năm học 2022 – 2023. Buổi Lễ nhận được sự quan tâm từ phía HĐQT – BGH – Công đoàn trường, sự cổ vũ nhiệt tình của hơn 1000 cổ động viên toàn trường dành cho 29 đội bóng thi đấu. Sau phát động buổi lễ, trận thi đấu đầu tiên Khai mạc cho một mùa giải đầy kịch tính của 2 đội tuyển CĐ 12A5 vs CĐ 12D3 đã đem lại sự cuồng nhiệt hơn của các cổ động viên có mặt.',
        },
        {
            img: Img,
            date: '19/04/2023',
            title: 'Giải bóng đá nam tại trường',
            description:
                'GIẢI BÓNG ĐÁ NAM VIỆT ÂU Chiều ngày 04/08/2022 vừa qua, trên sân bóng trường đã diễn ra LỄ KHAI MẠC Giải Bóng đá Chào mừng năm học mới trường THPT Việt Âu năm học 2022 – 2023. Buổi Lễ nhận được sự quan tâm từ phía HĐQT – BGH – Công đoàn trường, sự cổ vũ nhiệt tình của hơn 1000 cổ động viên toàn trường dành cho 29 đội bóng thi đấu. Sau phát động buổi lễ, trận thi đấu đầu tiên Khai mạc cho một mùa giải đầy kịch tính của 2 đội tuyển CĐ 12A5 vs CĐ 12D3 đã đem lại sự cuồng nhiệt hơn của các cổ động viên có mặt.',
        },
    ];
    return (
        <div>
            <Events data={dataEvents} />
        </div>
    );
}

export default Index;
