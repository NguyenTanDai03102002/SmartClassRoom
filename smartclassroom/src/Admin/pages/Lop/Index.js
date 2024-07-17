import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Lop.module.scss';
import Button from '../../../Component/button/Button';
import anhmacdinh from '../../../Component/Image/anhdaidien.png';
import { useSelector } from 'react-redux';
import { Classes } from '../../../redux/selectors';
import { useParams } from 'react-router-dom';
import { useHandleDispatch } from '../../../services/useHandleDispatch';

const cx = classNames.bind(Styles);

function Lop() {
    const { fecthClasses, getImageOfUser } = useHandleDispatch();
    const classes = useSelector(Classes);
    const { idkhoi } = useParams();
    const [teacherImages, setTeacherImages] = useState([]);
    // console.log(teacherImages[0].url);

    useEffect(() => {
        fecthClasses(null, idkhoi);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchTeacherImages = async () => {
            const teacherImageMap = {};
            await Promise.all(
                classes.map(async (item) => {
                    const imageUrl = await getImageOfUser(item.teacher);
                    if (item.teacher && item.teacher.id) {
                        teacherImageMap[item.teacher.id] = { data: imageUrl.data, url: imageUrl.config.url };
                    }
                }),
            );
            console.log(teacherImageMap);
            setTeacherImages(teacherImageMap);
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
                        {item.teacher && (
                            <img
                                className={cx('image')}
                                src={
                                    teacherImages[item.teacher.id] && teacherImages[item.teacher.id].data
                                        ? teacherImages[item.teacher.id].url
                                        : anhmacdinh
                                }
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
