import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Diem.module.scss';
import DiemTable from './table/DiemTable';
import Header from './header/Index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Component/button/Button';
import Seach from '../../../Component/seach/Seach';

const cx = classNames.bind(Styles);

function Diem() {
    return (
        <div className={cx('wrapper')}>
            <Seach placeholder="Nhập mã số học sinh" />

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
