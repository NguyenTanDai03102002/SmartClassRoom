package com.LuanVanTotNghiep.service;

import java.util.List;

import com.LuanVanTotNghiep.dto.response.ApiResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.LuanVanTotNghiep.dto.response.ClassEntityResponse;
import com.LuanVanTotNghiep.dto.request.TeacherClassRequest;
import com.LuanVanTotNghiep.dto.response.UserResponse;

public interface ClassEntityService {

	List<ClassEntityResponse> getClassesByYearAndBlock(Integer year, Long khoiid);

	ResponseEntity<?> importexcel(Long classid,List<UserResponse> requests);

	List<ClassEntityResponse> addTeachersToClasses(List<TeacherClassRequest> requests);

	Page<UserResponse> getallstudentsofclass(Long classid, Pageable pageable, String keyword);

	ResponseEntity<?> deleteuserclass(Long userid, Long classid);

	ResponseEntity<?> addusertoclass(Long classid, UserResponse userResponse, MultipartFile image);

	List<UserResponse> getStudentsnopage(Long classid);


	ApiResponse<List<ClassEntityResponse>> getAllByYear(Long yearId);
}
