import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers: {
        LOGIN_REQUEST: (state) => {
            state.loading = true;
        },
        LOGIN_SUCCESS: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
        },
        LOGIN_FAILURE: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        LOGOUT_SUCCESS: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});
export default authSlice;

// const initialState = {
//     user: JSON.parse(localStorage.getItem('user')) || null,
//     token: localStorage.getItem('token') || null,
//     loading: false,
//     error: null,
// };

// const AuthReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'LOGIN_REQUEST':
//             return {
//                 ...state,
//                 loading: true,
//             };
//         case 'LOGIN_SUCCESS':
//             localStorage.setItem('user', JSON.stringify(action.payload.user));
//             localStorage.setItem('token', action.payload.token);
//             return {
//                 ...state,
//                 user: action.payload.user,
//                 token: action.payload.token,
//                 loading: false,
//             };
//         case 'LOGIN_FAILURE':
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false,
//             };
//         case 'LOGOUT_SUCCESS':
//             localStorage.removeItem('user');
//             localStorage.removeItem('token');
//             return {
//                 ...state,
//                 user: null,
//                 token: null,
//             };

//         default:
//             return state;
//     }
// };

// export default AuthReducer;
