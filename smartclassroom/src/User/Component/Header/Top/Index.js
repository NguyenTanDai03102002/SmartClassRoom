import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Top.module.scss';
import Button from '../../../../Component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGear } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { authUser } from '../../../../redux/selectors';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import Tooltip from '../../../../Component/Tooltip/Index';

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
                <Tooltip content="Facebook">
                    <div className={cx('link')}>
                        <Button to="/">
                            <FontAwesomeIcon icon={faFacebook} className={cx('icon')} />
                        </Button>
                    </div>
                </Tooltip>
                <Tooltip content="Instagram">
                    <div className={cx('link')}>
                        <Button to="/">
                            <FontAwesomeIcon icon={faInstagram} className={cx('icon')} />
                        </Button>
                    </div>
                </Tooltip>
                <Tooltip content="Tiktok">
                    <div className={cx('link')}>
                        <Button to="/">
                            <FontAwesomeIcon icon={faTiktok} className={cx('icon')} />
                        </Button>
                    </div>
                </Tooltip>
                <Tooltip content="Youtube">
                    <div className={cx('link')}>
                        <Button to="/">
                            <FontAwesomeIcon icon={faYoutube} className={cx('icon')} />
                        </Button>
                    </div>
                </Tooltip>
            </div>
            <div className={cx('contact')}>
                <Tooltip content="Email liên hệ">
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} className={cx('icon')} />
                        <span className={cx('mail')}>ndai6618@gmail.com</span>
                    </div>
                </Tooltip>

                {user ? (
                    <div className={cx('user_logged')}>
                        <span>Tên người dùng : {user.fullName}</span>
                        <span onClick={handleLogout} className={cx('logout')}>
                            Logout
                        </span>
                    </div>
                ) : (
                    <Tooltip content="Hệ thống quản lý">
                        <div className={cx('admin')}>
                            <Button className={cx('admin-login')} to="/admin">
                                <FontAwesomeIcon icon={faGear} className={cx('icon')} />
                            </Button>
                        </div>
                    </Tooltip>
                )}
            </div>
        </div>
    );
}

export default Index;
