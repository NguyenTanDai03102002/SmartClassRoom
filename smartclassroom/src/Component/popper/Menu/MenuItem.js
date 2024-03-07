import React, { useState } from 'react';
import Button from '../../button/Button';
import Styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);
function MenuItem({ data }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <div className={classes} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Button className={cx('menu-item-content')} to={data.to}>
                <span className={cx('icon')}>{data.icon}</span>
                <p>{data.title}</p>
            </Button>
            {data.dataChildren && isHovered && (
                <div className={cx('menu-dropdown')}>
                    {data.dataChildren.map((item, index) => (
                        <Button className={cx('menu-dropdown-item')} to={item.to} key={index}>
                            <FontAwesomeIcon icon={faCaretRight} className={cx('menu-dropdown-item-icon')} />
                            <span>{item.title}</span>
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MenuItem;
