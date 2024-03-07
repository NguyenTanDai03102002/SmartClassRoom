import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './ThemXoaSuaHS.module.scss';
import Button from '../../../../Component/button/Button';

const cx = classNames.bind(Styles);
function ThemXoaSua({ show, setShow, setPosts, posts, editdata, isEditing, lop_id }) {
    //
    // USESTATE LƯU TRỮ DỮ LIỆU NHẬP VÀO INPUT
    const [mahs, setMahs] = useState('');
    const [hoten, setHoten] = useState('');
    const [gioitinh, setGioitinh] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [diachi, setDiachi] = useState('');

    // HIỂN THỊ DỮ LIỆU EDIT LÊN INPUT NẾU CÓ DỮ LIỆU THÌ HIỂN THỊ CÒN KHÔNG THÌ GIÁ TRỊ NULL
    useEffect(() => {
        if (editdata && isEditing) {
            setMahs(editdata.mahs);
            setHoten(editdata.hoten);
            setGioitinh(editdata.gioitinh);
            setNgaysinh(editdata.ngaysinh);
            setDiachi(editdata.diachi);
        } else {
            setMahs('');
            setHoten('');
            setGioitinh('');
            setNgaysinh('');
            setDiachi('');
        }
    }, [editdata, isEditing]);

    // HÀM LƯU DỮ LIỆU SỬA LÊN CSDL
    const handleSaveEdit = () => {
        const updateData = {
            mahs,
            hoten,
            gioitinh,
            ngaysinh,
            diachi,
        };
        fetch(`http://localhost:3000/students/${editdata.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
            .then((response) => response.json())
            .then((newdataupdate) => {
                const newdataupdates = posts.map((post) => {
                    if (post.id === newdataupdate.id) {
                        return newdataupdate;
                    } else {
                        return post;
                    }
                });
                setPosts(newdataupdates);
                setShow(!show);
            });
    };

    const data = {
        mahs,
        hoten,
        gioitinh,
        ngaysinh,
        diachi,
        lop_id: lop_id,
    };

    // SỬ DỤNG useRef ĐỂ FOCUS VÀO DOM (HAY FOCUS VÀO DÒNG INPUT Á)
    const mahsInputRef = useRef(null);
    const hotenInputRef = useRef(null);
    const gioitinhInputRef = useRef(null);
    const ngaysinhInputRef = useRef(null);
    const diachiInputRef = useRef(null);

    // HÀM FOCUS VÀO MỖI MAHS VÀ XÓA DỮ LIỆU NÓ
    const clearAndfocus = () => {
        setMahs('');
        mahsInputRef.current.focus();
    };

    // HÀM THÊM HỌC SINH MỚI VÀO CSDL CÓ SỬ DỤNG FOCUS VÀ CLEAR CỦA 2 CÁI TRÊN
    const handleAdd = () => {
        const ismahsExists = posts.some((posts) => posts.mahs === mahs);
        if (!mahs || !hoten || !gioitinh || !ngaysinh || !diachi) {
            alert('vui lòng nhập đầy đủ thông tin ạ! hihi');
            if (!mahs) {
                mahsInputRef.current.focus();
            } else if (!hoten) {
                hotenInputRef.current.focus();
            } else if (!gioitinh) {
                gioitinhInputRef.current.focus();
            } else if (!ngaysinh) {
                ngaysinhInputRef.current.focus();
            } else if (!diachi) {
                diachiInputRef.current.focus();
            }
        } else if (ismahsExists) {
            alert('mã số học sinh đã tồn tại , vui lòng nhập mã số khác! hihi');
            clearAndfocus();
        } else {
            fetch('http://localhost:3000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((newPost) => {
                    setPosts((prevPosts) => [...prevPosts, newPost]);
                    setShow(!show);
                });
        }
    };

    // VIẾT JSX
    return (
        <div className={cx('add')}>
            <div className={cx('form-add')}>
                <h2>NHẬP NỘI DUNG</h2>
                <div className={cx('add-item')}>
                    <label>Mã Số Học Sinh : </label>
                    <div className={cx('input')}>
                        <input
                            type="text"
                            value={mahs}
                            ref={mahsInputRef}
                            onChange={(e) => setMahs(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className={cx('add-item')}>
                    <label>Họ Tên : </label>
                    <div className={cx('input')}>
                        <input
                            type="text"
                            value={hoten}
                            ref={hotenInputRef}
                            onChange={(e) => setHoten(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className={cx('add-item')}>
                    <label>Giới Tính : </label>
                    <div className={cx('input-radio')}>
                        <div className={cx('input-radio-item')}>
                            <input
                                type="radio"
                                value={ngaysinh}
                                ref={gioitinhInputRef}
                                checked={gioitinh === 'Nam'}
                                onChange={(e) => setGioitinh('Nam')}
                            ></input>
                            <span>Nam</span>
                        </div>
                        <div className={cx('input-radio-item')}>
                            <input
                                type="radio"
                                value={gioitinh}
                                ref={gioitinhInputRef}
                                checked={gioitinh === 'Nữ'}
                                onChange={(e) => setGioitinh('Nữ')}
                            ></input>
                            <span>Nữ</span>
                        </div>
                    </div>
                </div>
                <div className={cx('add-item')}>
                    <label>Ngày Sinh : </label>

                    <div className={cx('input')}>
                        <input
                            maxLength={8}
                            type="date"
                            value={ngaysinh}
                            ref={ngaysinhInputRef}
                            onChange={(e) => setNgaysinh(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className={cx('add-item')}>
                    <label>Địa Chỉ : </label>
                    <div className={cx('input')}>
                        <input
                            type="text"
                            value={diachi}
                            ref={diachiInputRef}
                            onChange={(e) => setDiachi(e.target.value)}
                        ></input>
                    </div>
                </div>
            </div>
            <Button control onClick={() => setShow(!show)}>
                Trở Về Danh Sách
            </Button>

            {isEditing ? (
                <Button control onClick={handleSaveEdit}>
                    Lưu Chỉnh Sửa
                </Button>
            ) : (
                <Button control onClick={handleAdd}>
                    Lưu
                </Button>
            )}
        </div>
    );
}

export default ThemXoaSua;
