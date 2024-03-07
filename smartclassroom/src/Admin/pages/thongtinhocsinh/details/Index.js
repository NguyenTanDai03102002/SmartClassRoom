import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import Styles from './details.module.scss';

const cx = classNames.bind(Styles);

function Index() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/students/${id}`)
            .then((response) => response.json())
            .then((posts) => {
                setPosts(posts);
            });
    }, [id]);
    return (
        <div className={cx('wrapper')}>
            <h2>Chi tiết học sinh</h2>
            <p>
                <strong>Mã số học sinh:</strong> {posts.mahs}
            </p>
            <p>
                <strong>Họ Tên:</strong> {posts.hoten}
            </p>
            <p>
                <strong>Giới Tính:</strong> {posts.gioitinh}
            </p>
            <p>
                <strong>Ngày Sinh:</strong> {posts.ngaysinh}
            </p>
            <p>
                <strong>Địa chỉ:</strong> {posts.diachi}
            </p>
        </div>
    );
}

export default Index;
