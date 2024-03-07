const initialState = {
    blocks: [],
    blockLoading: false,
    blockError: null,
};

const BlockReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ALL_BLOCKS_REQUEST':
            return {
                ...state,
                blockLoading: true,
            };
        case 'FETCH_ALL_BLOCKS_SUCCESS':
            return {
                ...state,
                blocks: action.payload,
                blockLoading: false,
            };
        case 'FETCH_ALL_BLOCKS_FAILURE':
            return {
                ...state,
                blocks: [],
                blockLoading: false,
                blockError: action.payload,
            };
        default:
            return state;
    }
};
export default BlockReducer;
