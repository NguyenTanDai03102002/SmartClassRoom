import React, { useState } from 'react';
import Button from '../../../../Component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Styles from './table.module.scss';
import { Link } from 'react-router-dom';
import Paginate from '../../../../Component/paginate/paginate';

const cx = classNames.bind(Styles);

function StudentTable({ show, posts, handleDeleteHS, handleEditHS, setIsEditing }) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    const currentPost = posts.slice(firstPostIndex, lastPostIndex);

    const tableheader = (
        <tr>
            <th className={cx('thstyles')}>Mã số học sinh</th>
            <th className={cx('thstyles')}>Họ Tên</th>
            <th className={cx('thstyles')}>Giới Tính</th>
            <th className={cx('thstyles')}>Ngày Sinh</th>
            <th className={cx('thstyles')}>Địa chỉ</th>
            <th className={cx('thstyles')}>Thao tác</th>
        </tr>
    );
    const tablecontent = currentPost.map((item) => {
        const handleDeleteClick = (e) => {
            e.preventDefault();
            handleDeleteHS(item.id);
        };
        const handleEditClick = (e) => {
            e.preventDefault();
            handleEditHS(item.id);
            setIsEditing(true);
        };
        return (
            <tr key={item.id} className={cx('table-row')}>
                <td className={cx('tdstyles')}>
                    <Link className={cx('td-link')} /*to={`/admin/hocsinh/${item.id}`}*/>{item.mahs}</Link>
                </td>
                <td className={cx('tdstyles')}>
                    <Link className={cx('td-link')} /*to={`/admin/hocsinh/${item.id}`}*/>{item.hoten}</Link>
                </td>
                <td className={cx('tdstyles')}>
                    <Link className={cx('td-link')} /*to={`/admin/hocsinh/${item.id}`}*/>{item.gioitinh}</Link>
                </td>
                <td className={cx('tdstyles')}>
                    <Link className={cx('td-link')} /*to={`/admin/hocsinh/${item.id}`}*/>{item.ngaysinh}</Link>
                </td>
                <td className={cx('tdstyles')}>
                    <Link className={cx('td-link')} /*to={`/admin/hocsinh/${item.id}`}*/>{item.diachi}</Link>
                </td>
                <td className={cx('tdstyles')}>
                    <Button control onClick={handleDeleteClick}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                    {show === false && (
                        <Button control onClick={handleEditClick}>
                            <FontAwesomeIcon icon={faPen} />
                        </Button>
                    )}
                </td>
            </tr>
        );
    });
    return (
        <>
            <table className={cx('list-table')}>
                <thead className={cx('table-header')}>{tableheader}</thead>
                <tbody className={cx('table-content')}>{tablecontent}</tbody>
            </table>
            {currentPost.length > 0 ? (
                <Paginate
                    totalPage={posts.length}
                    postsPerPage={postsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ) : (
                <h2 className={cx('nodata')}>Không tìm thấy kết quả tìm kiếm</h2>
            )}
        </>
    );
}

export default StudentTable;
