import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    getAllBlock,
    getAllClassesByYearAndBlock,
    getAllTeacher,
    getImage,
    importStudentsFromExcel,
    putAllTeachersToClasses,
    userLogin,
    getAllStudentsOfClass,
    deleteUserClass,
} from './axios';
import authSlice from '../ReducerSlice/authSlice';
import blockSlice from '../ReducerSlice/blockSlice';
import classesSlice from '../ReducerSlice/classesSlice';
import teacherSlice from '../ReducerSlice/teacherSlice';
import studentSlice from '../ReducerSlice/studentSlice';

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
                    } else if (role.includes('USER')) {
                        navigate(-1);
                    }
                    toast.success('Đăng nhập thành công');
                })
                .catch((error) => {
                    dispatch(authSlice.actions.LOGIN_FAILURE(error.message));
                    toast.error('Đăng nhập thất bại');
                    setDatalogin({
                        email: '',
                        password: '',
                    });
                    usernameInputRef.current.focus();
                });
        }, 2000);
    };

    const getImageOfUser = async (user) => {
        try {
            const response = await getImage(user.id, { responseType: 'blob' });
            const imageUrl = URL.createObjectURL(response.data);
            return imageUrl;
        } catch (error) {
            console.error('Error fetching image:', error);
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
            const response = await importStudentsFromExcel(idlop, formatData, token);
            if (response.status === 200) {
                getallstudentsofclass(idlop);
            }
            toast.success('Import thành công');
        } catch (error) {
            dispatch(studentSlice.actions.PUT_STUDENTS_TO_CLASS_FAILURE(error.message));
            toast.error('Thất bại');
        }
    };

    const getallstudentsofclass = async (idlop, page, size, keyword) => {
        try {
            const response = await getAllStudentsOfClass(idlop, page, size, keyword);
            dispatch(studentSlice.actions.PUT_STUDENTS_TO_CLASS_SUCCESS(response.data));
        } catch (error) {
            dispatch(studentSlice.actions.PUT_STUDENTS_TO_CLASS_FAILURE(error.message));
        }
    };

    const deleteUserfromClass = async (userid, classid, token, page, keyword) => {
        try {
            const response = await deleteUserClass(userid, classid, token);
            if (response.status === 200) {
                getallstudentsofclass(classid, page, null, keyword);
                toast.success('học sinh đã được xóa');
            } else {
                toast.error('thất bại');
            }
        } catch (error) {
            toast.error('thất bại');
        }
    };

    return {
        logoutUser,
        loginUser,
        fecthBlock,
        fecthClasses,
        fetchTeachers,
        putteacherstoclasses,
        getImageOfUser,
        putStudentsFromExcel,
        getallstudentsofclass,
        deleteUserfromClass,
    };
};
