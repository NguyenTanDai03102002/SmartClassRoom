import Menu from '../../../../Component/popper/Menu/Index';
import Styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Component/button/Button';
import { useSelector } from 'react-redux';
import { authUser } from '../../../../redux/selectors';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';

const cx = classNames.bind(Styles);

const MenuItems = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ',
        to: '/profile',
    },
];

function Header() {
    const { logoutUser } = useHandleDispatch();

    const handleLogout = () => {
        logoutUser();
    };

    const user = useSelector(authUser);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <img
                    src="https://tse2.mm.bing.net/th?id=OIP._JipwczdXg8Vm7Vv7CkEhQHaHv&pid=Api&P=0&h=180"
                    alt="anh"
                ></img>
            </div>
            <h2>HỆ THỐNG QUẢN LÝ</h2>
            <div className={cx('r')}>
                <Menu items={MenuItems}>
                    <div className={cx('header-right')}>
                        <img
                            src="https://tse1.mm.bing.net/th?id=OIP.bsTORn_mndhaTrs-iG9hwAHaHa&pid=Api&P=0&h=180"
                            alt="anh"
                        ></img>
                        {user ? <h4>{user.fullName}</h4> : <h4>{''}</h4>}
                    </div>
                </Menu>
                {user && (
                    <Button className={cx('logout')} onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </div>
        </header>
    );
}

export default Header;
