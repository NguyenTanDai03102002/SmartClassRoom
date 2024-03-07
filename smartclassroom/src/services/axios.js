import axios from 'axios';

const API_BASE_URL = 'http://localhost:8070/';

const userLogin = (dataLogin) => {
    return axios.post(API_BASE_URL + 'userLogin', dataLogin);
};

const getAllBlock = () => {
    return axios.get(API_BASE_URL + 'block');
};

const getAllClassesByYear = (year) => {
    return axios.get(API_BASE_URL + (year ? 'classes?year=' + year : 'classes'));
};

const getAllTeacher = (token) => {
    return axios.get(API_BASE_URL + 'teacher', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const putAllTeachersToClasses = (dataAdd, token) => {
    console.log(dataAdd);
    return axios.post(API_BASE_URL + 'add-teachers-to-classes', dataAdd, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { userLogin, getAllBlock, getAllClassesByYear, getAllTeacher, putAllTeachersToClasses };
