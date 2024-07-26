import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './DanhSachTheoNam.module.scss';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { Classes, schoolYears } from '../../../../redux/selectors';

import Modal from '../../../../Component/Modal/Index';
import Input from '../../../../Component/Input/Index';
import MuiTable from '../../../../Component/MuiTable/Index';
import AddIcon from '@mui/icons-material/Add';
import SelectOption from '../../../../Component/SelectOption/Index';
import { showBeforeDelete, showErrorMessage, showSuccessMessage } from '../../../../Component/Notification/Index';

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

    const editRecord = (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(row);
    };

    const deleteRecord = (data) => {
        showBeforeDelete(` Bạn muốn xóa :)`).then((result) => {
            if (result.isConfirmed) {
                showSuccessMessage('Bạn xóa mất tiêu rồi :(');
            } else {
                showErrorMessage('Bạn đừng phân vân nữa hay quyết đoán lên nè hihi :)');
            }
        });
    };

    const addRecord = () => {
        setShowModal(true);
    };

    const handleSearch = (dataSearch) => {
        // console.log(dataSearch);
    };

    const headCells = [
        { id: 'name', label: 'Tên lớp học' },
        { id: 'grade.grade', label: 'Khối' },
        { id: 'classTeacher', label: 'Giáo viên chủ nhiệm' },
    ];
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
            <MuiTable
                title="DANH SÁCH LỚP HỌC"
                headCells={headCells}
                data={classes}
                editRecord={editRecord}
                deleteRecord={deleteRecord}
                handleSearch={handleSearch}
            />
            {showModal && (
                <div className={cx('modal')}>
                    <Modal title="abc" save onClose={() => setShowModal(false)}>
                        <Input />
                        <Input />
                        <Input />
                        <Input />
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default Index;
