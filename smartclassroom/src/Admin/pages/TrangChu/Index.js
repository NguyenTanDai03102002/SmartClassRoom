import React from 'react';
import classNames from 'classnames/bind';
import Styles from './home.module.scss';
import Button from '../../../Component/button/Button';
import IconSchoolClassroom from '../../../Component/Image/Icon-SchoolClassroom.png';
import IconPlanning from '../../../Component/Image/Icon-KeHoach.png';
import IconUser from '../../../Component/Image/Icon-User.png';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Index() {
    const { fecthBlock } = useHandleDispatch();

    const navigate = useNavigate();

    const handleManageStudentsClick = () => {
        fecthBlock();
        navigate('/admin/khoi');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('items')}>
                {/* //admin/Danh-Sach-Lop-Hoc-Theo-Nam */}
                <Button className={cx('item')} to="/admin/Danh-Sach-Lop-Hoc-Theo-Nam">
                    <div className={cx('title')}>Quản Lý Lớp Học</div>
                    <img src={IconSchoolClassroom} alt="iconClass" />
                </Button>
                <Button className={cx('item')} to="/admin/xep-lich-chu-nhiem">
                    <div className={cx('title')}>xếp lịch chủ nhiệm</div>
                    <img src={IconPlanning} alt="iconClass" />
                </Button>
                <Button className={cx('item')} to="/admin/quan-ly-giao-vien">
                    <div className={cx('title')}>Quản lý giáo viên</div>
                    <img src={IconUser} alt="iconClass" />
                </Button>
                <Button className={cx('item')} onClick={handleManageStudentsClick}>
                    <div className={cx('title')}>Quản Lý Học Sinh</div>
                    <img src={IconUser} alt="iconClass" />
                </Button>
                <Button className={cx('item')} to="/admin/xep-lich-Giang-Day">
                    <div className={cx('title')}>Xếp lịch giảng dạy</div>
                    <img src={IconPlanning} alt="iconClass" />
                </Button>
                <Button className={cx('item')} to="/admin/xem-lich-Giang-Day">
                    <div className={cx('title')}>Lịch Giảng Dạy</div>
                    <img src={IconPlanning} alt="iconClass" />
                </Button>
            </div>
        </div>
    );
}

export default Index;
