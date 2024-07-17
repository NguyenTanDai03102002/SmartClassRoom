import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Form.module.scss';
import FormInput from '../../Input/Index';
import AnhMacDinh from '../../Image/anhdaidien.png';

const cx = classNames.bind(Styles);

function Index(props) {
    const { LabelModal, inputs, handleChange } = props;
    return (
        <div className={cx('wrapper')}>
            <h3>{LabelModal}</h3>
            <div className={cx('items')}>
                {inputs && inputs.some((input) => input.type === 'file') && (
                    <div className={cx('items-file')}>
                        {inputs &&
                            inputs
                                .filter((input) => input.type === 'file')
                                .map((input, index) => (
                                    <div className={cx('item-file')} key={index}>
                                        <div className={cx('anh')}>
                                            <img
                                                src={
                                                    input.url && input.url instanceof File
                                                        ? URL.createObjectURL(input.url)
                                                        : input.url
                                                        ? input.url
                                                        : AnhMacDinh
                                                }
                                                alt="anh"
                                            />
                                        </div>
                                        <input
                                            id="file"
                                            {...input}
                                            style={{ display: 'none' }}
                                            onChange={handleChange}
                                        />
                                        <label className={cx('label')} htmlFor="file">
                                            <div className={cx('choice')}>Chọn Ảnh</div>
                                        </label>
                                    </div>
                                ))}
                    </div>
                )}

                <div className={cx('item-other')}>
                    {inputs &&
                        inputs
                            .filter((input) => input.type !== 'file')
                            .map((input, index) => (
                                <div className={cx('item')} key={index}>
                                    {input.type === 'radio' ? (
                                        <div className={cx('gender')}>
                                            <input
                                                {...input}
                                                value={input.value}
                                                checked={input.checked}
                                                onChange={handleChange}
                                            />
                                            <label>{input.label}</label>
                                        </div>
                                    ) : (
                                        <FormInput {...input} handleChange={handleChange} />
                                    )}
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
}

export default Index;
