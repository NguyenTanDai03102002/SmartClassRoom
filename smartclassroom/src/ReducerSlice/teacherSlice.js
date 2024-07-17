import { createSlice } from '@reduxjs/toolkit';

const teacherSlice = createSlice({
    name: 'teacher',
    initialState: {
        teachers: [],
        totalPages: null,
        pageNumber: null,
        loading: false,
        error: null,
    },
    reducers: {
        FETCH_ALL_TEACHERS_PAGE_SUCCESS: (state, action) => {
            state.error = null;
            state.loading = false;
            state.teachers = action.payload.content;
            state.pageNumber = action.payload.pageable.pageNumber;
            state.totalPages = action.payload.totalPages;
        },
        FETCH_ALL_TEACHERS_PAGE_REQUEST: (state) => {
            state.loading = true;
        },
        FETCH_ALL_TEACHERS_SUCCESS: (state, action) => {
            state.error = null;
            state.teachers = action.payload;
            state.pageNumber = null;
            state.totalPages = null;
        },

        FETCH_ALL_TEACHERS_FAILURE: (state, action) => {
            state.error = action.payload;
        },
    },
});

export default teacherSlice;
