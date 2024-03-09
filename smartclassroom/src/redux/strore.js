import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../ReducerSlice/authSlice';
import blockSlice from '../ReducerSlice/blockSlice';
import classesSlice from '../ReducerSlice/classesSlice';
import teacherSlice from '../ReducerSlice/teacherSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        block: blockSlice.reducer,
        class: classesSlice.reducer,
        teacher: teacherSlice.reducer,
    },
});

export default store;

// import { createStore } from 'redux';
// import rootReducer from './reducer';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const composedEnhancers = composeWithDevTools();

// const store = createStore(rootReducer, composedEnhancers);

// export default store;
