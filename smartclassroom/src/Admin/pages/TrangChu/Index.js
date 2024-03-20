import React from 'react';
import classNames from 'classnames/bind';
import Styles from './home.module.scss';
import Button from '../../../Component/button/Button';
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
                <Button className={cx('item')} onClick={handleManageStudentsClick}>
                    Quản Lý Học Sinh
                </Button>
                <Button className={cx('item')} to="/admin/xep-lich-chu-nhiem">
                    xếp lịch chủ nhiệm
                </Button>
            </div>
        </div>
    );
}

export default Index;
