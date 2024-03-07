import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './Khoi.module.scss';
import Button from '../../../Component/button/Button';
import { useSelector } from 'react-redux';
import { Blocks } from '../../../redux/selectors';
import { useHandleDispatch } from '../../../services/useHandleDispatch';

const cx = classNames.bind(Styles);

function Index() {
    const { fecthBlock } = useHandleDispatch();
    const blocks = useSelector(Blocks);
    useEffect(() => {
        fecthBlock();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('items')}>
                {blocks.map((item) => (
                    <Button key={item.id} className={cx('item')} to="/admin/khoi/lop">
                        Khối {item.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Index;
