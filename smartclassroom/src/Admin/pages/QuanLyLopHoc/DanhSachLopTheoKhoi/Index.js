import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './DanhSachTheoKhoi.module.scss';
import Button from '../../../../Component/button/Button';
import anhmacdinh from '../../../../Component/Image/anhdaidien.png';
import { useSelector } from 'react-redux';
import { Classes } from '../../../../redux/selectors';
import { useParams } from 'react-router-dom';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';

const cx = classNames.bind(Styles);

function Index() {
    const { fecthClasses } = useHandleDispatch();
    const classes = useSelector(Classes);
    const { idkhoi } = useParams();

    useEffect(() => {
        fecthClasses(null, idkhoi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h1>CHỌN LỚP CẦN QUẢN LÝ</h1>
            <div className={cx('list-class')}>
                {classes.map((item) => (
                    <Button key={item.id} className={cx('item')} to={`/admin/khoi/${idkhoi}/lop/${item.id}/hocsinh`}>
                        <div className={cx('item-name')}>{item.name}</div>
                        <div className={cx('item-gvcv')}>
                            Giáo viên cố vấn :{' '}
                            {item.teacher && item.teacher.fullName ? item.teacher.fullName : 'Không có'}
                        </div>
                        {item.teacher && (
                            <img
                                className={cx('image')}
                                src={item.teacher?.imageUrl || anhmacdinh}
                                alt="TeacherImage"
                            />
                        )}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Index;
