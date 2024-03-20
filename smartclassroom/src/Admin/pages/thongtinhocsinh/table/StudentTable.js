import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Styles from './table.module.scss';
import Menu from '../../../../Component/popper/Menu/Menu';
import { useSelector } from 'react-redux';
import Paginate from '../../../../Component/paginate/paginate';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { userToken } from '../../../../redux/selectors';

const cx = classNames.bind(Styles);

function StudentTable({ dataStudents, idlop, keyword }) {
    const { getallstudentsofclass, deleteUserfromClass } = useHandleDispatch();
    const totalPages = useSelector((state) => state.student.totalPages);
    const token = useSelector(userToken);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getallstudentsofclass(idlop, currentPage, null, null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handleDelete = (id) => {
        deleteUserfromClass(id, idlop, token, currentPage, keyword);
    };
    const handleEdit = (id) => {
        console.log(id);
    };
    const handleDetail = (id) => {
        console.log(id);
    };

    const getMenuItems = (id) => [
        {
            icon: <FontAwesomeIcon icon={faDeleteLeft} />,
            title: 'Delete',
            onclick: () => handleDelete(id),
        },
        {
            icon: <FontAwesomeIcon icon={faEdit} />,
            title: 'Edit',
            onclick: () => handleEdit(id),
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Detail',
            onclick: () => handleDetail(id),
        },
    ];

    const tablecontent = dataStudents.map((item) => {
        const MenuItems = getMenuItems(item.id);
        return (
            <tr key={item.id} className={cx('table-row')}>
                <td className={cx('tdstyles')}>{item.maSo}</td>
                <td className={cx('tdstyles')}>{item.fullName}</td>
                <td className={cx('tdstyles')}>{item.sex === 0 ? 'Nam' : 'Nữ'}</td>
                <td className={cx('tdstyles')}>{item.birthday}</td>
                <td className={cx('tdstyles')}>{item.address}</td>
                <td className={cx('tdstyles')}>
                    <Menu items={MenuItems} crud>
                        <div className={cx('menu-name')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </div>
                    </Menu>
                </td>
            </tr>
        );
    });
    return (
        <>
            <table className={cx('list-table')}>
                <thead className={cx('table-header')}>
                    <tr>
                        <th className={cx('thstyles')}>Mã số học sinh</th>
                        <th className={cx('thstyles')}>Họ Tên</th>
                        <th className={cx('thstyles')}>Giới Tính</th>
                        <th className={cx('thstyles')}>Ngày Sinh</th>
                        <th className={cx('thstyles')}>Địa chỉ</th>
                        <th className={cx('thstyles')}>Thao tác</th>
                    </tr>
                </thead>
                <tbody className={cx('table-content')}>{tablecontent}</tbody>
            </table>
            {dataStudents.length > 0 ? (
                <Paginate totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            ) : (
                <div className={cx('nodata')}>không có dữ liệu</div>
            )}
        </>
    );
}

export default StudentTable;
