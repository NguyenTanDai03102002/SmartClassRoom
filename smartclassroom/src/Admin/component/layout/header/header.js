import Menu from '../../../../Component/popper/Menu/Menu';
import Styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Component/button/Button';
import { useSelector } from 'react-redux';
import { authUser } from '../../../../redux/selectors';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { useEffect, useState } from 'react';

const cx = classNames.bind(Styles);

const MenuItems = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ',
        to: '/profile',
    },
];

function Header() {
    const { logoutUser, getImageOfUser } = useHandleDispatch();
    const [userImage, setUserImage] = useState(null);

    const handleLogout = () => {
        logoutUser();
    };

    const user = useSelector(authUser);

    useEffect(() => {
        async function fetchUserImage() {
            try {
                const imageUrl = await getImageOfUser(user);
                if (imageUrl) {
                    setUserImage(imageUrl);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }
        fetchUserImage();
    }, [user]);
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
                        <img src={userImage} alt="anh"></img>
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
