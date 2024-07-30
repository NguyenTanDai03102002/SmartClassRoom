package com.LuanVanTotNghiep.service;

import java.util.List;

import com.LuanVanTotNghiep.dto.request.ArrayIdRequest;
import com.LuanVanTotNghiep.dto.request.ClassEntityRequest;
import com.LuanVanTotNghiep.dto.response.ApiResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.LuanVanTotNghiep.dto.response.ClassEntityResponse;
import com.LuanVanTotNghiep.dto.request.TeacherClassRequest;
import com.LuanVanTotNghiep.dto.response.UserResponse;

public interface ClassEntityService {

	List<ClassEntityResponse> getAllBySchoolYear(Long schoolYearId, String keyword);

	ClassEntityResponse createClass(Long schoolYearId, Long gradeId, ClassEntityRequest request);

	ClassEntityResponse editClass(Long classEntityId,Long schoolYearId, Long gradeId, ClassEntityRequest request);

	void deleteClass(ArrayIdRequest request);

	void cpyData(Long schoolYearId);
}
