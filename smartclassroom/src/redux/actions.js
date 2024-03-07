export const loginRequest = () => {
    return {
        type: 'LOGIN_REQUEST',
    };
};
export const loginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: user,
    };
};
export const loginFailure = (error) => {
    return {
        type: 'LOGIN_FAILURE',
        payload: error,
    };
};
export const logoutSuccess = () => {
    return {
        type: 'LOGOUT_SUCCESS',
    };
};

export const fetchAllBlocksRequest = () => {
    return {
        type: 'FETCH_ALL_BLOCKS_REQUEST',
    };
};
export const fetchAllBlocksSuccess = (blocks) => {
    return {
        type: 'FETCH_ALL_BLOCKS_SUCCESS',
        payload: blocks,
    };
};
export const fetchAllBlocksFailure = (error) => {
    return {
        type: 'FETCH_ALL_BLOCKS_FAILURE',
        payload: error,
    };
};

export const fetchAllClassesRequest = () => {
    return {
        type: 'FETCH_ALL_CLASSES_REQUEST',
    };
};
export const fetchAllClassesSuccess = (classes) => {
    return {
        type: 'FETCH_ALL_CLASSES_SUCCESS',
        payload: classes,
    };
};
export const fetchAllClassesFailure = (error) => {
    return {
        type: 'FETCH_ALL_CLASSES_FAILURE',
        payload: error,
    };
};

// export const putAllTeacherstoClassesSuccess = (TeachersClasses) => {
//     return {
//         type: 'PUT_ALL_TEACHERS_TO_CLASSES_SUCCESS',
//         payload: TeachersClasses,
//     };
// };
// export const putAllTeacherstoClassesFailure = (error) => {
//     return {
//         type: 'PUT_ALL_TEACHERS_TO_CLASSES_FAILURE',
//         payload: error,
//     };
// };
