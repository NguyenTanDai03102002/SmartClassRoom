import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './Lop.module.scss';
import Button from '../../../Component/button/Button';
// import { useLocation } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Lop() {
    const dataKhoi = localStorage.getItem('data');
    const [dataLop, setDataLop] = useState([
        { id: 1, name: '10A1', gvcv: 'Nguyễn Văn A', khoi_id: 1 },
        { id: 2, name: '10A2', gvcv: 'Nguyễn Văn B', khoi_id: 1 },
        { id: 3, name: '10A3', gvcv: 'Nguyễn Văn c', khoi_id: 1 },
        { id: 4, name: '10A4', gvcv: 'Nguyễn Văn d', khoi_id: 1 },
        { id: 5, name: '10A5', gvcv: 'Nguyễn Văn e', khoi_id: 1 },
        { id: 6, name: '10A6', gvcv: 'Nguyễn Văn f', khoi_id: 1 },
        { id: 7, name: '11A1', gvcv: 'Nguyễn Văn g', khoi_id: 2 },
        { id: 8, name: '11A2', gvcv: 'Nguyễn Văn h', khoi_id: 2 },
        { id: 9, name: '11A3', gvcv: 'Nguyễn Văn i', khoi_id: 2 },
        { id: 10, name: '11A4', gvcv: 'Nguyễn Văn j', khoi_id: 2 },
        { id: 11, name: '11A5', gvcv: 'Nguyễn Văn o', khoi_id: 2 },
        { id: 12, name: '11A6', gvcv: 'Nguyễn Văn p', khoi_id: 2 },
        { id: 13, name: '12A1', gvcv: 'Nguyễn Văn l', khoi_id: 3 },
        { id: 14, name: '12A2', gvcv: 'Nguyễn Văn m', khoi_id: 3 },
        { id: 15, name: '12A3', gvcv: 'Nguyễn Văn n', khoi_id: 3 },
        { id: 16, name: '12A4', gvcv: 'Nguyễn Văn q', khoi_id: 3 },
        { id: 17, name: '12A5', gvcv: 'Nguyễn Văn w', khoi_id: 3 },
        { id: 18, name: '12A6', gvcv: 'Nguyễn Văn z', khoi_id: 3 },
    ]);

    useEffect(() => {
        const khoi_id = parseInt(dataKhoi);
        const filteredDataLop = dataLop.filter((item) => item.khoi_id === khoi_id);
        setDataLop(filteredDataLop);
    }, [dataKhoi, dataLop]);

    const setLocalStorageData = (data) => {
        localStorage.setItem('id', data.id);
        localStorage.setItem('lop', data.name);
        localStorage.setItem('gvcv', data.gvcv);
    };

    return (
        <div className={cx('wrapper')}>
            <h1>CHỌN LỚP CẦN QUẢN LÝ</h1>
            <div className={cx('list-class')}>
                {dataLop.map((data, index) => (
                    <Button
                        key={index}
                        className={cx('item')}
                        onClick={() => setLocalStorageData(data)}
                        to="/admin/khoi/lop/hocsinh"
                    >
                        <div className={cx('item-name')}>{data.name}</div>
                        <div className={cx('item-gvcv')}>Giáo viên cố vấn : {data.gvcv} </div>
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Lop;
