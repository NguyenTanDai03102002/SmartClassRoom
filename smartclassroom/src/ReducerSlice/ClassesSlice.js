const initialState = {
    classes: [],
    classLoading: false,
    classError: null,
};

const ClassesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ALL_CLASSES_REQUEST':
            return {
                ...state,
                classLoading: true,
            };
        case 'FETCH_ALL_CLASSES_SUCCESS':
            return {
                ...state,
                classes: action.payload,
                classLoading: false,
            };
        case 'FETCH_ALL_CLASSES_FAILURE':
            return {
                ...state,
                classes: [],
                classLoading: false,
                classError: action.payload,
            };
        default:
            return state;
    }
};
export default ClassesReducer;
