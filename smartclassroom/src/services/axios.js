import axios from 'axios';

const API_BASE_URL = 'http://localhost:8070/';

const userLogin = (dataLogin) => {
    return axios.post(API_BASE_URL + 'userLogin', dataLogin);
};

const getImage = (id) => {
    return axios.get(API_BASE_URL + 'getImage/' + id, { responseType: 'blob' });
};

const getAllBlock = () => {
    return axios.get(API_BASE_URL + 'block');
};

const getAllClassesByYearAndBlock = (year, blockid) => {
    return axios.get(
        API_BASE_URL + (year ? 'classes?year=' + year : 'classes') + (blockid ? '?khoiid=' + blockid : ''),
    );
};

const getAllTeacher = (token) => {
    return axios.get(API_BASE_URL + 'teacher', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const putAllTeachersToClasses = (dataAdd, token) => {
    return axios.post(API_BASE_URL + 'add-teachers-to-classes', dataAdd, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const importStudentsFromExcel = (idlop, formatData, token) => {
    return axios.post(API_BASE_URL + 'import-student-class/' + idlop, formatData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getAllStudentsOfClass = (idlop, page, size, keyword) => {
    if (keyword) {
        return axios.get(API_BASE_URL + 'get-all-students-of-class/' + idlop + '?keyword=' + keyword);
    } else {
        return axios.get(
            API_BASE_URL +
                'get-all-students-of-class/' +
                idlop +
                (page ? '?page=' + page : '') +
                (size ? '&size=' + size : ''),
        );
    }
};

const deleteUserClass = (userid, classid, token) => {
    return axios.delete(API_BASE_URL + 'delete-user-class/' + userid + '/' + classid, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export {
    userLogin,
    getAllBlock,
    getAllClassesByYearAndBlock,
    getAllTeacher,
    putAllTeachersToClasses,
    getImage,
    importStudentsFromExcel,
    getAllStudentsOfClass,
    deleteUserClass,
};
