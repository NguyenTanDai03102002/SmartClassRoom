import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAllBlock, getAllClassesByYear, getAllTeacher, putAllTeachersToClasses, userLogin } from './axios';
import authSlice from '../ReducerSlice/authSlice';
import blockSlice from '../ReducerSlice/blockSlice';
import classesSlice from '../ReducerSlice/classesSlice';
import teacherSlice from '../ReducerSlice/teacherSlice';

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

    const fecthClasses = (year) => {
        dispatch(classesSlice.actions.FETCH_ALL_CLASSES_REQUEST());

        getAllClassesByYear(year)
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

    return { logoutUser, loginUser, fecthBlock, fecthClasses, fetchTeachers, putteacherstoclasses };
};
