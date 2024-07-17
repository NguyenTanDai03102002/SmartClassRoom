package com.LuanVanTotNghiep.service;

import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.LuanVanTotNghiep.dto.response.UserResponse;

public interface UserService {
	List<UserResponse> getAllTeacher();

	ResponseEntity<ByteArrayResource> getImageMainUrlFromUser(Long userid);

	ResponseEntity<?> EditStudentInClass(Long userid, UserResponse userdto, MultipartFile image);

	ResponseEntity<?> importexcelTeacher(List<UserResponse> teachersDTO);

	Page<UserResponse> getAllTeacherPageable(Pageable pageable, String keyword);

	ResponseEntity<?> addteacher(UserResponse userdto, MultipartFile image);

	ResponseEntity<?> editTeacher(Long userId, UserResponse userdto, MultipartFile image);

	ResponseEntity<?> deleteTeacher(Long userId);
}
