import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import Styles from './Menu.module.scss';

const cx = classNames.bind(Styles);

function MenuItem({ title, to, icon, active, isSidebarCollapsed }) {
    return (
        <NavLink className={cx('menu-item', { active }, { collapsed: isSidebarCollapsed === false })} to={to}>
            <span className={cx('icon')}>{icon}</span>
            {isSidebarCollapsed && <span className={cx('title')}>{title}</span>}
        </NavLink>
    );
}

export default MenuItem;
