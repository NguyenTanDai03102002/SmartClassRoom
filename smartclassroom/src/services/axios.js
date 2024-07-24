import axios from 'axios';

const API_BASE_URL = 'http://localhost:8070/';

export const userLogin = (dataLogin) => {
    return axios.post(API_BASE_URL + 'auth/login', dataLogin);
};

export const getAllSchoolYear = () => {
    return axios.get(API_BASE_URL + 'schoolYear/getAll');
};

export const getAllClassesByYear = (yearId) => {
    return axios.get(API_BASE_URL + 'classEntity/getAllByYear?yearId=' + yearId);
};

export const getAllBlock = () => {
    return axios.get(API_BASE_URL + 'block');
};

export const getAllClassesByYearAndBlock = (year, blockid) => {
    return axios.get(
        API_BASE_URL + (year ? 'classes?year=' + year : 'classes') + (blockid ? '?khoiid=' + blockid : ''),
    );
};

export const getAllTeacher = (token) => {
    return axios.get(API_BASE_URL + 'teacher', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllTeacherPage = (token, currentPage, keyword) => {
    return axios.get(API_BASE_URL + 'teacher-page?page=' + currentPage + '&keyword=' + keyword, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const putAllTeachersToClasses = (dataAdd, token) => {
    return axios.post(API_BASE_URL + 'add-teachers-to-classes', dataAdd, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const addteacher = (token, formdata) => {
    return axios.post(API_BASE_URL + 'add-teacher', formdata, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const editteacher = (userid, token, formdata) => {
    return axios.post(API_BASE_URL + 'edit-teacher/' + userid, formdata, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteteacher = (userid, token) => {
    return axios.delete(API_BASE_URL + 'delete-teacher/' + userid, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const importTeachersFromExcel = (token, formatData) => {
    return axios.post(API_BASE_URL + 'import-excel-teacher', formatData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const importStudentsFromExcel = (idlop, formatData, token) => {
    return axios.post(API_BASE_URL + 'import-student-class/' + idlop, formatData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getallstudentsnopage = async (idlop) => {
    return await axios.get(API_BASE_URL + 'get-all-students-of-class/nopage/' + idlop);
};

export const getAllStudentsOfClass = (idlop, page, size, keyword) => {
    if (keyword) {
        return axios.get(
            API_BASE_URL +
                'get-all-students-of-class/' +
                idlop +
                (page ? '?page=' + page + '&keyword=' + keyword : '?keyword=' + keyword),
        );
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

export const deleteUserClass = (userid, classid, token) => {
    return axios.delete(API_BASE_URL + 'delete-user-class/' + userid + '/' + classid, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addstudenttoclass = (idlop, formData, token) => {
    return axios.post(API_BASE_URL + 'add-student-to-class/' + idlop, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const EditStudentInClass = (userid, formData, token) => {
    return axios.post(API_BASE_URL + 'edit-student-in-class/' + userid, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const GetAllSubject = () => {
    return axios.get(API_BASE_URL + 'getSubject');
};

export const XepGiangDay = (token, data) => {
    return axios.post(API_BASE_URL + 'xep-giang-day', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const GetGiangDayByTeacherId = (token, teacherId) => {
    return axios.get(API_BASE_URL + 'get-giang-day/' + teacherId, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
