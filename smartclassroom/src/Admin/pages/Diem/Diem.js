import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Diem.module.scss';
import DiemTable from './table/DiemTable';
import Header from './header/Index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Component/button/Button';
import Seach from '../../component/seach/Seach';

const cx = classNames.bind(Styles);

function Diem() {
    const id = localStorage.getItem('id');
    const lop_id = parseInt(id);
    const lop = localStorage.getItem('lop');
    const gvcv = localStorage.getItem('gvcv');

    const [dataMonHoc, setDataMonHoc] = useState([]);
    const [dataHK, setDataHK] = useState([]);
    const [dataNienKhoa, setDataNienKhoa] = useState([]);
    const [dataHocSinh, setDataHocSinh] = useState([]);
    const [dataDiem, setDataDiem] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3002/MonHoc`)
            .then((response) => response.json())
            .then((dataMonHoc) => {
                setDataMonHoc(dataMonHoc);
            });

        fetch(`http://localhost:3004/HocKy`)
            .then((response) => response.json())
            .then((dataHK) => {
                setDataHK(dataHK);
            });

        fetch(`http://localhost:3003/NienKhoa`)
            .then((response) => response.json())
            .then((dataNienKhoa) => {
                setDataNienKhoa(dataNienKhoa);
            });

        fetch(`http://localhost:3000/students`)
            .then((response) => response.json())
            .then((dataHocSinh) => {
                const filteredDataHS = dataHocSinh.filter((item) => item.lop_id === lop_id);
                setDataHocSinh(filteredDataHS);
            });
    }, [lop_id]);
    useEffect(() => {
        fetch(`http://localhost:3005/Diem`)
            .then((response) => response.json())
            .then((dataDiem) => {
                const filteredScoreData = [];

                dataHocSinh.forEach((student) => {
                    const studentScores = dataDiem.filter((data) => data.IdMSHS === student.id);
                    filteredScoreData.push(...studentScores);
                });
                setDataDiem(filteredScoreData);

                setFilteredData(filteredScoreData);
            });
    }, [dataHocSinh]);
    console.log('abc');
    // Hàm để xử lý sự kiện khi nhấn nút "Lọc" rồi đổi csdl id ra tên
    const mapIdToMSHS = (id) => {
        const student = dataHocSinh.find((student) => student.id === id);
        return student ? student.mahs : '';
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('class-teacher')}>
                <span> Đây là lớp : {lop}</span>
                <span> Giáo Viên chủ nhiệm : {gvcv}</span>
            </div>
            <Seach />
            {dataMonHoc.length > 0 && dataHK.length > 0 && dataNienKhoa.length > 0 && dataDiem.length > 0 && (
                <>
                    <Header
                        dataMonHoc={dataMonHoc}
                        dataHK={dataHK}
                        dataNienKhoa={dataNienKhoa}
                        dataDiem={dataDiem}
                        setFilteredData={setFilteredData}
                        mapIdToMSHS={mapIdToMSHS}
                        filteredData={filteredData}
                    />
                    <Button control>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <div className={cx('table')}>
                        <DiemTable filteredData={filteredData} mapIdToMSHS={mapIdToMSHS} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Diem;
