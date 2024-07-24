import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './table.module.scss';
import Paginate from '../../../../Component/paginate/paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Component/button/Button';

const cx = classNames.bind(Styles);

function DiemTable() {
    const currentPost = [1, 2, 3, 4];
    const tableheader = (
        <tr>
            <th className={cx('thstyles')}>Mã HS</th>
            <th className={cx('thstyles')}>Miệng</th>
            <th className={cx('thstyles')}>15p 1</th>
            <th className={cx('thstyles')}>15p 2</th>
            <th className={cx('thstyles')}>15p 3</th>
            <th className={cx('thstyles')}>1 Tiết 1</th>
            <th className={cx('thstyles')}>1 Tiết 2</th>
            <th className={cx('thstyles')}>HK</th>
            <th className={cx('thstyles')}>TB</th>
            <th className={cx('thstyles')}>Thao tác</th>
        </tr>
    );
    const tablecontent = currentPost.map((item) => (
        <tr key={item} className={cx('table-row')}>
            <td className={cx('tdstyles')}></td>
            <td className={cx('tdstyles')}></td>
            <td className={cx('tdstyles')}></td>
            <td className={cx('tdstyles')}></td>
            <td className={cx('tdstyles')}></td>
            <td className={cx('tdstyles')}></td>
            <td className={cx('tdstyles')}></td>
            <td className={cx('tdstyles')}></td>
            <td className={cx('tdstyles')}></td>
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
            <Paginate /> <div className={cx('nodata')}>Không Tìm Thấy dữ liệu</div>
        </div>
    );
}

export default DiemTable;
