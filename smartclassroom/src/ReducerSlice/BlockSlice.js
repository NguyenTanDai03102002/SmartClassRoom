import { createSlice } from '@reduxjs/toolkit';

const blockSlice = createSlice({
    name: 'block',
    initialState: {
        blocks: [],
        blockLoading: false,
        blockError: null,
    },

    reducers: {
        FETCH_ALL_BLOCKS_REQUEST: (state) => {
            state.blockLoading = true;
        },
        FETCH_ALL_BLOCKS_SUCCESS: (state, action) => {
            state.blockLoading = false;
            state.blocks = action.payload;
        },
        FETCH_ALL_BLOCKS_FAILURE: (state, action) => {
            state.blockLoading = false;
            state.blockError = action.payload;
        },
    },
});

export default blockSlice;

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
