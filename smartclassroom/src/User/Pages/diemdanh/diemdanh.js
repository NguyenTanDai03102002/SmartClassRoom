import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './diemdanh.module.scss';
import { Link } from 'react-router-dom';
import Button from '../../../Component/button/Button';

const cx = classNames.bind(Styles);

function Diemdanh() {
    const [selectedClass, setSelectedClass] = useState(''); // State để lưu trữ lớp được chọn
    const [selectedSession, setSelectedSession] = useState(''); // State để lưu trữ buổi được chọn
    const dataLop = [
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
    ];

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/students')
            .then((response) => response.json())
            .then((posts) => {
                if (selectedClass !== '') {
                    // Lọc danh sách học sinh theo lớp đã chọn
                    const filteredStudents = posts.filter((student) => student.lop_id === parseInt(selectedClass));
                    setPosts(filteredStudents); // Cập nhật danh sách học sinh mới
                }
            });
    }, [selectedClass]);
    const sessionOptions = ['Buổi sáng', 'Buổi chiều'];

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value); // Cập nhật lớp được chọn khi select box thay đổi
    };

    const handleSessionChange = (event) => {
        setSelectedSession(event.target.value); // Cập nhật buổi được chọn khi radio button thay đổi
    };

    const status = [
        { id: 1, name: 'có phép' },
        { id: 2, name: 'không phép' },
        { id: 3, name: 'đi muộn' },
    ];

    const [studentStatus, setStudentStatus] = useState([]);

    const handleStatusChange = (studentId, statusNameId, e) => {
        const existingIndex = studentStatus.findIndex((item) => item.studentId === studentId);

        if (existingIndex !== -1) {
            if (studentStatus[existingIndex].statusId === statusNameId) {
                const updatedStudentStatus = studentStatus.filter((item) => item.studentId !== studentId);
                setStudentStatus(updatedStudentStatus);
            } else {
                const updatedStudentStatus = [...studentStatus];
                updatedStudentStatus[existingIndex] = { studentId, statusId: statusNameId, session: selectedSession };
                setStudentStatus(updatedStudentStatus);
            }
        } else {
            setStudentStatus((prevStudentStatus) => [
                ...prevStudentStatus,
                { studentId, statusId: statusNameId, session: selectedSession },
            ]);
        }
        e.checked = !e.checked;
    };
    console.log(studentStatus);

    const tableheader = (
        <tr>
            <th className={cx('thstyles')}>Mã số học sinh</th>
            <th className={cx('thstyles')}>Họ Tên</th>
            {status.map((statusName, index) => (
                <th className={cx('thstyles')} key={index}>
                    {statusName.name}
                </th>
            ))}
        </tr>
    );
    const tablecontent = posts.map((item) => {
        return (
            <tr key={item.id} className={cx('table-row')}>
                <td className={cx('tdstyles')}>
                    <Link className={cx('td-link')}>{item.mahs}</Link>
                </td>
                <td className={cx('tdstyles')}>
                    <Link className={cx('td-link')}>{item.hoten}</Link>
                </td>
                {status.map((statusName, index) => (
                    <td className={cx('tdstyles')} key={index}>
                        <input
                            type="radio"
                            value={statusName.id}
                            onClick={(e) => handleStatusChange(item.id, statusName.id, e)}
                            checked={studentStatus.some(
                                (status) => status.studentId === item.id && status.statusId === statusName.id,
                            )}
                        />
                    </td>
                ))}
            </tr>
        );
    });
    return (
        <>
            <div className={cx('wrapper')}>
                <h1>Điểm danh </h1>
                <div className={cx('header')}>
                    <div>
                        <label htmlFor="classDropdown">Chọn lớp:</label>
                        <select className="classDropdown" onChange={handleClassChange}>
                            <option value="">--chọn lớp--</option>
                            {dataLop.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('radio')}>
                        <label>Chọn buổi:</label>
                        {sessionOptions.map((option, index) => (
                            <div key={index} className={cx('input')}>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={selectedSession === option}
                                    onChange={handleSessionChange}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <table className={cx('list-table')}>
                    <thead className={cx('table-header')}>{tableheader}</thead>
                    <tbody className={cx('table-content')}>{tablecontent}</tbody>
                </table>
                {Object.keys(studentStatus).length > 0 && (
                    <div className={cx('submit')}>
                        <Button className={cx('btn')}>Hoàn Thành</Button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Diemdanh;
