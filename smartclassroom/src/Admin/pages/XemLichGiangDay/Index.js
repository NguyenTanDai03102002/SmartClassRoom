import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './XemLich.module.scss';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { Teachs, authUser, userToken } from '../../../redux/selectors';
import { useHandleDispatch } from '../../../services/useHandleDispatch';

const cx = classNames.bind(Styles);

function Index() {
    const { getgiangdayByTeacherid } = useHandleDispatch();
    const token = useSelector(userToken);
    const user = useSelector(authUser);
    const teach = useSelector(Teachs);
    console.log(teach);

    useEffect(() => {
        getgiangdayByTeacherid(token, user.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getDayOfWeekName = (dayOfWeek) => {
        switch (dayOfWeek) {
            case 'MONDAY':
                return 'Thứ 2';
            case 'TUESDAY':
                return 'Thứ 3';
            case 'WEDNESDAY':
                return 'Thứ 4';
            case 'THURSDAY':
                return 'Thứ 5';
            case 'FRIDAY':
                return 'Thứ 6';
            case 'SATURDAY':
                return 'Thứ 7';
            case 'SUNDAY':
                return 'Chủ nhật';
        }
    };
    const columns = [
        { name: 'Thứ', selector: (row) => getDayOfWeekName(row.thu) },
        { name: 'lớp', selector: (row) => row.lop },
        { name: 'Môn', selector: (row) => row.mon },
        { name: 'tiết', selector: (row) => row.tiet },
    ];

    const data = teach.map((item) => ({
        thu: item.dayOfWeek,
        lop: item.classEntity.name,
        mon: item.subject.name,
        tiet: item.tiet,
    }));

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default Index;
