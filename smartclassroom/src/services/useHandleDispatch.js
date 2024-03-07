import { useDispatch } from 'react-redux';
import {
    loginSuccess,
    loginFailure,
    loginRequest,
    logoutSuccess,
    fetchAllClassesRequest,
    fetchAllClassesSuccess,
    fetchAllClassesFailure,
} from '../redux/actions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAllBlock, getAllClassesByYear, userLogin } from './axios';
import { fetchAllBlocksFailure, fetchAllBlocksRequest, fetchAllBlocksSuccess } from '../redux/actions';

export const useHandleDispatch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(logoutSuccess());
        toast.success('Logout thành công');
        navigate('/login');
    };
    const loginUser = (datalogin, setDatalogin, usernameInputRef) => {
        dispatch(loginRequest());

        setTimeout(() => {
            userLogin(datalogin)
                .then((response) => {
                    dispatch(loginSuccess(response.data));
                    const role = response.data.user.roles;
                    if (role.includes('ADMIN')) {
                        navigate('/admin');
                    } else if (role.includes('USER')) {
                        navigate(-1);
                    }
                    toast.success('Đăng nhập thành công');
                })
                .catch((error) => {
                    dispatch(loginFailure(error.message));
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
        dispatch(fetchAllBlocksRequest());

        getAllBlock()
            .then((reponse) => {
                dispatch(fetchAllBlocksSuccess(reponse.data));
            })
            .catch((error) => {
                dispatch(fetchAllBlocksFailure(error.message));
            });
    };

    const fecthClasses = (year) => {
        dispatch(fetchAllClassesRequest());

        getAllClassesByYear(year)
            .then((reponse) => {
                dispatch(fetchAllClassesSuccess(reponse.data));
            })
            .catch((error) => {
                dispatch(fetchAllClassesFailure(error.message));
            });
    };

    return { logoutUser, loginUser, fecthBlock, fecthClasses };
};
