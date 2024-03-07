const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'LOGIN_SUCCESS':
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'LOGOUT_SUCCESS':
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
            };

        default:
            return state;
    }
};

export default AuthReducer;
