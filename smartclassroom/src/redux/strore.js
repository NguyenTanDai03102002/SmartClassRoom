import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../ReducerSlice/authSlice';
import gradeSlice from '../ReducerSlice/gradeSlice';
import classesSlice from '../ReducerSlice/classesSlice';
import teacherSlice from '../ReducerSlice/teacherSlice';
import studentSlice from '../ReducerSlice/studentSlice';
import excelSlice from '../ReducerSlice/excelSilce';
import subjectSilce from '../ReducerSlice/subjectSlice';
import teachSlice from '../ReducerSlice/teachSlice';
import schoolSlice from '../ReducerSlice/schoolYear';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        grade: gradeSlice.reducer,
        class: classesSlice.reducer,
        teacher: teacherSlice.reducer,
        student: studentSlice.reducer,
        excel: excelSlice.reducer,
        subject: subjectSilce.reducer,
        teach: teachSlice.reducer,
        schoolYear: schoolSlice.reducer,
    },
});

export default store;
