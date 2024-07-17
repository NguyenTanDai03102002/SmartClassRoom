import React from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Index({ children, form1000 = false }) {
    return (
        <div className={cx('Modal')}>
            <div className={cx('overlay')}></div>
            <div className={cx('modal-content', { form1000 })}>{children}</div>
        </div>
    );
}

export default Index;
