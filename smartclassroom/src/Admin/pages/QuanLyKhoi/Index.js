import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './Khoi.module.scss';
import Button from '../../../Component/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Blocks } from '../../../redux/selectors';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import classesSlice from '../../../ReducerSlice/classesSlice';

const cx = classNames.bind(Styles);

function Index() {
    const dispatch = useDispatch();
    const { fecthBlock, fecthClasses } = useHandleDispatch();
    const blocks = useSelector(Blocks);
    useEffect(() => {
        fecthBlock();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToClass = (id) => {
        fecthClasses(null, id);
        dispatch(classesSlice.actions.SELECTED_FOR_BLOCK(id));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('items')}>
                {blocks.map((item) => (
                    <Button
                        key={item.id}
                        className={cx('item')}
                        onClick={() => handleToClass(item.id)}
                        to={`/admin/khoi/${item.id}/lop`}
                    >
                        Khối {item.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Index;
