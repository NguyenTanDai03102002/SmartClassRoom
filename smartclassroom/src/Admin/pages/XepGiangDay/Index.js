import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './XepGiangDay.module.scss';
import DataTable from 'react-data-table-component';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { Classes } from '../../../redux/selectors';
import { getallstudentsnopage } from '../../../services/axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Index() {
    const navigate = useNavigate();
    const { fecthClasses } = useHandleDispatch();
    const classes = useSelector(Classes);
    const [studentsCount, setStudentsCount] = useState({});

    useEffect(() => {
        fecthClasses(null, null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const counts = {};
            await Promise.all(
                classes.map(async (item) => {
                    try {
                        const response = await getallstudentsnopage(item.id);
                        counts[item.id] = response.data.length;
                    } catch (error) {
                        console.error('Error fetching siso:', error);
                        counts[item.id] = 0;
                    }
                }),
            );
            setStudentsCount(counts);
        };
        fetchData();
    }, [classes]);

    const columns = [
        {
            name: 'Lớp',
            selector: (row) => row.lop,
            cell: (row) => (
                <button className={cx('className')} onClick={() => handleRowClicked(row)}>
                    {row.lop}
                </button>
            ),
        },
        {
            name: 'Giáo viên chủ nhiệm',
            selector: (row) => row.teacher,
        },
        {
            name: 'Sỉ số',
            selector: (row) => row.siso,
        },
    ];

    const data = classes.map((item) => ({
        id: item.id,
        lop: item.name,
        teacher: item.teacher && item.teacher.fullName && item.teacher.fullName,
        siso: studentsCount[item.id] || 0,
    }));

    const handleRowClicked = (row) => {
        navigate(`/admin/xep-lich-Giang-Day/${row.id}`);
    };

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default Index;
