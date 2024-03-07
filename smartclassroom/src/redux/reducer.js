import AuthReducer from '../ReducerSlice/AuthSlice';
import BlockReducer from '../ReducerSlice/BlockSlice';
import ClassesReducer from '../ReducerSlice/ClassesSlice';

const rootReducer = (state = {}, action) => {
    return {
        auth: AuthReducer(state.auth, action),
        block: BlockReducer(state.block, action),
        class: ClassesReducer(state.class, action),
    };
};

export default rootReducer;
