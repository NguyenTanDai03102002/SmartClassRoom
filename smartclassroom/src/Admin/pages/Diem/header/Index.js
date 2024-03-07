import React, { useState } from 'react';
import Button from '../../../../Component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Style from './header.module.scss';
import * as XLSX from 'xlsx';

const cx = classNames.bind(Style);

function Index({ dataMonHoc, dataHK, dataNienKhoa, dataDiem, filteredData, setFilteredData, mapIdToMSHS }) {
    const [selectedMonHoc, setSelectedMonHoc] = useState('');
    const [selectedHocKy, setSelectedHocKy] = useState('');
    const [selectedNamHoc, setSelectedNamHoc] = useState('');
    const handleFilter = () => {
        const selectedMonHocID = selectedMonHoc !== '' ? dataMonHoc.find((mon) => mon.name === selectedMonHoc)?.id : '';
        const selectedHKID = selectedHocKy !== '' ? dataHK.find((mon) => mon.HK === selectedHocKy)?.id : '';
        const selectedNienKhoaID =
            selectedNamHoc !== '' ? dataNienKhoa.find((mon) => mon.year === selectedNamHoc)?.id : '';

        const filteredData = dataDiem.filter((item) => {
            // Kiểm tra xem có điều kiện Môn học được chọn không
            if (selectedMonHoc !== '') {
                if (item.IdMonHoc !== selectedMonHocID) {
                    return false; // Không khớp Môn học
                }
            }

            // Kiểm tra xem có điều kiện Học kỳ được chọn không
            if (selectedHocKy !== '') {
                if (item.IdHK !== selectedHKID) {
                    return false; // Không khớp Học kỳ
                }
            }

            // Kiểm tra xem có điều kiện Năm học được chọn không
            if (selectedNamHoc !== '') {
                if (item.IdNienKhoa !== selectedNienKhoaID) {
                    return false; // Không khớp Năm học
                }
            }

            return true; // Item thỏa mãn tất cả điều kiện
        });

        // Cập nhật state filteredData với kết quả lọc
        setFilteredData(filteredData);
    };
    const exportToExcel = () => {
        if (filteredData.length === 0) {
            return;
        }

        // Tạo một mảng chứa dữ liệu cần xuất
        const dataToExport = filteredData.map((data, index) => ({
            STT: index + 1,
            MSHS: mapIdToMSHS(data.IdMSHS),
            ĐiểmMiệng: data.diemMieng,
            Điểm15p: data.diem15p,
            Điểm1TiếtLần1: data.diem1tietlan1,
            Điểm1TiếtLần2: data.diem1tietlan2,
            ĐiểmHọcKỳ: data.diemhk,
            ĐiểmTrungBình: data.diemTB,
        }));

        // Tạo một workbook mới
        const wb = XLSX.utils.book_new();
        // Tạo một worksheet từ mảng dữ liệu
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(wb, ws, 'DanhSachDiem');

        // Xuất file Excel
        XLSX.writeFile(wb, 'DanhSachDiem.xlsx');
    };
    return (
        <div className={cx('header')}>
            <div className={cx('options')}>
                <span>Chọn môn học :</span>
                <select onChange={(e) => setSelectedMonHoc(e.target.value)}>
                    <option value="">--Tất Cả--</option>
                    {dataMonHoc.map((item) => (
                        <option value={item.name} key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <span>Chọn học Kỳ :</span>
                <select onChange={(e) => setSelectedHocKy(e.target.value)}>
                    <option value="">--Tất Cả--</option>
                    {dataHK.map((item, index) => (
                        <option value={item.HK} key={index}>
                            {item.HK}
                        </option>
                    ))}
                </select>
                <span>Chọn năm học :</span>
                <select onChange={(e) => setSelectedNamHoc(e.target.value)}>
                    <option value="">--Tất Cả--</option>
                    {dataNienKhoa.map((item, index) => (
                        <option value={item.year} key={index}>
                            {item.year}
                        </option>
                    ))}
                </select>
                <Button className={cx('btn-submit')} onClick={handleFilter}>
                    Liệt Kê
                </Button>
            </div>
            <Button className={cx('btn-submit')} onClick={exportToExcel}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span>Xuất file excel</span>
            </Button>
        </div>
    );
}

export default Index;
