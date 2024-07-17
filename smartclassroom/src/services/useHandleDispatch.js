import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    getAllBlock,
    getAllClassesByYearAndBlock,
    getImage,
    importStudentsFromExcel,
    putAllTeachersToClasses,
    userLogin,
    getAllStudentsOfClass,
    deleteUserClass,
    addstudenttoclass,
    EditStudentInClass,
    getAllTeacherPage,
    getAllTeacher,
    importTeachersFromExcel,
    addteacher,
    editteacher,
    deleteteacher,
    GetAllSubject,
    XepGiangDay,
    GetGiangDayByTeacherId,
} from './axios';
import authSlice from '../ReducerSlice/authSlice';
import blockSlice from '../ReducerSlice/blockSlice';
import classesSlice from '../ReducerSlice/classesSlice';
import teacherSlice from '../ReducerSlice/teacherSlice';
import studentSlice from '../ReducerSlice/studentSlice';
import excelSlice from '../ReducerSlice/excelSilce';
import subjectSilce from '../ReducerSlice/subjectSlice';
import teachSlice from '../ReducerSlice/teachSlice';

export const useHandleDispatch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(authSlice.actions.LOGOUT_SUCCESS());
        toast.success('Logout thành công');
        navigate('/login');
    };
    const loginUser = (datalogin, setDatalogin, usernameInputRef) => {
        dispatch(authSlice.actions.LOGIN_REQUEST());

        setTimeout(() => {
            userLogin(datalogin)
                .then((response) => {
                    dispatch(authSlice.actions.LOGIN_SUCCESS(response.data));
                    const role = response.data.user.roles;
                    if (role.includes('ADMIN')) {
                        navigate('/admin');
                    } else if (role.includes('TEACHER')) {
                        navigate('/admin');
                    } else if (role.includes('USER')) {
                        navigate(-1);
                    }
                    toast.success('Đăng nhập thành công');
                })
                .catch((error) => {
                    dispatch(authSlice.actions.LOGIN_FAILURE(error.message));
                    toast.error('Đăng nhập thất bại');
                    setDatalogin({
                        maSo: '',
                        password: '',
                    });
                    usernameInputRef.current.focus();
                });
        }, 2000);
    };

    const getImageOfUser = async (user) => {
        try {
            const response = await getImage(user.id);
            return response;
        } catch (error) {
            return null;
        }
    };

    const fecthBlock = () => {
        dispatch(blockSlice.actions.FETCH_ALL_BLOCKS_REQUEST());

        getAllBlock()
            .then((reponse) => {
                dispatch(blockSlice.actions.FETCH_ALL_BLOCKS_SUCCESS(reponse.data));
            })
            .catch((error) => {
                dispatch(blockSlice.actions.FETCH_ALL_BLOCKS_FAILURE(error.message));
            });
    };

    const fecthClasses = (year, blockid) => {
        dispatch(classesSlice.actions.FETCH_ALL_CLASSES_REQUEST());

        getAllClassesByYearAndBlock(year, blockid)
            .then((reponse) => {
                dispatch(classesSlice.actions.FETCH_ALL_CLASSES_SUCCESS(reponse.data));
            })
            .catch((error) => {
                dispatch(classesSlice.actions.FETCH_ALL_CLASSES_FAILURE(error.message));
            });
    };
    const fetchTeachers = (token) => {
        getAllTeacher(token)
            .then((reponse) => {
                dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_SUCCESS(reponse.data));
            })
            .catch((error) => {
                dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_FAILURE(error.message));
            });
    };

    const fetchTeachersPage = async (token, currentPage, keyword) => {
        try {
            dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_PAGE_REQUEST());
            const reponse = await getAllTeacherPage(token, currentPage, keyword);
            dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_PAGE_SUCCESS(reponse.data));
        } catch (error) {
            dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_FAILURE(error.message));
        }
    };

    const importteachersExcel = async (token, formatData) => {
        try {
            dispatch(excelSlice.actions.IMPORT_DATA_LOADING());
            const res = await importTeachersFromExcel(token, formatData);
            if (res) {
                dispatch(excelSlice.actions.IMPORT_DATA_LOADING_SUCCES());
            }
            return res;
        } catch (error) {
            return null;
        }
    };
    const addteachertosv = async (token, formdata) => {
        try {
            const response = await addteacher(token, formdata);
            return response;
        } catch (error) {
            return null;
        }
    };
    const editTeacher = async (userid, token, formdata) => {
        try {
            const response = await editteacher(userid, token, formdata);
            return response;
        } catch (error) {
            return null;
        }
    };
    const deleteTeacher = async (userid, token) => {
        try {
            const response = await deleteteacher(userid, token);
            return response;
        } catch (error) {
            return null;
        }
    };

    const putteacherstoclasses = (selectedTeacher, token, setFinish, setEditing) => {
        putAllTeachersToClasses(selectedTeacher, token)
            .then((reponse) => {
                dispatch(classesSlice.actions.FETCH_ALL_CLASSES_SUCCESS(reponse.data));
                toast.success('Hoàn thành');
            })
            .catch((error) => {
                dispatch(classesSlice.actions.FETCH_ALL_CLASSES_FAILURE(error.message));
                toast.error('Thất bại');
            });
        setFinish(false);
        setEditing(false);
    };

    const putStudentsFromExcel = async (idlop, formatData, token) => {
        try {
            // dispatch(studentSlice.actions.LOADING());
            const response = await importStudentsFromExcel(idlop, formatData, token);
            if (response.status === 200) {
                getallstudentsofclass(idlop);
            }
            toast.success('Import thành công');
            return response;
        } catch (error) {
            dispatch(studentSlice.actions.PUT_STUDENTS_TO_CLASS_FAILURE(error.message));
            toast.error('Thất bại');
        }
    };

    const getallstudentsofclass = async (idlop, page, size, keyword) => {
        try {
            dispatch(studentSlice.actions.LOADING());
            const response = await getAllStudentsOfClass(idlop, page, size, keyword);
            dispatch(studentSlice.actions.PUT_STUDENTS_TO_CLASS_SUCCESS(response.data));
            return response;
        } catch (error) {
            dispatch(studentSlice.actions.PUT_STUDENTS_TO_CLASS_FAILURE(error.message));
        }
    };

    const deleteUserfromClass = async (userid, classid, token, page, keyword, setCurrentPage) => {
        try {
            const response = await deleteUserClass(userid, classid, token);
            if (response.status === 200) {
                toast.success('học sinh đã được xóa');
                const res = await getallstudentsofclass(classid, page, null, keyword);
                if (res && res.data.content.length === 0) {
                    setCurrentPage(Math.max(0, page - 1));
                }
            } else {
                toast.error('thất bại');
            }
        } catch (error) {
            toast.error('thất bại');
        }
    };

    const AddStudentToClass = async (idlop, formData, token, TotalPages, keyword, setCurrentPage) => {
        try {
            const response = await addstudenttoclass(idlop, formData, token);
            if (response.status === 200) {
                toast.success('Học sinh đã được thêm');
                const res = await getallstudentsofclass(idlop, Math.max(0, TotalPages - 1), null, keyword);
                setCurrentPage(Math.max(0, TotalPages - 1));
                if (res && res.data.totalPages > TotalPages) {
                    // getallstudentsofclass(idlop, Math.max(0, res.data.totalPages - 1), null, keyword);
                    setCurrentPage(Math.max(0, Math.max(0, res.data.totalPages - 1)));
                }
            } else {
                toast.error('mã số học sinh đã tồn tại');
                return response;
            }
        } catch (error) {
            toast.error('thất bại');
        }
    };

    const editStudentInClass = async (idlop, userid, formData, token, currentPage, keyword) => {
        try {
            const response = await EditStudentInClass(userid, formData, token);
            if (response && response.status === 200) {
                getallstudentsofclass(idlop, currentPage, null, keyword);
                toast.success('Học sinh đã được sửa');
            }
        } catch (error) {
            toast.error('thất bại');
        }
    };

    const getallSubject = async () => {
        try {
            dispatch(subjectSilce.actions.GET_ALL_SUBJECT_REQUEST());
            const reponse = await GetAllSubject();
            dispatch(subjectSilce.actions.GET_ALL_SUBJECT_SUCCESS(reponse.data));
        } catch (error) {
            dispatch(subjectSilce.actions.GET_ALL_SUBJECT_FAILURE(error));
        }
    };

    const xepgiangday = async (token, data) => {
        try {
            const reponse = await XepGiangDay(token, data);
            if (reponse.status === 200) {
                toast.success('Thành công');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getgiangdayByTeacherid = async (token, teacherId) => {
        try {
            dispatch(teachSlice.actions.FETCH_TEACHS_OF_TEACHER_REQUEST());
            const reponse = await GetGiangDayByTeacherId(token, teacherId);
            dispatch(teachSlice.actions.FETCH_TEACHS_OF_TEACHER_SUCCESS(reponse.data));
        } catch (error) {
            dispatch(teachSlice.actions.FETCH_TEACHS_OF_TEACHER_FAILURE(error));
        }
    };

    return {
        logoutUser,
        loginUser,
        fecthBlock,
        fecthClasses,
        fetchTeachers,
        fetchTeachersPage,
        putteacherstoclasses,
        importteachersExcel,
        addteachertosv,
        editTeacher,
        deleteTeacher,
        getImageOfUser,
        putStudentsFromExcel,
        getallstudentsofclass,
        deleteUserfromClass,
        AddStudentToClass,
        editStudentInClass,
        getallSubject,
        xepgiangday,
        getgiangdayByTeacherid,
    };
};
