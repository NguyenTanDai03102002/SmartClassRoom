import { useEffect } from 'react';
import { useHandleDispatch } from '../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { userToken } from '../redux/selectors';

const useTokenRefresh = () => {
    const token = useSelector(userToken);
    const { refreshtoken } = useHandleDispatch();

    useEffect(() => {
        const checkTokenExpiry = async () => {
            const expiryTime = localStorage.getItem('expiryTime');
            if (expiryTime && Date.now() > expiryTime - 5 * 60 * 1000) {
                try {
                    await refreshtoken(token);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        checkTokenExpiry();

        const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [token]);
};

export default useTokenRefresh;
