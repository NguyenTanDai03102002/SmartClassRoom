import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import Styles from './Seach.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Seach({ placeholder, keyword, setKeyword }) {
    const ref = useRef();
    const handleChangeKeyWord = (e) => {
        setKeyword(e.target.value);
    };
    return (
        <div className={cx('seach')}>
            <input
                ref={ref}
                placeholder={placeholder}
                spellCheck={false}
                value={keyword}
                onChange={handleChangeKeyWord}
            />

            {keyword && (
                <button
                    className={cx('remove')}
                    onClick={() => {
                        setKeyword('');
                    }}
                >
                    <FontAwesomeIcon icon={faCircleXmark} />
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
