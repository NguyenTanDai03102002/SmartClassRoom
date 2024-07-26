import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './DanhSachTheoNam.module.scss';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { Classes, Grades, schoolYears, userToken } from '../../../../redux/selectors';
import {
    showBeforeDelete,
    showErrorMessage,
    showSuccessMessage,
    showWarningMessage,
} from '../../../../Component/Notification/Index';
import Modal from '../../../../Component/Modal/Index';
import Input from '../../../../Component/Input/Index';
import MuiTable from '../../../../Component/MuiTable/Index';
import AddIcon from '@mui/icons-material/Add';
import SelectOption from '../../../../Component/SelectOption/Index';

const cx = classNames.bind(Styles);

function Index() {
    const headCells = [
        { id: 'name', label: 'Tên lớp học' },
        { id: 'grade.grade', label: 'Khối' },
        { id: 'classTeacher', label: 'Giáo viên chủ nhiệm' },
    ];
    const token = useSelector(userToken);
    const [dataAdd, setDataAdd] = useState({ name: '', schoolYearId: null, gradeId: null });
    const [showModal, setShowModal] = useState(false);
    const [schoolYearId, setSchoolYearId] = useState();
    const { getallschoolyear, getallclassesbyyear, getallgrade, createclass, deleteclass } = useHandleDispatch();
    const SchoolYears = useSelector(schoolYears);
    const classes = useSelector(Classes);
    const grades = useSelector(Grades);
    const nameref = useRef();

    useEffect(() => {
        getallschoolyear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataformatOptionOfSchoolYear = SchoolYears.map((year) => ({
        id: year.id,
        nameOption: `${year.schoolYear} - ${year.schoolYear + 1}`,
    }));
    const dataformatOptionOfGrade = grades.map((grade) => ({
        id: grade.id,
        nameOption: `${grade.grade}`,
    }));

    const handleChangeOptionSchoolYear = (id) => {
        getallclassesbyyear(id);
        setSchoolYearId(id);
    };
    const handleChangeOptionGrade = (id) => {
        setDataAdd((pre) => ({
            ...pre,
            gradeId: id,
        }));
    };
    const handleChangeName = (e) => {
        setDataAdd({ ...dataAdd, [e.target.name]: e.target.value });
    };
    const editRecord = (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(row);
    };
    const deleteRecord = (dataDel) => {
        showBeforeDelete(` Bạn muốn xóa :)`).then(async (result) => {
            if (result.isConfirmed) {
                await deleteclass(token, dataDel);
                getallclassesbyyear(schoolYearId);
                showSuccessMessage('Bạn xóa mất tiêu rồi :(');
            } else {
                showErrorMessage('Bạn đừng phân vân nữa hay quyết đoán lên nè hihi :)');
            }
        });
    };

    const showmodal = async () => {
        setShowModal(true);
        setDataAdd({ ...dataAdd, schoolYearId: schoolYearId });
        getallgrade();
    };

    const oncloseModal = () => {
        setShowModal(false);
        setDataAdd({ ...dataAdd, name: '', khoiId: null });
    };
    const handleSubmitAdd = async () => {
        if (nameref.current?.validity?.valid && dataAdd.gradeId != null) {
            const response = await createclass(token, dataAdd);
            if (response === true) {
                showSuccessMessage('Thêm thành công');
                oncloseModal();
                getallclassesbyyear(schoolYearId);
            } else {
                showErrorMessage('Lỗi mất tiêu rồi');
            }
        } else {
            showWarningMessage('Lỗi dữ liệu');
        }
    };
    const handleSearch = (dataSearch) => {
        // console.log(dataSearch);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('select-option')}>
                    <SelectOption
                        title="Chọn năm học"
                        dataOptions={dataformatOptionOfSchoolYear}
                        onclick={(id) => handleChangeOptionSchoolYear(id)}
                    />
                </div>
                {schoolYearId && (
                    <div className={cx('add')} onClick={showmodal}>
                        <AddIcon /> Add
                    </div>
                )}
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
                    <Modal title="Thông Tin Lớp Học" save onClose={oncloseModal} handleSubmitAdd={handleSubmitAdd}>
                        <Input
                            refer={nameref}
                            spellCheck="false"
                            type="text"
                            placeholder="Tên"
                            name="name"
                            value={dataAdd.name || ''}
                            pattern="^(10|11|12)[A-Z][1-9]$"
                            errorMessage="Ví dụ: 10A1,11B1,12C1,..."
                            required
                            handleChange={handleChangeName}
                        />
                        <SelectOption
                            title="Chọn khối"
                            dataOptions={dataformatOptionOfGrade}
                            onclick={(id) => handleChangeOptionGrade(id)}
                        />
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default Index;
