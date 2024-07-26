import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Select.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Index({ title, dataOptions, onclick }) {
    const [selectedOption, setSelectedOption] = useState(title);
    const [search, setSearch] = useState('');

    const handleOptionClick = (id, nameOption) => {
        setSelectedOption(nameOption);
        onclick(id);
    };
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    const filteredOptions = (dataOptions || []).filter((option) =>
        option.nameOption.toLowerCase().includes(search.toLowerCase()),
    );
    return (
        <div className={cx('wrapper')}>
            <div className={cx('select-option')}>
                <div className={cx('select-btn')}>
                    <span>{selectedOption}</span>
                    <FontAwesomeIcon className={cx('icon')} icon={faAngleDown} />
                </div>
                <div className={cx('content')}>
                    <div className={cx('seach')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faSearch} />
                        <input type="text" placeholder="seach" onChange={handleSearchChange} />
                    </div>
                    <ul className={cx('options')}>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <li key={index} onClick={() => handleOptionClick(option.id, option.nameOption)}>
                                    {option.nameOption}
                                </li>
                            ))
                        ) : (
                            <li className={cx('no-data-message')}>Không có dữ liệu</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Index;
