import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Lop.module.scss';
import Button from '../../../Component/button/Button';
import { useSelector } from 'react-redux';
import { Classes } from '../../../redux/selectors';
import { useParams } from 'react-router-dom';
import { useHandleDispatch } from '../../../services/useHandleDispatch';

const cx = classNames.bind(Styles);

function Lop() {
    const { fecthClasses, getImageOfUser } = useHandleDispatch();
    const classes = useSelector(Classes);
    const { idkhoi } = useParams();
    const [teacherImages, setTeacherImages] = useState({});

    useEffect(() => {
        fecthClasses(null, idkhoi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchTeacherImages = async () => {
            const images = {};
            for (const item of classes) {
                if (item.teacher && !teacherImages[item.teacher.id]) {
                    const imageUrl = await getImageOfUser(item.teacher);
                    images[item.teacher.id] = imageUrl;
                }
            }
            setTeacherImages(images);
        };

        fetchTeacherImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classes]);

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
                        {item.teacher && teacherImages[item.teacher.id] && (
                            <img
                                className={cx('image')}
                                src={item.teacher && teacherImages[item.teacher.id]}
                                alt="anh"
                            />
                        )}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Lop;
