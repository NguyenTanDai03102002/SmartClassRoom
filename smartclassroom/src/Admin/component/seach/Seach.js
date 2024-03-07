import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Seach.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import PopperWrapper from '../../../Component/popper/Wrapper';

const cx = classNames.bind(Styles);

function Seach({ children, searchTerm, setSearchTerm }) {
    const [searchResult, setSearchResult] = useState([]);
    const inputref = useRef();

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        });
    }, []);

    return (
        <div className={cx('seach')}>
            <Tippy
                interactive
                visible={searchResult.length > 0}
                placement="bottom"
                render={(attrs) => (
                    <div className={cx('seach-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>{children}</PopperWrapper>
                    </div>
                )}
            >
                <input
                    ref={inputref}
                    placeholder="nhập tên học sinh"
                    spellCheck={false}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Tippy>

            {!!searchTerm && (
                <button className={cx('remove')}>
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        onClick={() => {
                            setSearchTerm('');
                            inputref.current.focus();
                        }}
                    />
                </button>
            )}
            {/* <FontAwesomeIcon icon={faSpinner} className={cx('loading')} /> */}

            <button className={cx('seach-btn')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    );
}

export default Seach;
