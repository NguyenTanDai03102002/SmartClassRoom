import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Button from '../../../Component/button/Button';
import Styles from './Hocsinh.module.scss';
import Seach from '../../../Component/seach/Seach';
import StudentTable from './Table/StudentTable';
import * as XLSX from 'xlsx';
import FormModal from './FormModal/formModal';
import Loading from '../../../Component/Loading/Index';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { Students, userToken } from '../../../redux/selectors';
import { getallstudentsnopage } from '../../../services/axios';

const cx = classNames.bind(Styles);

function Hocsinh() {
    const { idlop } = useParams();
    const { putStudentsFromExcel, getallstudentsofclass } = useHandleDispatch();
    const [keyword, setKeyword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const token = useSelector(userToken);
    const TotalPages = useSelector((state) => state.student.totalPages);
    const [currentPage, setCurrentPage] = useState(0);
    const dataStudents = useSelector(Students);
    const [dataHS, setDataHS] = useState({
        maSo: '',
        fullName: '',
        sex: 0,
        birthday: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: '',
        image: '',
    });
    const [editting, setEditting] = useState(false);
    const [excelLoading, setExcelLoaing] = useState(false);

    useEffect(() => {
        getallstudentsofclass(idlop);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idlop]);

    useEffect(() => {
        getallstudentsofclass(idlop, null, null, keyword);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]);

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
                reader.onload = async (e) => {
                    const workbook = XLSX.read(e.target.result, { type: 'buffer' });
                    const workSheetName = workbook.SheetNames[0];
                    const workSheet = workbook.Sheets[workSheetName];
                    const data = XLSX.utils.sheet_to_json(workSheet, { raw: false });
                    const formatData = data.map((item) => {
                        const date = new Date(item['Ngày Sinh']).toLocaleDateString('en-GB');
                        const parts = date.split('/');
                        const formatdate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                        const formatSex = item['Giới Tính'].toLowerCase() === 'nam' ? 0 : 1;
                        return {
                            maSo: item['Mã số học sinh'],
                            fullName: item['Họ Tên'],
                            sex: formatSex,
                            birthday: formatdate,
                            address: item['Địa chỉ'],
                            phoneNumber: item['Số điện thoại'],
                            email: item['Email'],
                            password: item['password'],
                        };
                    });
                    setExcelLoaing(true);
                    const res = await putStudentsFromExcel(idlop, formatData, token);
                    if (res) {
                        setExcelLoaing(false);
                    }
                };
            } else {
                toast.error('vui lòng chọn file excel');
            }
        } else {
            toast.warning('Chưa chọn file');
        }
    };

    const handleExportExcel = async () => {
        try {
            const header = [
                'STT',
                'Mã số học sinh',
                'Họ Tên',
                'Giới Tính',
                'Ngày Sinh',
                'Địa chỉ',
                'Số điện thoại',
                'Email',
            ];
            const reponse = await getallstudentsnopage(idlop);
            if (reponse && reponse.data) {
                const data = reponse.data.map((item, index) => [
                    index + 1,
                    item.maSo,
                    item.fullName,
                    item.sex === 0 ? 'Nam' : 'Nữ',
                    new Date(item.birthday).toLocaleDateString('en-GB'),
                    item.address,
                    item.phoneNumber,
                    item.email,
                ]);

                const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
                XLSX.writeFile(workbook, 'students.xlsx');
            }
        } catch (error) {
            toast.error('thất bại');
        }
    };

    return (
        <div className={cx('wrapper')}>
            {excelLoading && <Loading />}
            <Seach placeholder="Nhập tên học sinh" keyword={keyword} setKeyword={setKeyword} />
            <div className={cx('add-hs')}>
                <Button
                    control
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>

            <div className={cx('excel')}>
                <label htmlFor="id-upload" className={cx('excel-btn')}>
                    <FontAwesomeIcon icon={faUpload} />
                    <span>Nhập dữ liệu từ excel</span>
                    <input id="id-upload" className={cx('upload')} type="file" onChange={handleFileChange} />
                </label>

                <Button className={cx('excel-btn')} onClick={handleExportExcel}>
                    <FontAwesomeIcon icon={faDownload} />
                    <span>Xuất file excel</span>
                </Button>
            </div>

            <StudentTable
                dataStudents={dataStudents}
                keyword={keyword}
                idlop={idlop}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setDataHS={setDataHS}
                setEditting={setEditting}
                setShowModal={setShowModal}
            />

            <FormModal
                showModal={showModal}
                idlop={idlop}
                token={token}
                TotalPages={TotalPages}
                keyword={keyword}
                setShowModal={setShowModal}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                dataHS={dataHS}
                setDataHS={setDataHS}
                editting={editting}
                setEditting={setEditting}
            />
        </div>
    );
}

export default Hocsinh;
