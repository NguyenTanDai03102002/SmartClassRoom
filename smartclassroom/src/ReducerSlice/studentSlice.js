import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        students: [],
        totalPages: null,
        pageNumber: null,
        error: null,
    },
    reducers: {
        PUT_STUDENTS_TO_CLASS_SUCCESS: (state, action) => {
            state.error = null;
            state.students = action.payload.content;
            state.pageNumber = action.payload.pageable.pageNumber;
            state.totalPages = action.payload.totalPages;
        },
        PUT_STUDENTS_TO_CLASS_FAILURE: (state, action) => {
            state.error = action.payload;
            state.students = [];
        },
    },
});
export default studentSlice;
