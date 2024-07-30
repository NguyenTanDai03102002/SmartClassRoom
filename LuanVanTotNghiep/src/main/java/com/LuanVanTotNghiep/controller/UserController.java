package com.LuanVanTotNghiep.controller;

import java.util.List;

import com.LuanVanTotNghiep.dto.response.ApiResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LuanVanTotNghiep.dto.response.UserResponse;
import com.LuanVanTotNghiep.service.UserService;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserController {
  
    UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAllTeacher")
    public ApiResponse<List<UserResponse>> getAllTeacher() {
        List<UserResponse> result = userService.getAllTeacher();
        return ApiResponse.<List<UserResponse>>builder()
                .result(result)
                .build();
    }

    
//    @PreAuthorize("hasRole('ADMIN')")
//    @GetMapping("/teacher-page")
//    public Page<UserResponse> getAllTeacherPageable(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "8") int size,
//                                                    @RequestParam(required =false) String keyword) {
//    	return userService.getAllTeacherPageable(PageRequest.of(page, size),keyword);
//    }
//
//    @PreAuthorize("hasRole('ADMIN')")
//    @PostMapping("/import-excel-teacher")
//    public ResponseEntity<?> importexcelTeacher(@RequestBody List<UserResponse> teachersDTO){
//    	return userService.importexcelTeacher(teachersDTO);
//    }
//
//    @PreAuthorize("hasRole('ADMIN')")
//    @PostMapping("/add-teacher")
//    public ResponseEntity<?> addteacher(@RequestPart("UserDTO") UserResponse userdto, @RequestPart(value="image",required =false) MultipartFile image){
//    	return userService.addteacher(userdto,image);
//    }
//    @PreAuthorize("hasRole('ADMIN')")
//    @PostMapping("/edit-teacher/{userId}")
//    public ResponseEntity<?> editteacher(@PathVariable Long userId, @RequestPart("UserDTO") UserResponse userdto, @RequestPart(value="image",required =false) MultipartFile image){
//    	return userService.editTeacher(userId,userdto,image);
//    }
//
//    @PreAuthorize("hasRole('ADMIN')")
//    @DeleteMapping("/delete-teacher/{userId}")
//    public ResponseEntity<?> deleteteacher(@PathVariable Long userId){
//    	return userService.deleteTeacher(userId);
//    }
//
//	@PreAuthorize("hasRole('ADMIN')")
//	@PostMapping("/edit-student-in-class/{userid}")
//	public ResponseEntity<?> editStudentInCLass(@PathVariable Long userid, @RequestPart("userDTO") UserResponse userdto, @RequestPart(value = "image", required = false) MultipartFile image){
//		return userService.EditStudentInClass(userid,userdto,image);
//	}
//
	
	
}
