import React, { useState } from 'react';
import Styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faLayerGroup, faUsers } from '@fortawesome/free-solid-svg-icons';
import MenuItem from './Menu/MenuItem';
import Menu from './Menu/Menu';
import { useLocation, useParams } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Sidebar() {
    const location = useLocation();

    const { idkhoi, idlop } = useParams();

    const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);

    const handleHidesidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={cx('wrapper', { collapsed: isSidebarCollapsed === false })}>
            <div className={cx('logo-details')}>
                {isSidebarCollapsed && <div className={cx('logo-name')}>MENU</div>}
                <FontAwesomeIcon icon={faBars} className={cx('logo-icon')} onClick={handleHidesidebar} />
            </div>

            <Menu>
                <MenuItem
                    title="Học sinh"
                    to={`/admin/khoi/${idkhoi}/lop/${idlop}/hocsinh`}
                    icon={<FontAwesomeIcon icon={faUsers} />}
                    active={location.pathname.includes('/hocsinh')}
                    isSidebarCollapsed={isSidebarCollapsed}
                />
                <MenuItem
                    title="Bảng điểm"
                    to={`/admin/khoi/${idkhoi}/lop/${idlop}/diem`}
                    icon={<FontAwesomeIcon icon={faLayerGroup} />}
                    active={location.pathname.includes('/diem')}
                    isSidebarCollapsed={isSidebarCollapsed}
                />
            </Menu>
        </div>
    );
}

export default Sidebar;
