import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faArrowRightToBracket, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Component/button/Button';
import Styles from './Hocsinh.module.scss';
import Seach from '../../component/seach/Seach';
import ThemXoaSua from './ThemXoaSua/ThemXoaSuaHS';
import StudentTable from './table/StudentTable';
import * as XLSX from 'xlsx';
import diacriticless from 'diacriticless';

const cx = classNames.bind(Styles);

function Hocsinh() {
    const id = localStorage.getItem('id');
    const lop_id = parseInt(id);
    const lop = localStorage.getItem('lop');
    const gvcv = localStorage.getItem('gvcv');
    // seach
    const [searchTerm, setSearchTerm] = useState(''); //
    // USESTATE KIỂM TRA LÀ ĐANG Ở TRANG THÁI EDIT HAY TRẠNG THÁI THÊM ĐỂ HIỆN NHỮNG THỨ CẦN THIẾT NHƯ NÚT LƯU HAY DỮ LIỆU TRÊN THANH INPUT
    const [isEditing, setIsEditing] = useState(false);
    //
    // USESTATE SHOW NHỮNG THỨ CẦN THIẾT
    const [show, setShow] = useState(false);
    // USESTATE LƯU CSDL VÀ USEEFFECT ĐỂ CALL API
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/students')
            .then((response) => response.json())
            .then((posts) => {
                const filteredDataHS = posts.filter((item) => item.lop_id === lop_id);
                setPosts(filteredDataHS);
            });
    }, [lop_id]);
    // HÀM XÓA DỮ LIỆU TỪ CSDL
    const handleDeleteHS = (id) => {
        const confilm = window.confirm('Bạn Thật Sự Muốn Xóa');
        if (confilm) {
            fetch(`http://localhost:3000/students/${id}`, {
                method: 'DELETE',
            }).then((response) => {
                setPosts((prevPosts) => prevPosts.filter((posts) => posts.id !== id));
            });
        }
    };
    // USESTATE LƯU TRỮ DỮ LIỆU CẦN SỬA
    const [editdata, setEditdata] = useState();
    // HÀM TÌM DỮ LIỆU CẦN SỬA THÔNG QUA ID VÀ ĐƯA VÀO EDITDATA
    const handleEditHS = (id) => {
        const hsEdit = posts.find((posts) => posts.id === id);
        setEditdata(hsEdit);
        setShow(!show);
        setIsEditing(false);
    };
    //HÀM NÀY THỰC HIỆN KHI BẤM VÀO NÚT THÊM HỌC SINH NÓ SẼ HIỆN QUA MÀN HÌNH THÊM VÀ NÚT LƯU ĐC HIỂN THỊ LÊN
    const themhs = () => {
        setShow(!show);
        setIsEditing(false);
    };

    // xuat excel
    const exportToExcel = () => {
        if (posts.length === 0) {
            return;
        }

        // Tạo một mảng chứa dữ liệu cần xuất
        const dataToExport = posts.map((post, index) => ({
            STT: index + 1,
            MSHS: post.mahs,
            HọTên: post.hoten,
            GiớiTính: post.gioitinh,
            NgàySinh: post.ngaysinh,
            ĐịaChỉ: post.diachi,
        }));

        // Tạo một workbook mới
        const wb = XLSX.utils.book_new();
        // Tạo một worksheet từ mảng dữ liệu
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(wb, ws, 'DanhSachHocSinh');

        // Xuất file Excel
        XLSX.writeFile(wb, 'DanhSachHocSinh.xlsx');
    };
    const [filteredPosts, setFilteredPosts] = useState([]);
    useEffect(() => {
        const sanitizedSearchTerm = diacriticless(searchTerm.trim().toLowerCase());

        const filtered = posts.filter((post) => {
            const postWithoutDiacritics = diacriticless(post.hoten.toLowerCase());
            return postWithoutDiacritics.startsWith(sanitizedSearchTerm);
        });
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('class-teacher')}>
                <span> Đây là lớp : {lop}</span>
                <span> Giáo Viên chủ nhiệm : {gvcv}</span>
            </div>
            {posts.length > 0 && (
                <>
                    {show === false && <Seach setSearchTerm={setSearchTerm} searchTerm={searchTerm} />}
                    <div className={cx('add-hs')}>
                        {show === false && (
                            <Button control onClick={themhs}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        )}
                        {show && (
                            <div className={cx('add-list-input')}>
                                <ThemXoaSua
                                    show={show}
                                    setShow={setShow}
                                    posts={posts}
                                    setPosts={setPosts}
                                    editdata={editdata}
                                    setEditdata={setEditdata}
                                    isEditing={isEditing}
                                    lop_id={lop_id}
                                />
                            </div>
                        )}
                    </div>
                    {show === false && (
                        <div className={cx('excel')}>
                            <Button className={cx('excel-btn')}>
                                <FontAwesomeIcon icon={faArrowRightToBracket} />
                                <span>Nhập dữ liệu từ excel</span>
                            </Button>
                            <Button className={cx('excel-btn')} onClick={exportToExcel}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                <span>Xuất file excel</span>
                            </Button>
                        </div>
                    )}
                    {show === false && (
                        <StudentTable
                            posts={filteredPosts}
                            handleDeleteHS={handleDeleteHS}
                            handleEditHS={handleEditHS}
                            show={show}
                            setIsEditing={setIsEditing}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Hocsinh;
