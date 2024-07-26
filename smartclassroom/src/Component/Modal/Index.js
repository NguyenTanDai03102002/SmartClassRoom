import React from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Button from '../button/Button';

const cx = classNames.bind(styles);

function Index({ title, children, form1000 = false, save = false, edit = false, onClose }) {
    return (
        <div className={cx('Modal')}>
            <div className={cx('overlay')}></div>
            <div className={cx('modal-content', { form1000 })}>
                <div className={cx('title')}>{title}</div>
                <div className={cx('content')}>
                    {React.Children.map(children, (child, index) => (
                        <div className={cx('item')} key={index}>
                            {child}
                        </div>
                    ))}
                </div>
                <div className={cx('button')}>
                    {save ? <Button btn>Thêm</Button> : edit && <Button btn>Lưu</Button>}
                    <Button btn onClick={onClose}>
                        Thoát
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Index;
