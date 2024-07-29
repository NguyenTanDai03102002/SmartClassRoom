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
            localStorage.setItem('expiryTime', Date.now() + 50 * 60 * 1000);
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
            localStorage.removeItem('expiryTime');
        },

        REFESH_TOKEN: (state, action) => {
            localStorage.removeItem('token');
            localStorage.setItem('token', action.payload);
            state.token = action.payload;
        },
    },
});
export default authSlice;
