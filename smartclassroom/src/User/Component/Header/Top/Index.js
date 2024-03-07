import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Top.module.scss';
import Button from '../../../../Component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { authUser } from '../../../../redux/selectors';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';

const cx = classNames.bind(Styles);

function Index() {
    const user = useSelector(authUser);

    const { logoutUser } = useHandleDispatch();

    const handleLogout = () => {
        logoutUser();
    };

    return (
        <div className={cx('header-top')}>
            <div className={cx('socical')}>
                <Button className={cx('link')} to="/">
                    <FontAwesomeIcon icon={faFacebook} className={cx('icon')} />
                </Button>
                <Button className={cx('link')} to="/">
                    <FontAwesomeIcon icon={faInstagram} className={cx('icon')} />
                </Button>
                <Button className={cx('link')} to="/">
                    <FontAwesomeIcon icon={faTiktok} className={cx('icon')} />
                </Button>
                <Button className={cx('link')} to="/">
                    <FontAwesomeIcon icon={faYoutube} className={cx('icon')} />
                </Button>
            </div>
            <div className={cx('contact')}>
                <FontAwesomeIcon icon={faEnvelope} className={cx('icon')} />
                <span className={cx('mail')}>thpt@gmail.com</span>
                {user ? (
                    <div className={cx('user_logged')}>
                        <span>Tên người dùng : {user.fullName}</span>
                        <span onClick={handleLogout} className={cx('logout')}>
                            Logout
                        </span>
                    </div>
                ) : (
                    <div className={cx('login')}>
                        <Button className={cx('btn-login')} to="/login">
                            Đăng nhập
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Index;
