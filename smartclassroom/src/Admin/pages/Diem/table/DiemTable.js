import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './table.module.scss';
import Paginate from '../../../../Component/paginate/paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Component/button/Button';

const cx = classNames.bind(Styles);

function DiemTable({ filteredData, mapIdToMSHS }) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    const lastPostIndex = currentPage * postsPerPage;
    const fisrtPostIndex = lastPostIndex - postsPerPage;

    const currentPost = filteredData.slice(fisrtPostIndex, lastPostIndex);
    const tableheader = (
        <tr>
            <th className={cx('thstyles')}>Mã HS</th>
            <th className={cx('thstyles')}>Điểm Miệng</th>
            <th className={cx('thstyles')}>Điểm 15p</th>
            <th className={cx('thstyles')}>Điểm 1 Tiết Lần 1</th>
            <th className={cx('thstyles')}>Điểm 1 Tiết Lần 2</th>
            <th className={cx('thstyles')}>Điểm HK</th>
            <th className={cx('thstyles')}>Điểm TB</th>
            <th className={cx('thstyles')}>Thao tác</th>
        </tr>
    );
    const tablecontent = currentPost.map((item) => (
        <tr key={item.id} className={cx('table-row')}>
            <td className={cx('tdstyles')}>{mapIdToMSHS(item.IdMSHS)}</td>
            <td className={cx('tdstyles')}>{item.diemMieng}</td>
            <td className={cx('tdstyles')}>{item.diem15p}</td>
            <td className={cx('tdstyles')}>{item.diem1tietlan1}</td>
            <td className={cx('tdstyles')}>{item.diem1tietlan2}</td>
            <td className={cx('tdstyles')}>{item.diemhk}</td>
            <td className={cx('tdstyles')}>{item.diemTB}</td>
            <td className={cx('tdstyles')}>
                <Button control>
                    <FontAwesomeIcon icon={faTrashCan} />
                </Button>
                <Button control>
                    <FontAwesomeIcon icon={faPen} />
                </Button>
            </td>
        </tr>
    ));
    return (
        <div className={cx('wrapper')}>
            <table className={cx('list-table')}>
                <thead className={cx('table-header')}>{tableheader}</thead>
                <tbody className={cx('table-content')}>{tablecontent}</tbody>
            </table>
            {currentPost.length !== 0 ? (
                <Paginate
                    totalPage={filteredData.length}
                    postsPerPage={postsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ) : (
                <div className={cx('nodata')}>Không Tìm Thấy dữ liệu</div>
            )}
        </div>
    );
}

export default DiemTable;
