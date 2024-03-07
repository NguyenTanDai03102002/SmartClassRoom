import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Tuvan.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Component/button/Button';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('heading')}>ĐỊNH HƯỚNG NGHỀ NGHIỆP</div>
            </div>
            {/* <div className={cx('preview')}>
                <h2>Học sinh nên làm gì để tự định hướng nghề nghiệp cho bản thân?</h2>
                <div className={cx('time')}>
                    <span className={cx('date-submit')}>Ngày đăng: 21/12/2021</span>
                    <span className={cx('date-update')}>Ngày cập nhật: 21/12/2021</span>
                    <span className={cx('author')}>Tác giả: Nguyễn Đại</span>
                </div>
            </div> */}
            <div className={cx('content')}>
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        <Button className={cx('question')} to="/">
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <span>Tại sao phụ huynh học sinh lựa chọn </span>
                        </Button>
                        <Button className={cx('question')} to="/">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span>câu hỏi thường gặp</span>
                        </Button>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('form')}>
                            <h2 className={cx('heading')}>Đăng ký nhận thông tin tuyển sinh</h2>
                            <div className={cx('form-input')}>
                                <input type="text" placeholder="Họ và tên học sinh" />
                            </div>
                            <div className={cx('form-input-2')}>
                                <input type="text" placeholder="năm sinh" />
                                <input type="text" placeholder="Tỉnh/TP" />
                            </div>
                            <div className={cx('form-input-2')}>
                                <input type="text" placeholder="SĐT phụ huynh" />
                                <input type="text" placeholder="Email" />
                            </div>
                            <div className={cx('form-input')}>
                                <input type="text" placeholder="Link facebook" />
                            </div>
                            <div className={cx('check-box')}>
                                <span>Đăng ký (có thể chọn nhiều nhu cầu)</span>
                                <div className={cx('list-checkbox')}>
                                    <div className={cx('item-checkbox')}>
                                        <input type="checkbox" />
                                        <span>xét tuyển</span>
                                    </div>
                                    <div className={cx('item-checkbox')}>
                                        <input type="checkbox" />
                                        <span>Tham quan</span>
                                    </div>
                                    <div className={cx('item-checkbox')}>
                                        <input type="checkbox" />
                                        <span>Học bổng</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('text')}>
                                <span>Thông tin Phụ huynh/Học sinh muốn được tư vấn?</span>
                                <textarea typeof="text" />
                            </div>
                            <div className={cx('btn-submit')}>
                                <Button className={cx('submit')} to="/">
                                    Gửi Đăng Ký
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
