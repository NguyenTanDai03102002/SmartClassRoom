import React from 'react';
import Tippy from '@tippyjs/react/headless';
import PopperWrapper from '../Wrapper';
import Styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';

const cx = classNames.bind(Styles);

function Menu({ children, items = [], className }) {
    const renderItems = () => {
        return items.map((item, index) => {
            return <MenuItem key={index} data={item} />;
        });
    };
    return (
        <Tippy
            delay={[0, 200]}
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list-content')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={className}>{renderItems()}</PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
