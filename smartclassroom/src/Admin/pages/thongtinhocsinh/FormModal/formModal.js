import React, { useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './form.module.scss';
import Modal from '../../../../Component/Modal/Index';
import Button from '../../../../Component/button/Button';
import FormInput from '../../../../Component/Input/Index';
import AnhMacDinh from '../../../../Component/Image/anhdaidien.png';
import { toast } from 'react-toastify';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';

const cx = classNames.bind(Styles);

function FormModal(props) {
    const {
        showModal,
        idlop,
        token,
        TotalPages,
        keyword,
        setShowModal,
        currentPage,
        setCurrentPage,
        dataHS,
        setDataHS,
        editting,
        setEditting,
    } = props;
    const { AddStudentToClass, editStudentInClass } = useHandleDispatch();
    const masoref = useRef();
    const fullNameref = useRef();
    const birthdayref = useRef();
    const addressref = useRef();
    const phoneNumberref = useRef();
    const emailref = useRef();
    const passwordref = useRef();

    useEffect(() => {
        if (showModal && !editting) {
            masoref.current.focus();
        } else if (showModal && editting) {
            fullNameref.current.focus();
        }
    }, [showModal, editting]);

    const handleChange = (e) => {
        const value = e.target.value;
        setDataHS({ ...dataHS, [e.target.name]: e.target.name === 'sex' ? (value === '0' ? 0 : 1) : value });
    };

    const isInputValid = (ref) => {
        return ref.current && ref.current.validity && ref.current.validity.valid;
    };
    const successall = () => {
        return (
            isInputValid(masoref) &&
            isInputValid(fullNameref) &&
            isInputValid(birthdayref) &&
            isInputValid(addressref) &&
            isInputValid(phoneNumberref) &&
            isInputValid(emailref) &&
            isInputValid(passwordref) &&
            dataHS.image
        );
    };
    const resetdata = () => {
        return setDataHS({
            maSo: '',
            fullName: '',
            sex: 0,
            birthday: '',
            address: '',
            phoneNumber: '',
            email: '',
            password: '',
            image: '',
        });
    };
    const userDTO = () => {
        const userDTO = {
            maSo: dataHS.maSo,
            fullName: dataHS.fullName,
            birthday: dataHS.birthday,
            address: dataHS.address,
            email: dataHS.email,
            phoneNumber: dataHS.phoneNumber,
            password: dataHS.password,
        };
        return userDTO;
    };

    const handleAddHS = async () => {
        if (successall()) {
            const formData = new FormData();
            formData.append('image', dataHS.image);
            const blob = new Blob([JSON.stringify(userDTO())], {
                type: 'application/json',
            });
            formData.append('userDTO', blob);
            try {
                const res = await AddStudentToClass(idlop, formData, token, TotalPages, keyword, setCurrentPage);
                if (res && res.status === 204) {
                    setDataHS({ ...dataHS, maSo: '' });
                    masoref.current.focus();
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.warning('kiểm tra lại');
            return;
        }
        setShowModal(false);
        resetdata();
    };

    const handlesubmitEdit = () => {
        if (successall()) {
            const userid = dataHS.id;
            const formData = new FormData();
            formData.append('image', dataHS.image);
            const blob = new Blob([JSON.stringify(userDTO())], {
                type: 'application/json',
            });
            formData.append('userDTO', blob);
            editStudentInClass(idlop, userid, formData, token, currentPage, keyword);
        } else {
            toast.warning('kiểm tra lại');
            return;
        }

        setShowModal(false);
        resetdata();
        setEditting(false);
    };
    const inputs = [
        {
            spellCheck: 'fasle',
            refer: masoref,
            type: 'text',
            placeholder: 'nhập mã số',
            name: 'maSo',
            disabled: editting,
            pattern: 'HS[0-9]{6}',
            errorMessage: 'Mã số phải có HS đầu và 6 số kèm theo',
            required: true,
        },
        {
            spellCheck: 'fasle',
            refer: fullNameref,
            type: 'text',
            placeholder: 'nhập họ tên',
            name: 'fullName',
            errorMessage: 'Không được để trống',
            required: true,
        },
        {
            label: 'Nam',
            spellCheck: 'fasle',
            type: 'radio',
            name: 'sex',
            value: '0',
            checked: dataHS.sex === 0,
        },
        {
            label: 'Nữ',
            spellCheck: 'fasle',
            type: 'radio',
            name: 'sex',
            value: '1',
            checked: dataHS.sex === 1,
        },
        {
            type: 'Date',
            refer: birthdayref,
            name: 'birthday',
            required: true,
            errorMessage: 'Không được để trống',
        },
        {
            spellCheck: 'fasle',
            refer: addressref,
            type: 'text',
            placeholder: 'nhập địa chỉ',
            name: 'address',
            required: true,
            errorMessage: 'Không được để trống',
        },
        {
            spellCheck: 'fasle',
            refer: phoneNumberref,
            type: 'tel',
            placeholder: 'nhập số điện thoại',
            name: 'phoneNumber',
            pattern: '[0-9]{10}',
            required: true,
            errorMessage: 'phải đúng 10 số',
        },
        {
            spellCheck: 'fasle',
            refer: emailref,
            type: 'email',
            placeholder: 'nhập email',
            name: 'email',
            required: true,
            errorMessage: 'đúng dạng ...@gmail.com',
        },
        {
            refer: passwordref,
            spellCheck: 'fasle',
            type: 'password',
            placeholder: editting ? 'Nhập password mới' : 'Nhập password',
            name: 'password',
            required: true,
            errorMessage: 'Không được để trống',
        },
    ];

    return (
        <>
            {showModal && (
                <Modal form1000>
                    <div className={cx('content')}>
                        <div className={cx('header')}>THÔNG TIN HỌC SINH</div>
                        <div className={cx('body')}>
                            <div className={cx('image')}>
                                <div className={cx('anh')}>
                                    <img
                                        src={
                                            dataHS.image && dataHS.image instanceof File
                                                ? URL.createObjectURL(dataHS.image)
                                                : dataHS.image.data
                                                ? dataHS.image.config.url
                                                : AnhMacDinh
                                        }
                                        alt="anh"
                                    />
                                </div>
                                <label className={cx('label')} htmlFor="file">
                                    <div className={cx('choice')}>Chọn Ảnh</div>
                                </label>
                                <input
                                    id="file"
                                    className={cx('file')}
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setDataHS((prevDataHS) => ({
                                            ...prevDataHS,
                                            image: file,
                                        }));
                                    }}
                                />
                            </div>
                            <div className={cx('items')}>
                                {inputs.map((input, index) => (
                                    <div className={cx('item')} key={index}>
                                        {input.type === 'radio' ? (
                                            <div className={cx('gender')}>
                                                <input
                                                    {...input}
                                                    value={input.value}
                                                    checked={dataHS[input.name] === parseInt(input.value)}
                                                    onChange={handleChange}
                                                />
                                                <span>{input.label}</span>
                                            </div>
                                        ) : (
                                            <FormInput
                                                {...input}
                                                value={dataHS[input.name] || ''}
                                                handleChange={handleChange}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cx('button')}>
                            <Button
                                btn
                                onClick={() => {
                                    setShowModal(false);
                                    resetdata();
                                    setEditting(false);
                                }}
                            >
                                Đóng
                            </Button>
                            {!editting ? (
                                <Button btn onClick={handleAddHS}>
                                    Thêm
                                </Button>
                            ) : (
                                <Button btn onClick={handlesubmitEdit}>
                                    Lưu
                                </Button>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default FormModal;
