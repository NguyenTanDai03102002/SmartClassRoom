import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './giaovien.module.scss';
import Table from '../../../Component/Table/Index';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { Teachers, dataexcel, loadingExcel, userToken } from '../../../redux/selectors';
import { toast } from 'react-toastify';
import Loading from '../../../Component/Loading/Index';

const cx = classNames.bind(styles);

function Index() {
    const token = useSelector(userToken);
    const datateachers = useSelector(Teachers);
    const { fetchTeachersPage, importteachersExcel, addteachertosv, getImageOfUser, editTeacher, deleteTeacher } =
        useHandleDispatch();
    const [showModal, setShowModel] = useState(false);
    const [editting, setEditting] = useState(false);
    const exceldata = useSelector(dataexcel);
    const loading = useSelector(loadingExcel);
    const totalPages = useSelector((state) => state.teacher.totalPages);
    const [currentPage, setCurrentPage] = useState(0);
    const [keyword, setKeyword] = useState('');
    const refmaSo = useRef();
    const reffullName = useRef();
    const refbirthday = useRef();
    const refaddress = useRef();
    const refphoneNumber = useRef();
    const refemail = useRef();
    const refpassword = useRef();
    const data = {
        header: ['Mã số cán bộ', 'Họ và tên', 'Giới tính', 'Số điện thoại', 'Địa chỉ', 'Email liên hệ', 'Thao tác'],
        content: datateachers.map((teacher) => ({
            id: teacher.id,
            maSo: teacher.maSo,
            fullName: teacher.fullName,
            sex: teacher.sex === 0 ? 'Nam' : 'Nữ',
            phoneNumber: teacher.phoneNumber,
            address: teacher.address,
            email: teacher.email,
        })),
    };

    const [valueTeacher, setValueTeacher] = useState({
        maSo: '',
        fullName: '',
        birthday: '',
        address: '',
        phoneNumber: '',
        sex: 0,
        email: '',
        password: '',
        image: '',
    });
    const handleChange = (e) => {
        setValueTeacher({
            ...valueTeacher,
            [e.target.name]:
                e.target.name === 'image'
                    ? e.target.files[0]
                    : e.target.name === 'sex'
                    ? e.target.value === '0'
                        ? 0
                        : 1
                    : e.target.value,
        });
    };
    const isinputvalid = (ref) => {
        return ref.current && ref.current.validity.valid;
    };
    const isinputvalidAll = () => {
        return (
            isinputvalid(refmaSo) &&
            isinputvalid(reffullName) &&
            isinputvalid(refbirthday) &&
            isinputvalid(refaddress) &&
            isinputvalid(refphoneNumber) &&
            isinputvalid(refemail) &&
            isinputvalid(refpassword)
        );
    };
    const refeshdata = () => {
        return setValueTeacher({
            maSo: '',
            fullName: '',
            birthday: '',
            address: '',
            phoneNumber: '',
            sex: 0,
            email: '',
            password: '',
            image: '',
        });
    };

    const handleAdd = async () => {
        if (isinputvalidAll()) {
            const data = {
                maSo: valueTeacher.maSo,
                fullName: valueTeacher.fullName,
                birthday: valueTeacher.birthday,
                address: valueTeacher.address,
                phoneNumber: valueTeacher.phoneNumber,
                sex: valueTeacher.sex,
                email: valueTeacher.email,
                password: valueTeacher.password,
            };
            const image = valueTeacher.image;
            const userdto = new Blob([JSON.stringify(data)], {
                type: 'application/json',
            });
            const formdata = new FormData();
            formdata.append('UserDTO', userdto);
            formdata.append('image', image);

            const res = await addteachertosv(token, formdata);
            if (res.status === 200) {
                fetchTeachersPage(token, currentPage, keyword);
                setShowModel(false);
                refeshdata();
                toast.success('Thêm thành công');
            } else {
                refmaSo.current.focus();
                toast.warning('Mã số đã tồn tại');
            }
        } else {
            toast.warning('Kiểm tra lại');
        }
    };
    console.log(valueTeacher);
    const inputs = [
        {
            type: 'file',
            name: 'image',
            url: valueTeacher.image,
        },
        {
            refer: refmaSo,
            type: 'text',
            placeholder: 'Nhập mã số',
            name: 'maSo',
            pattern: 'CB[0-9]{6}',
            value: valueTeacher.maSo,
            errorMessage: 'Mã số phải có CB kèm theo 6 số',
            required: true,
            disabled: editting,
        },
        {
            refer: reffullName,
            type: 'text',
            placeholder: 'Nhập họ tên',
            errorMessage: 'Không được để trống',
            name: 'fullName',
            value: valueTeacher.fullName,
            required: true,
        },
        {
            type: 'radio',
            label: 'Nam',
            name: 'sex',
            value: '0',
            checked: valueTeacher.sex === 0,
        },
        {
            type: 'radio',
            label: 'Nữ',
            name: 'sex',
            value: '1',
            checked: valueTeacher.sex === 1,
        },
        {
            refer: refbirthday,
            type: 'date',
            name: 'birthday',
            errorMessage: 'Không được để trống',
            value: valueTeacher.birthday,
            required: true,
        },
        {
            refer: refaddress,
            type: 'text',
            placeholder: 'nhập địa chỉ',
            value: valueTeacher.address,
            name: 'address',
            errorMessage: 'Không được để trống',
            required: true,
        },
        {
            refer: refphoneNumber,
            type: 'text',
            placeholder: 'Nhập số điện thoại',
            value: valueTeacher.phoneNumber,
            name: 'phoneNumber',
            pattern: '[0-9]{10}',
            required: true,
            errorMessage: 'phải đúng 10 số',
        },
        {
            refer: refemail,
            type: 'email',
            placeholder: 'nhập email',
            name: 'email',
            value: valueTeacher.email,
            required: true,
            errorMessage: 'đúng dạng ...@gmail.com',
        },
        {
            refer: refpassword,
            type: 'password',
            value: valueTeacher.password,
            placeholder: 'nhập password',
            name: 'password',
            required: true,
            errorMessage: 'Không được để trống',
        },
    ];

    useEffect(() => {
        if (exceldata.length !== 0) {
            const formatData = exceldata.map((item) => {
                const date = new Date(item['Ngày Sinh']).toLocaleDateString('en-GB');
                const parts = date.split('/');
                const formatdate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                const formatSex = item['Giới Tính'].toLowerCase() === 'nam' ? 0 : 1;
                return {
                    maSo: item['Mã Cán Bộ'],
                    fullName: item['Họ Tên'],
                    sex: formatSex,
                    birthday: formatdate,
                    address: item['Địa chỉ'],
                    phoneNumber: item['Số điện thoại'],
                    email: item['Email'],
                    password: item['password'],
                };
            });
            const putdatasv = async () => {
                const reponse = await importteachersExcel(token, formatData);
                if (reponse.status === 200) {
                    fetchTeachersPage(token, 0, '');
                    toast.success('import thành công');
                }
            };
            putdatasv();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exceldata]);

    useEffect(() => {
        fetchTeachersPage(token, currentPage, keyword);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, keyword]);

    const handleDelete = async (id) => {
        const res = await deleteTeacher(id, token);
        if (res.status === 200) {
            toast.success('Đã xóa');
            fetchTeachersPage(token, currentPage, keyword);
        } else {
            toast.error('Không thể xóa');
        }
    };
    const handleEdit = async (id) => {
        const useredit = datateachers.find((item) => item.id === id);
        setShowModel(true);
        setEditting(true);
        const res = await getImageOfUser(useredit);
        setValueTeacher({
            id: id,
            maSo: useredit.maSo ? useredit.maSo : '',
            fullName: useredit.fullName ? useredit.fullName : '',
            birthday: useredit.birthday ? useredit.birthday : '',
            address: useredit.address ? useredit.address : '',
            phoneNumber: useredit.phoneNumber ? useredit.phoneNumber : '',
            sex: useredit.sex,
            email: useredit.email ? useredit.email : '',
            password: useredit.password ? useredit.password : '',
            image: res.data ? res.config.url : '',
        });
    };
    const handleSubmitEdit = async () => {
        if (isinputvalidAll()) {
            const formdata = new FormData();
            const image = valueTeacher.image instanceof File ? valueTeacher.image : '';
            const data = {
                maSo: valueTeacher.maSo,
                fullName: valueTeacher.fullName,
                birthday: valueTeacher.birthday,
                address: valueTeacher.address,
                phoneNumber: valueTeacher.phoneNumber,
                sex: valueTeacher.sex,
                email: valueTeacher.email,
                password: valueTeacher.password,
            };
            const userdto = new Blob([JSON.stringify(data)], {
                type: 'application/json',
            });
            formdata.append('UserDTO', userdto);
            formdata.append('image', image);

            const res = await editTeacher(valueTeacher.id, token, formdata);
            if (res.status === 200) {
                setShowModel(false);
                fetchTeachersPage(token, currentPage, keyword);
                toast.success('Chỉnh sửa thành công');
            }
        } else {
            toast.warning('Kiểm tra lại');
        }
    };

    const handleDetail = (id) => {
        console.log(id);
    };

    const props = {
        Label: 'Quản Lý Giáo Viên',
        LabelModal: 'Thông Tin Cán Bộ',
        titlesearch: 'Nhập tên cán bộ',
        data,
        inputs,
        handleDelete,
        handleEdit,
        handleDetail,
        showModal,
        setShowModel,
        editting,
        setEditting,
        totalPages,
        currentPage,
        setCurrentPage,
        keyword,
        setKeyword,
        handleChange,
        handleAdd,
        handleSubmitEdit,
        refeshdata,
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('table')}>
                <Table {...props} />
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default Index;
