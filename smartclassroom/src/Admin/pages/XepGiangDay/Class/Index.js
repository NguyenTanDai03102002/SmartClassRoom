import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './Class.module.scss';
import DataTable from 'react-data-table-component';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { Subjects, Teachers, userToken } from '../../../../redux/selectors';
import Button from '../../../../Component/button/Button';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Index() {
    const { classid } = useParams();
    const { getallSubject, fetchTeachers, xepgiangday } = useHandleDispatch();
    const subjects = useSelector(Subjects);
    const teachers = useSelector(Teachers);
    const token = useSelector(userToken);
    const [selectedDay, setSelectedDay] = useState(2);
    const [selectedTiet, setSelectedTiet] = useState([]);
    const [dataTeach, setDataTeach] = useState([]);
    useEffect(() => {
        getallSubject();
        fetchTeachers(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            name: 'Môn',
            selector: (row) => row.mon,
        },
        {
            name: 'Giáo viên',
            cell: (row) => (
                <select className={cx('select')} onChange={(e) => handleChange(row.id, e.target.value)}>
                    <option className={cx('option')} value="">
                        -- Chọn giáo viên --{' '}
                    </option>
                    {teachers.map((item) => (
                        <option className={cx('option')} key={item.id} value={item.id}>
                            {item.maSo} - {item.fullName}
                        </option>
                    ))}
                </select>
            ),
        },
        {
            name: 'Tiết',
            cell: (row) => (
                <div className={cx('tiet')}>
                    {[...Array(9)].map((_, i) => {
                        const isActive = selectedTiet.some(
                            (item) => item.subjectId === row.id && item.tiet.includes(i + 1),
                        );
                        return (
                            <Button
                                className={cx('item-tiet', { active: isActive })}
                                key={i}
                                onClick={() => handleTietClick(row.id, i + 1)}
                            >
                                {i + 1}
                            </Button>
                        );
                    })}
                </div>
            ),
        },
    ];

    const data = subjects.map((item) => ({
        id: item.id,
        mon: item.name,
    }));

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setDataTeach([]);
    };

    const showSubmit = () => {
        return dataTeach.every((item) => item.subjectId !== null && item.tiet !== null);
    };

    const dayOfWeek = (dayNumber) => {
        switch (dayNumber) {
            case 2:
                return 'MONDAY';
            case 3:
                return 'TUESDAY';
            case 4:
                return 'WEDNESDAY';
            case 5:
                return 'THURSDAY';
            case 6:
                return 'FRIDAY';
            case 7:
                return 'SATURDAY';
            case 8:
                return 'SUNDAY';
            default:
                return null;
        }
    };

    const handleTietClick = (subjectId, i) => {
        const index = selectedTiet.findIndex((item) => item.subjectId === subjectId);
        const data = [...selectedTiet];
        if (index !== -1) {
            const tietIndex = data[index].tiet.indexOf(i);
            if (tietIndex !== -1) {
                data[index].tiet.splice(tietIndex, 1);
                if (data[index].tiet.length === 0) {
                    data.splice(index, 1);
                }
            } else {
                data[index].tiet.push(i);
            }
        } else {
            data.push({ subjectId: subjectId, tiet: [i] });
        }
        const datateach = dataTeach.findIndex((item) => item.subjectId === subjectId);
        if (datateach !== -1) {
            const a = data.find((item) => item.subjectId === subjectId);
            if (a) {
                dataTeach[datateach].tiet = a.tiet;
            } else {
                dataTeach[datateach].tiet = null;
            }
        }
        setSelectedTiet(data);
    };

    const handleChange = (id, teacherId) => {
        const index = dataTeach.findIndex((item) => item.subjectId === id);
        const currentYear = new Date().getFullYear();
        const data = [...dataTeach];
        const tiet = selectedTiet.find((item) => item.subjectId === id);

        if (index !== -1) {
            if (tiet) {
                data[index].tiet = tiet.tiet;
            } else {
                data[index].tiet = null;
            }
            if (teacherId === '') {
                data[index].teacherId = null;
            }
        } else {
            if (tiet) {
                data.push({
                    classEntityId: parseInt(classid),
                    subjectId: id,
                    teacherId: parseInt(teacherId),
                    dayOfWeek: dayOfWeek(selectedDay),
                    year: currentYear,
                    tiet: tiet.tiet,
                });
            } else {
                data.push({
                    classEntityId: parseInt(classid),
                    subjectId: id,
                    teacherId: parseInt(teacherId),
                    dayOfWeek: dayOfWeek(selectedDay),
                    year: currentYear,
                    tiet: null,
                });
            }
        }
        setDataTeach(data);
    };

    const handleSubmit = () => {
        xepgiangday(token, dataTeach);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <div className={cx('thu')}>
                    {[...Array(6)].map((_, i) => (
                        <Button
                            className={cx('item-thu', { active: selectedDay === i + 2 })}
                            key={i}
                            onClick={() => handleDayClick(i + 2)}
                        >
                            Thứ {i + 2}
                        </Button>
                    ))}
                </div>
                {dataTeach.length > 0 && showSubmit() && (
                    <Button className={cx('submit')} onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default Index;
