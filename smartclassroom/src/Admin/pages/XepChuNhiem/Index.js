import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './xepchunhiem.module.scss';
import Button from '../../../Component/button/Button';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useDispatch, useSelector } from 'react-redux';
import { Classes, userToken } from '../../../redux/selectors';
import { getAllTeacher, putAllTeachersToClasses } from '../../../services/axios';
import { fetchAllClassesSuccess } from '../../../redux/actions';

const cx = classNames.bind(Styles);

function Index() {
    const dispatch = useDispatch();
    const { fecthClasses } = useHandleDispatch();
    const classes = useSelector(Classes);
    console.log(classes);
    const token = useSelector(userToken);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fecthClasses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await getAllTeacher(token);
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, [token]);

    const handleTeacherChange = (classId, teacherId) => {
        const existingIndex = selectedTeacher.findIndex((item) => item.classId === classId);
        if (existingIndex !== -1) {
            if (teacherId !== '') {
                const updateTeacherIdOfClassid = [...selectedTeacher];
                updateTeacherIdOfClassid[existingIndex] = {
                    ...updateTeacherIdOfClassid[existingIndex],
                    teacherId: parseInt(teacherId),
                };
                setSelectedTeacher(updateTeacherIdOfClassid);
            } else {
                setSelectedTeacher(selectedTeacher.filter((item) => item.classId !== classId));
            }
        } else {
            setSelectedTeacher([...selectedTeacher, { classId, teacherId: parseInt(teacherId) }]);
        }
    };

    const allClassesHaveTeacher = () => {
        for (let i = 0; i < classes.length; i++) {
            if (!selectedTeacher.find((teacher) => teacher.classId === classes[i].id)) {
                return false;
            }
        }
        return true;
    };

    const handleSubmitAddTeachers = () => {
        putAllTeachersToClasses(selectedTeacher, token)
            .then((reponse) => {
                dispatch(fetchAllClassesSuccess(reponse.data));
            })
            .catch((error) => {
                console.log(error);
            });
        setShow(false);
    };

    const tableheader = (
        <tr>
            <th className={cx('thstyles')}>Lớp</th>
            <th className={cx('thstyles')}>Khối</th>
            <th className={cx('thstyles')}>Giáo viên chủ nhiệm</th>
            <th className={cx('thstyles')}>Năm Học</th>
        </tr>
    );

    const tablecontent = classes.map((item) => {
        const selectedTeacherForClass = selectedTeacher.find((teacher) => teacher.classId === item.id);

        const remainingTeachers = teachers.filter(
            (teacher) => !selectedTeacher.some((selected) => selected.teacherId === teacher.id),
        );

        const getTeacherName = (teacherId) => {
            const teacher = teachers.find((teacher) => teacher.id === teacherId);
            return teacher ? `${teacher.maSo} - ${teacher.fullName}` : '';
        };
        return (
            <tr key={item.id} className={cx('table-row')}>
                <td className={cx('tdstyles')}>
                    <div className={cx('td-link')}>{item.name}</div>
                </td>
                <td className={cx('tdstyles')}>
                    <div className={cx('td-link')}>{item.block.name}</div>
                </td>
                <td className={cx('tdstyles')}>
                    <div className={cx('td-link')}>
                        {item.teacher && item.teacher.id && !show ? (
                            `${item.teacher.maSo} - ${item.teacher.fullName}`
                        ) : (
                            <select
                                className={cx('classDropdown')}
                                onChange={(e) => handleTeacherChange(item.id, e.target.value)}
                                value={selectedTeacherForClass ? selectedTeacherForClass.teacherId : ''}
                            >
                                <option value="">--chọn Giáo viên--</option>
                                {remainingTeachers.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.maSo} - {option.fullName}
                                    </option>
                                ))}
                                {selectedTeacherForClass && (
                                    <option
                                        key={selectedTeacherForClass.teacherId}
                                        value={selectedTeacherForClass.teacherId}
                                    >
                                        {getTeacherName(selectedTeacherForClass.teacherId)}
                                    </option>
                                )}
                            </select>
                        )}
                    </div>
                </td>
                <td className={cx('tdstyles')}>
                    <div className={cx('td-link')}>
                        {item.year} - {item.year + 1}
                    </div>
                </td>
            </tr>
        );
    });
    return (
        <>
            <div className={cx('wrapper')}>
                <h1>Sắp Xếp Giáo Viên Chủ Nhiệm</h1>
                <table className={cx('list-table')}>
                    <thead className={cx('table-header')}>{tableheader}</thead>
                    <tbody className={cx('table-content')}>{tablecontent}</tbody>
                </table>
                {allClassesHaveTeacher() && (
                    <div className={cx('submit')}>
                        <Button className={cx('btn')} onClick={handleSubmitAddTeachers}>
                            Hoàn Thành
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Index;
