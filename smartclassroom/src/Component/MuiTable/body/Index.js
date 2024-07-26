import React from 'react';
import classNames from 'classnames/bind';
import Styles from './body.module.scss';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

const cx = classNames.bind(Styles);

function Index({ visibleRows, data, editRecord, selected, handleClick }) {
    return (
        <TableBody className={cx('TableBody')}>
            {data.length === 0 ? (
                <TableRow>
                    <TableCell align="center" colSpan={6}>
                        <div className={cx('no-data-message')}>Không có dữ liệu</div>
                    </TableCell>
                </TableRow>
            ) : (
                visibleRows.map((row, index) => {
                    const isItemSelected = selected.indexOf(row.id) !== -1;
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </TableCell>
                            <TableCell className={cx('datarow')}>{row.name}</TableCell>
                            <TableCell className={cx('datarow')}>{row.grade.grade}</TableCell>
                            <TableCell className={cx('datarow')}>
                                {row.classTeacher || 'Chưa có giáo viên chủ nhiệm'}
                            </TableCell>
                            <TableCell className={cx('datarow')}>
                                <div className={cx('actions')}>
                                    <div className={cx('edit')} onClick={(e) => editRecord(e, row)}>
                                        <EditIcon />
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })
            )}
        </TableBody>
    );
}

export default Index;