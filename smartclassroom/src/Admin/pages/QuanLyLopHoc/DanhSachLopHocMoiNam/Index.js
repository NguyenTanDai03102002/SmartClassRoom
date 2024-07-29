import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './DanhSachTheoNam.module.scss';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { Classes, Grades, schoolYears, Teachers, userToken } from '../../../../redux/selectors';
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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SelectOption from '../../../../Component/SelectOption/Index';

const cx = classNames.bind(Styles);

function Index() {
    const headCells = [
        { id: 'name', label: 'Tên lớp học' },
        { id: 'grade.grade', label: 'Khối' },
        { id: 'classTeacher.fullName', label: 'Giáo viên chủ nhiệm' },
    ];
    const token = useSelector(userToken);
    const [dataAdd, setDataAdd] = useState({ name: '', schoolYearId: null, gradeId: null, teacherId: null });
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [keyWord, setKeyWord] = useState('');
    const [keyWordSchoolYear, setKeyWordSchoolYear] = useState();
    const [YearId, setYearId] = useState();
    const {
        getallschoolyear,
        getallclassesbyyear,
        getallgrade,
        createclass,
        deleteclass,
        editclass,
        cpydata,
        getallteacher,
    } = useHandleDispatch();
    const SchoolYears = useSelector(schoolYears);
    const classes = useSelector(Classes);
    const grades = useSelector(Grades);
    const teachers = useSelector(Teachers);
    const nameref = useRef();
    useEffect(() => {
        getallclassesbyyear('', '');
    }, []);

    useEffect(() => {
        getallschoolyear(keyWordSchoolYear);
        getallteacher(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWordSchoolYear]);

    useEffect(() => {
        if (YearId) {
            getallclassesbyyear(YearId, keyWord);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWord]);

    const dataformatOptionOfTeacher = teachers.map((teacher) => ({
        id: teacher.id,
        nameOption: `${teacher.userCode} - ${teacher.fullName}`,
    }));

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
        setYearId(id);
    };
    const handleChangeOptionGrade = (id) => {
        setDataAdd((pre) => ({
            ...pre,
            gradeId: id,
        }));
    };
    const handleChangeOptionTeacher = (id) => {
        setDataAdd((pre) => ({
            ...pre,
            teacherId: id,
        }));
    };
    const handleChangeName = (e) => {
        setDataAdd({ ...dataAdd, [e.target.name]: e.target.value });
    };
    const showmodal = async () => {
        setShowModal(true);
        setIsEditMode(false);
        setDataAdd({ ...dataAdd, schoolYearId: YearId });
        getallgrade();
    };

    const handleShowEdit = (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        showmodal();
        setDataAdd({
            id: row.id,
            name: row.name,
            schoolYearId: YearId,
            gradeId: row.grade.id,
            teacherId: row.classTeacher?.id,
        });
        setIsEditMode(true);
    };

    const handleSubmitEdit = async () => {
        const response = await editclass(token, dataAdd);
        if (response.code === 1000) {
            showSuccessMessage('Chỉnh sửa thành công');
            getallclassesbyyear(YearId);
            oncloseModal();
        } else {
            showErrorMessage(response.message);
        }
    };

    const handleDelete = (dataDel) => {
        showBeforeDelete(`Bạn muốn xóa :)`).then(async (result) => {
            if (result.isConfirmed) {
                await deleteclass(token, dataDel);
                getallclassesbyyear(YearId);
                showSuccessMessage('Bạn xóa mất tiêu rồi :(');
            } else {
                showErrorMessage('Bạn đừng phân vân nữa:)');
            }
        });
    };

    const oncloseModal = () => {
        setShowModal();
        setIsEditMode(false);
        setDataAdd({ ...dataAdd, name: '', gradeId: null, teacherId: null });
    };
    const handleSubmitAdd = async () => {
        if (nameref.current?.validity?.valid && dataAdd.gradeId != null && dataAdd.teacherId != null) {
            const response = await createclass(token, dataAdd);
            if (response?.code === 1000) {
                showSuccessMessage('Thêm thành công');
                oncloseModal();
                getallclassesbyyear(YearId);
            } else {
                showErrorMessage(response?.message || 'Lỗi không xác định');
            }
        } else {
            showWarningMessage('Lỗi dữ liệu');
        }
    };
    const handleSearch = (dataSearch) => {
        setKeyWord(dataSearch);
    };
    const handleSearchChangeSchoolYear = (event) => {
        setKeyWordSchoolYear(event.target.value);
    };

    const handleCoppy = async () => {
        const response = await cpydata(token, YearId);
        if (response) {
            showErrorMessage(response.message);
        } else {
            showSuccessMessage('Thành công');
            getallclassesbyyear(YearId);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('select-option')}>
                    <SelectOption
                        title="Chọn năm học"
                        handleSearchChange={handleSearchChangeSchoolYear}
                        dataOptions={dataformatOptionOfSchoolYear}
                        onclick={(id) => handleChangeOptionSchoolYear(id)}
                        selectedOption={YearId}
                    />
                </div>
                {YearId && (
                    <div className={cx('action')}>
                        <div className={cx('coppy')} onClick={handleCoppy}>
                            <ContentCopyIcon />
                            Coppy data
                        </div>
                        <div className={cx('add')} onClick={showmodal}>
                            <AddIcon /> Add
                        </div>
                    </div>
                )}
            </div>
            <MuiTable
                title="DANH SÁCH LỚP HỌC"
                headCells={headCells}
                data={classes}
                handleShowEdit={handleShowEdit}
                handleDelete={handleDelete}
                handleSearch={handleSearch}
                action
                checkBox
            />
            {showModal && (
                <div className={cx('modal')}>
                    <Modal
                        edit={isEditMode}
                        title="Thông Tin Lớp Học"
                        save={!isEditMode}
                        onClose={oncloseModal}
                        handleSubmitAdd={handleSubmitAdd}
                        handleSubmitEdit={handleSubmitEdit}
                    >
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
                            selectedOption={dataAdd.gradeId}
                        />
                        <SelectOption
                            title="Chọn giáo viên chủ nhiệm"
                            dataOptions={dataformatOptionOfTeacher}
                            onclick={(id) => handleChangeOptionTeacher(id)}
                            selectedOption={dataAdd.teacherId}
                        />
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default Index;
