import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { showErrorMessage, showSuccessMessage, showWarningMessage } from '../Component/Notification/Index';
import { useNavigate } from 'react-router-dom';
import {
    //User
    userLogin,
    getAllTeacher,

    //Grade
    getAllGrade,

    //SchoolYear
    getAllSchoolYear,

    //CLassEntity
    getAllClassesByYear,
    createClass,
    editClass,
    cpyData,
    deleteClass,

    //
    getAllClassesByYearAndBlock,
    importStudentsFromExcel,
    putAllTeachersToClasses,
    getAllStudentsOfClass,
    deleteUserClass,
    addstudenttoclass,
    EditStudentInClass,
    getAllTeacherPage,
    importTeachersFromExcel,
    addteacher,
    editteacher,
    deleteteacher,
    GetAllSubject,
    XepGiangDay,
    GetGiangDayByTeacherId,
    refreshToken,
} from './axios';
import authSlice from '../ReducerSlice/authSlice';
import classesSlice from '../ReducerSlice/classesSlice';
import teacherSlice from '../ReducerSlice/teacherSlice';
import studentSlice from '../ReducerSlice/studentSlice';
import excelSlice from '../ReducerSlice/excelSilce';
import subjectSilce from '../ReducerSlice/subjectSlice';
import teachSlice from '../ReducerSlice/teachSlice';
import schoolSlice from '../ReducerSlice/schoolYear';
import gradeSlice from '../ReducerSlice/gradeSlice';

export const useHandleDispatch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Authentication

    const logoutUser = () => {
        try {
            dispatch(authSlice.actions.LOGOUT_SUCCESS());
            showSuccessMessage('Logout thành công');
            navigate('/login');
        } catch (error) {}
    };

    const loginUser = async (datalogin, setDatalogin, usernameInputRef, prevPathname) => {
        try {
            dispatch(authSlice.actions.LOGIN_REQUEST());
            const response = await userLogin(datalogin);
            if (response.data.code === 1000) {
                dispatch(authSlice.actions.LOGIN_SUCCESS(response.data.result));
                const roleNames = response.data.result.user.roles.map((r) => r.name);
                if (prevPathname.startsWith('/admin')) {
                    if (roleNames.includes('ADMIN') || roleNames.includes('TEACHER')) {
                        navigate(prevPathname);
                    } else {
                        showWarningMessage('bạn không có quyền truy cập');
                        navigate('/');
                    }
                } else {
                    if (roleNames.includes('ADMIN') || roleNames.includes('TEACHER')) {
                        navigate('/admin');
                    } else {
                        navigate(prevPathname);
                    }
                }
            }
        } catch (error) {
            if (error.response.data.code === 1002) {
                dispatch(authSlice.actions.LOGIN_FAILURE(error.response.data.message));
                showErrorMessage(`${error.response.data.message}<br>Lý do: Mã số hoặc Password không đúng`).then(
                    (result) => {
                        if (result.isConfirmed) {
                            setDatalogin({
                                userCode: '',
                                password: '',
                            });
                            usernameInputRef.current.focus();
                        }
                    },
                );
            }
        }
    };

    const refreshtoken = async (token) => {
        try {
            const response = await refreshToken(token);
            if (response.data.code === 1000) {
                dispatch(authSlice.actions.REFESH_TOKEN(response.data.result.token));
            }
        } catch (error) {}
    };
    //USER
    const getallteacher = async (token) => {
        try {
            dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_REQUEST());
            const response = await getAllTeacher(token);
            if (response.data.code === 1000) {
                dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_FAILURE(error.response.data.message));
        }
    };

    //Schoolyear
    const getallschoolyear = async (keyWord = '') => {
        try {
            dispatch(schoolSlice.actions.FETCH_ALL_SchoolYears_REQUEST());
            const response = await getAllSchoolYear(keyWord);
            if (response.data.code === 1000) {
                dispatch(schoolSlice.actions.FETCH_ALL_SchoolYears_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(schoolSlice.actions.FETCH_ALL_SchoolYears_FAILURE(error.response.data.message));
        }
    };

    //ClassEntity
    const getallclassesbyyear = async (id, keyWord = '') => {
        try {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_REQUEST());
            const response = await getAllClassesByYear(id, keyWord);
            if (response.data.code === 1000) {
                dispatch(classesSlice.actions.FETCH_ALL_CLASSES_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_FAILURE(error.response.data.message));
        }
    };

    const createclass = async (token, dataAdd) => {
        try {
            const response = await createClass(token, dataAdd);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const editclass = async (token, dataEdit) => {
        try {
            const response = await editClass(token, dataEdit);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const deleteclass = async (token, dataDel) => {
        try {
            const response = await deleteClass(token, dataDel);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    const cpydata = async (token, schoolYearId) => {
        try {
            const response = await cpyData(token, schoolYearId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    //Grade
    const getallgrade = async () => {
        try {
            dispatch(gradeSlice.actions.FETCH_ALL_GRADES_REQUEST());
            const response = await getAllGrade();
            if (response.data.code === 1000) {
                dispatch(gradeSlice.actions.FETCH_ALL_GRADES_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(gradeSlice.actions.FETCH_ALL_GRADES_FAILURE(error.message));
        }
    };

    //

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
        //User
        logoutUser,
        loginUser,
        refreshtoken,
        getallteacher,

        //SchoolYear
        getallschoolyear,

        //ClassEntity
        getallclassesbyyear,
        createclass,
        deleteclass,
        editclass,
        cpydata,

        //Grade
        getallgrade,

        fecthClasses,
        fetchTeachersPage,
        putteacherstoclasses,
        importteachersExcel,
        addteachertosv,
        editTeacher,
        deleteTeacher,
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
