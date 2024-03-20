import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Component/button/Button';
import Styles from './Hocsinh.module.scss';
import Seach from '../../component/seach/Seach';
import StudentTable from './table/StudentTable';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { Students, userToken } from '../../../redux/selectors';

const cx = classNames.bind(Styles);

function Hocsinh() {
    const { idlop } = useParams();
    const { putStudentsFromExcel, getallstudentsofclass } = useHandleDispatch();
    const [keyword, setKeyword] = useState('');

    const token = useSelector(userToken);
    const dataStudents = useSelector(Students);

    useEffect(() => {
        getallstudentsofclass(idlop);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idlop]);

    useEffect(() => {
        getallstudentsofclass(idlop, null, null, keyword);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]);

    const convertExcelDateToDate = (excelDate) => {
        const date = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
        return date.toISOString().split('T')[0];
    };
    const handleFileChange = (e) => {
        const fileTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv',
        ];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (fileTypes.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    const workbook = XLSX.read(e.target.result, { type: 'buffer' });
                    const workSheetName = workbook.SheetNames[0];
                    const workSheet = workbook.Sheets[workSheetName];
                    const data = XLSX.utils.sheet_to_json(workSheet);
                    const formatData = data.map((item) => ({
                        maSo: item['Mã số học sinh'],
                        fullName: item['Họ Tên'],
                        sex: item['Giới Tính'].toLowerCase() === 'nam' ? 0 : 1,
                        birthday: convertExcelDateToDate(item['Ngày Sinh']),
                        address: item['Địa chỉ'],
                        phoneNumber: item['Số điện thoại'],
                        email: item['Email'],
                    }));
                    putStudentsFromExcel(idlop, formatData, token);
                };
            } else {
                toast.error('vui lòng chọn file excel');
            }
        } else {
            toast.warning('Chưa chọn file');
        }
    };

    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('class-teacher')}>
                <span> Đây là lớp : </span>
                <span> Giáo Viên chủ nhiệm :</span>
            </div> */}
            <Seach placeholder="Nhập tên học sinh" keyword={keyword} setKeyword={setKeyword} />
            <div className={cx('add-hs')}>
                <Button control>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>

            <div className={cx('excel')}>
                <label htmlFor="id-upload" className={cx('excel-btn')}>
                    <FontAwesomeIcon icon={faUpload} />
                    <span>Nhập dữ liệu từ excel</span>
                    <input id="id-upload" className={cx('upload')} type="file" onChange={handleFileChange} />
                </label>

                <Button className={cx('excel-btn')}>
                    <FontAwesomeIcon icon={faDownload} />
                    <span>Xuất file excel</span>
                </Button>
            </div>

            <StudentTable dataStudents={dataStudents} keyword={keyword} idlop={idlop} />
        </div>
    );
}

export default Hocsinh;
