import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../ReducerSlice/authSlice';
import blockSlice from '../ReducerSlice/blockSlice';
import classesSlice from '../ReducerSlice/classesSlice';
import teacherSlice from '../ReducerSlice/teacherSlice';
import studentSlice from '../ReducerSlice/studentSlice';
import excelSlice from '../ReducerSlice/excelSilce';
import subjectSilce from '../ReducerSlice/subjectSlice';
import teachSlice from '../ReducerSlice/teachSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        block: blockSlice.reducer,
        class: classesSlice.reducer,
        teacher: teacherSlice.reducer,
        student: studentSlice.reducer,
        excel: excelSlice.reducer,
        subject: subjectSilce.reducer,
        teach: teachSlice.reducer,
    },
});

export default store;
