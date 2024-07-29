import Menu from '../../../../Component/popper/Menu/Menu';
import Styles from './Header.module.scss';
import classNames from 'classnames/bind';
import anhmacdinh from '../../../../Component/Image/anhdaidien.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { authUser } from '../../../../redux/selectors';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Header() {
    const { logoutUser } = useHandleDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutUser();
    };
    const MenuItems = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Xem hồ sơ',
            to: '/profile',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            onclick: handleLogout,
        },
    ];

    const user = useSelector(authUser);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <img
                    src="https://res.cloudinary.com/danrswhe6/image/upload/v1722039908/Icon-ADMIN_fmd82o.png"
                    alt="anh"
                    onClick={() => navigate('/admin')}
                ></img>
            </div>
            <h2>HỆ THỐNG QUẢN LÝ</h2>
            <div className={cx('r')}>
                <Menu items={MenuItems}>
                    <div className={cx('header-right')}>
                        <img src={user?.imageUrl || anhmacdinh} alt="anh"></img>
                        {user ? <h4>Họ và tên : {user.fullName}</h4> : <h4>{''}</h4>}
                    </div>
                </Menu>
            </div>
        </header>
    );
}

export default Header;
