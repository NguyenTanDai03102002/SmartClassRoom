import React, { useState } from 'react';
import Button from '../../../../Component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Style from './header.module.scss';
import * as XLSX from 'xlsx';

const cx = classNames.bind(Style);

function Index() {
    const dataMonHoc = [1, 2, 3, 4];
    return (
        <div className={cx('header')}>
            <div className={cx('options')}>
                <span>Chọn môn học :</span>
                <select>
                    <option value="">--Tất Cả--</option>
                    {dataMonHoc.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <span>Chọn học Kỳ :</span>
                <select>
                    <option value="">--Tất Cả--</option>
                    {dataMonHoc.map((item, index) => (
                        <option value={item} key={index}>
                            {item}
                        </option>
                    ))}
                </select>
                <span>Chọn năm học :</span>
                <select>
                    <option value="">--Tất Cả--</option>
                    {dataMonHoc.map((item, index) => (
                        <option value={item} key={index}>
                            {item}
                        </option>
                    ))}
                </select>
                <Button className={cx('btn-submit')}>Liệt Kê</Button>
            </div>
            <Button className={cx('btn-submit')}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span>Xuất file excel</span>
            </Button>
        </div>
    );
}

export default Index;
