import { createSlice } from '@reduxjs/toolkit';

const gradeSlice = createSlice({
    name: 'grade',
    initialState: {
        grades: [],
        Loading: false,
        Error: null,
    },

    reducers: {
        FETCH_ALL_GRADES_REQUEST: (state) => {
            state.Loading = true;
        },
        FETCH_ALL_GRADES_SUCCESS: (state, action) => {
            state.Loading = false;
            state.grades = action.payload;
            state.Error = null;
        },
        FETCH_ALL_GRADES_FAILURE: (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        },
    },
});

export default gradeSlice;

// const initialState = {
//     blocks: [],
//     blockLoading: false,
//     blockError: null,
// };

// const BlockReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FETCH_ALL_BLOCKS_REQUEST':
//             return {
//                 ...state,
//                 blockLoading: true,
//             };
//         case 'FETCH_ALL_BLOCKS_SUCCESS':
//             return {
//                 ...state,
//                 blocks: action.payload,
//                 blockLoading: false,
//             };
//         case 'FETCH_ALL_BLOCKS_FAILURE':
//             return {
//                 ...state,
//                 blocks: [],
//                 blockLoading: false,
//                 blockError: action.payload,
//             };
//         default:
//             return state;
//     }
// };
// export default BlockReducer;
