package com.LuanVanTotNghiep.controller;


import java.util.List;

import com.LuanVanTotNghiep.dto.request.ArrayIdRequest;
import com.LuanVanTotNghiep.dto.request.ClassEntityRequest;
import com.LuanVanTotNghiep.dto.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.LuanVanTotNghiep.dto.response.ClassEntityResponse;
import com.LuanVanTotNghiep.dto.request.TeacherClassRequest;
import com.LuanVanTotNghiep.dto.response.UserResponse;
import com.LuanVanTotNghiep.service.ClassEntityService;

@RestController
@RequestMapping("/classEntity")
@CrossOrigin("*")
public class ClassEntityController {
	
	@Autowired
	private ClassEntityService classEntityService;

	@GetMapping("/getAllBySchoolYear")
	public ApiResponse<List<ClassEntityResponse>> getAllByYear(@RequestParam Long schoolYearId) {
		return classEntityService.getAllBySchoolYear(schoolYearId);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/createClass")
	public ApiResponse<ClassEntityResponse> CreateClass(@RequestParam Long schoolYearId,
														@RequestParam Long gradeId,
														@RequestBody ClassEntityRequest request){
		return classEntityService.createClass(schoolYearId,gradeId,request);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteClass")
	public void DeleteClass(@RequestBody ArrayIdRequest request){
		System.out.println(request);
		classEntityService.deleteClass(request);
    }

	
	@GetMapping("/classes")
    public List<ClassEntityResponse> getClassesByYear(@RequestParam(required = false) Integer year, @RequestParam(required = false) Long khoiid) {
        return classEntityService.getClassesByYearAndBlock(year,khoiid);
    }
	
//	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/add-teachers-to-classes")
	public List<ClassEntityResponse> addTeachersToClasses(@RequestBody List<TeacherClassRequest> requests){
		return classEntityService.addTeachersToClasses(requests);
	}
	
	@GetMapping("/get-all-students-of-class/{classid}")
	public Page<UserResponse> getallstudentsofclass(@PathVariable Long classid,
													@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
													@RequestParam(required = false) String keyword){
		return classEntityService.getallstudentsofclass(classid,PageRequest.of(page, size),keyword);
	}
	@GetMapping("/get-all-students-of-class/nopage/{classid}")
	public List<UserResponse> getAllStudentsNopage(@PathVariable Long classid){
		return classEntityService.getStudentsnopage(classid);
	}
	
//	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/import-student-class/{classid}")
	public ResponseEntity<?> importExcel(@PathVariable Long classid,@RequestBody List<UserResponse> requests){
		return classEntityService.importexcel(classid,requests);
	}
	
//	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/delete-user-class/{userid}/{classid}")
	public ResponseEntity<?> deleteuserclass(@PathVariable Long userid , @PathVariable Long classid){
		return classEntityService.deleteuserclass(userid,classid);
	}
	
//	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/add-student-to-class/{classid}")
	public ResponseEntity<?> addusertoclass(@PathVariable Long classid,
											@RequestPart("userDTO") UserResponse userResponse, @RequestPart("image") MultipartFile image) {
	    return classEntityService.addusertoclass(classid, userResponse, image);
	}

	
}
