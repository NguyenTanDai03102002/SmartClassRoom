package com.LuanVanTotNghiep.Exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi chưa được phân loại", HttpStatus.INTERNAL_SERVER_ERROR),

    //User
    USER_EXISTED(1001, "User đã tồn tại",HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User không tồn tại", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1002, "Không được xác thực",HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1003,"không có quyền truy cập",HttpStatus.UNAUTHORIZED),

    //SchoolYear
    YEAR_NOT_EXISTED(10001,"Năm học không tồn tại",HttpStatus.NOT_FOUND),

    //Grade
    GRADE_NOT_EXISTED(15001,"Năm học không tồn tại",HttpStatus.NOT_FOUND),
    //ClassEntity
    CLASS_NOT_EXISTED(20001,"Lớp học không tồn tại",HttpStatus.NOT_FOUND),
    STUDENT_EXISTED(20002,"Lớp học có học sinh",HttpStatus.BAD_REQUEST)
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
