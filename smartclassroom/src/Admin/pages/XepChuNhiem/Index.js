import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './xepchunhiem.module.scss';
import Button from '../../../Component/button/Button';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { Classes, Teachers, userToken } from '../../../redux/selectors';

const cx = classNames.bind(Styles);

function Index() {
    const { fecthClasses, fetchTeachers, putteacherstoclasses } = useHandleDispatch();
    const classes = useSelector(Classes);
    const token = useSelector(userToken);
    const teachers = useSelector(Teachers);
    const [selectedTeacher, setSelectedTeacher] = useState([]);
    const [finish, setFinish] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editingTeacherID, setEditingTeacherID] = useState(null);
    // const [selectedUpdate, setSelectedUpdate] = useState([]);

    useEffect(() => {
        fecthClasses();
        fetchTeachers(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTeacherChange = (classId, teacherId) => {
        const index = selectedTeacher.findIndex((item) => item.classId === classId);
        const newSelectedTeacher = [...selectedTeacher];
        if (index !== -1) {
            if (teacherId !== '') {
                newSelectedTeacher[index] = {
                    ...newSelectedTeacher[index],
                    teacherId: parseInt(teacherId),
                };
            } else {
                newSelectedTeacher.splice(index, 1);
            }
        } else {
            newSelectedTeacher.push({ classId: classId, teacherId: parseInt(teacherId) });
        }
        setSelectedTeacher(newSelectedTeacher);

        const selectedClassIds = newSelectedTeacher.map((item) => item.classId);
        const classesIds = classes.map((item) => item.id);
        setFinish(selectedClassIds.length === classesIds.length);
    };

    const handleSubmitAddTeachers = () => {
        putteacherstoclasses(selectedTeacher, token, setFinish, setEditing);
    };

    const handleEditTeacher = (classId, teacherId) => {
        setEditing(true);
        setEditingTeacherID(teacherId);

        const selectedTeacherForClass = selectedTeacher.find((teacher) => teacher.classId === classId);

        if (selectedTeacherForClass) {
            setSelectedTeacher([{ classId: classId, teacherId: selectedTeacherForClass.teacherId }]);
        } else {
            setSelectedTeacher([{ classId: classId, teacherId: teacherId }]);
        }
    };

    const handleHuy = () => {
        setEditing(false);
        setEditingTeacherID(null);
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

        const editTeachersList = teachers.filter((teacher) => {
            if (teacher.id === editingTeacherID) {
                return true;
            }
            return !classes.map((cl) => cl.teacher?.id).includes(teacher.id);
        });

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
                        {item.teacher && item.teacher.id ? (
                            editing && editingTeacherID === item.teacher.id ? (
                                <>
                                    <select
                                        className={cx('classDropdown')}
                                        onChange={(e) => handleTeacherChange(item.id, e.target.value)}
                                        value={selectedTeacherForClass ? selectedTeacherForClass.teacherId : ''}
                                    >
                                        {editTeachersList.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.maSo} - {option.fullName}
                                            </option>
                                        ))}
                                        {/* {selectedTeacherForClass && (
                                            <option
                                                // key={selectedTeacherForClass.teacherId}
                                                // value={selectedTeacherForClass.teacherId}
                                                hidden
                                            >
                                                {getTeacherName(selectedTeacherForClass.teacherId)}
                                            </option>
                                        )} */}
                                    </select>
                                    <Button className={cx('btn')} onClick={handleSubmitAddTeachers}>
                                        Lưu
                                    </Button>
                                    <Button className={cx('btn')} onClick={handleHuy}>
                                        Hủy
                                    </Button>
                                </>
                            ) : (
                                <div className={cx('gvcn')}>
                                    <div className={cx('information')}>
                                        {item.teacher.maSo} - {item.teacher.fullName}
                                    </div>
                                    <Button
                                        className={cx('edit')}
                                        onClick={() => handleEditTeacher(item.id, item.teacher.id)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            )
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
                                        hidden
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
                {finish && (
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
