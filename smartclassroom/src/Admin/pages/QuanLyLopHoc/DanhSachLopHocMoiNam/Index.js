import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './DanhSachTheoNam.module.scss';
import SelectOption from '../../../../Component/SelectOption/Index';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { Classes, schoolYears } from '../../../../redux/selectors';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../../../../Component/Modal/Index';
import Input from '../../../../Component/Input/Index';
import Button from '../../../../Component/button/Button';

const cx = classNames.bind(Styles);

function Index() {
    const [showModal, setShowModal] = useState(false);
    const { getallschoolyear, getallclassesbyyear } = useHandleDispatch();
    const SchoolYears = useSelector(schoolYears);
    const classes = useSelector(Classes);

    useEffect(() => {
        getallschoolyear();
    }, []);

    const dataformatOption = SchoolYears.map((year) => ({
        id: year.id,
        nameOption: `${year.schoolYear} - ${year.schoolYear + 1}`,
    }));

    const handleChangeOption = (id) => {
        getallclassesbyyear(id);
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const editRecord = (row) => {
        console.log(row);
    };

    const deleteRecord = (row) => {
        console.log(row);
    };
    const addRecord = () => {
        setShowModal(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('select-option')}>
                    <SelectOption
                        title="Chọn năm học"
                        dataOptions={dataformatOption}
                        onclick={(id) => handleChangeOption(id)}
                    />
                </div>
                <div className={cx('add')} onClick={addRecord}>
                    <AddIcon /> Add
                </div>
            </div>
            <div className={cx('table')}>
                <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={4} className={cx('title')}>
                                        DANH SÁCH LỚP HỌC
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" style={{ minWidth: 170 }} className={cx('label')}>
                                        Tên lớp học
                                    </TableCell>
                                    <TableCell align="center" style={{ minWidth: 170 }} className={cx('label')}>
                                        Khối
                                    </TableCell>
                                    <TableCell align="center" style={{ minWidth: 170 }} className={cx('label')}>
                                        Giáo viên chủ nhiệm
                                    </TableCell>
                                    <TableCell align="center" style={{ minWidth: 170 }} className={cx('label')}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {classes.length === 0 ? (
                                    <TableRow>
                                        <TableCell align="center" colSpan={4}>
                                            <div className={cx('no-data-message')}>Không có dữ liệu</div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    classes
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell align="center" className={cx('datarow')}>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center" className={cx('datarow')}>
                                                    {row.grade.grade}
                                                </TableCell>
                                                <TableCell align="center" className={cx('datarow')}>
                                                    {row.classTeacher || 'Chưa có giáo viên chủ nhiệm'}
                                                </TableCell>
                                                <TableCell align="center" className={cx('datarow')}>
                                                    <div className={cx('actions')}>
                                                        <div className={cx('edit')} onClick={() => editRecord(row)}>
                                                            <EditIcon />
                                                        </div>
                                                        <div className={cx('delete')} onClick={() => deleteRecord(row)}>
                                                            <DeleteIcon />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={classes.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            {showModal && (
                <div className={cx('modal')}>
                    <Modal>
                        <Input />
                        <Input />
                        <Input />
                        <Input />
                        <Input />
                        <Input />
                        <Input />
                        <Input />
                        <div className={cx('button')}>
                            <Button btn>Lưu</Button>
                            <Button btn onClick={() => setShowModal(false)}>
                                Thoát
                            </Button>
                        </div>
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default Index;
