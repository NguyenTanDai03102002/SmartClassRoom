import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Styles from './login.module.scss';
import { toast } from 'react-toastify';
import { authLoading } from '../../redux/selectors';
import { useHandleDispatch } from '../../services/useHandleDispatch';

const cx = classNames.bind(Styles);

function Login2() {
    const [datalogin, setDatalogin] = useState({
        username: '',
        password: '',
    });

    const { loginUser } = useHandleDispatch();

    const usernameInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const loading = useSelector(authLoading);

    const handleChange = (e) => {
        const value = e.target.value;
        setDatalogin({ ...datalogin, [e.target.name]: value });
    };
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (datalogin.username.trim() === '') {
            usernameInputRef.current.focus();
            toast.warn('Bạn phải nhập đầy đủ thông tin');
            return;
        }
        if (datalogin.password.trim() === '') {
            passwordInputRef.current.focus();
            toast.warn('Bạn phải nhập đầy đủ thông tin');
            return;
        }
        loginUser(datalogin, setDatalogin, usernameInputRef);
    };
    useEffect(() => {
        usernameInputRef.current.focus();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>Đăng nhập</div>
                {loading && (
                    <div className={cx('loading')}>
                        <div>Loading</div>
                        <div className={cx('dot-container')}>
                            <div className={cx('dot')}></div>
                            <div className={cx('dot')}></div>
                            <div className={cx('dot')}></div>
                        </div>
                    </div>
                )}

                <form>
                    <input
                        type="text"
                        value={datalogin.username}
                        name="username"
                        ref={usernameInputRef}
                        onChange={(e) => handleChange(e)}
                        placeholder="nhập username"
                    />
                    <input
                        type="password"
                        value={datalogin.password}
                        name="password"
                        ref={passwordInputRef}
                        onChange={(e) => handleChange(e)}
                        placeholder="nhập password"
                    />
                    <div className={cx('forget-password')}>Quên mật khẩu?</div>

                    <button onClick={handleSubmitClick}>Đăng nhập</button>
                </form>
            </div>
        </div>
    );
}

export default Login2;
