import React from 'react';
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('class-teacher')}>
                <span> Đây là lớp : </span>
                <span> Giáo Viên chủ nhiệm : </span>
            </div>
            <Seach />

            <Header />
            <Button control>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
            <div className={cx('table')}>
                <DiemTable />
            </div>
        </div>
    );
}

export default Diem;
