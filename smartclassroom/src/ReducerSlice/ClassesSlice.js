import { createSlice } from '@reduxjs/toolkit';

const classesSlice = createSlice({
    name: 'class',
    initialState: {
        classes: [],
        classLoading: false,
        classError: null,
    },
    reducers: {
        FETCH_ALL_CLASSES_REQUEST: (state) => {
            state.classLoading = true;
        },
        FETCH_ALL_CLASSES_SUCCESS: (state, action) => {
            state.classes = action.payload;
            state.classLoading = false;
        },
        FETCH_ALL_CLASSES_FAILURE: (state, action) => {
            state.classError = action.payload;
            state.classLoading = false;
        },
    },
});

export default classesSlice;

// const initialState = {
//     classes: [],
//     classLoading: false,
//     classError: null,
// };

// const ClassesReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FETCH_ALL_CLASSES_REQUEST':
//             return {
//                 ...state,
//                 classLoading: true,
//             };
//         case 'FETCH_ALL_CLASSES_SUCCESS':
//             return {
//                 ...state,
//                 classes: action.payload,
//                 classLoading: false,
//             };
//         case 'FETCH_ALL_CLASSES_FAILURE':
//             return {
//                 ...state,
//                 classes: [],
//                 classLoading: false,
//                 classError: action.payload,
//             };
//         default:
//             return state;
//     }
// };
// export default ClassesReducer;
