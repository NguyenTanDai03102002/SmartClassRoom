import React from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import Styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(Styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
