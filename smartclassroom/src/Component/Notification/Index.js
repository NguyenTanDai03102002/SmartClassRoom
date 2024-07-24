import Swal from 'sweetalert2';
import styles from './customSwal.module.scss';

export const showSuccessMessage = (message) =>
    Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: message,
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        customClass: {
            popup: styles.popup,
            title: styles.title,
            icon: styles.icon,
        },
    });

export const showErrorMessage = (message) =>
    Swal.fire({
        icon: 'error',
        title: 'Thất bại!',
        html: message,
        showConfirmButton: true,
        customClass: {
            popup: styles.popup,
            title: styles.title,
            icon: styles.icon,
        },
    });

export const showWarningMessage = (message) =>
    Swal.fire({
        icon: 'warning',
        title: 'Cảnh báo!',
        text: message,
        showConfirmButton: true,
        customClass: {
            popup: styles.popup,
            title: styles.title,
            icon: styles.icon,
        },
    });
