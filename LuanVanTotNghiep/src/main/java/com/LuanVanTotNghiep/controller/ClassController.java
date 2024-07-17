package com.LuanVanTotNghiep.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;

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
import com.LuanVanTotNghiep.service.ClassService;

@RestController
@RequestMapping
@CrossOrigin("*")
public class ClassController {
	
	@Autowired
	private ClassService classService;
	
	@GetMapping("/classes")
    public List<ClassEntityResponse> getClassesByYear(@RequestParam(required = false) Integer year, @RequestParam(required = false) Long khoiid) {
        return classService.getClassesByYearAndBlock(year,khoiid);
    }
	
//	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/add-teachers-to-classes")
	public List<ClassEntityResponse> addTeachersToClasses(@RequestBody List<TeacherClassRequest> requests){
		return classService.addTeachersToClasses(requests);
	}
	
	@GetMapping("/get-all-students-of-class/{classid}")
	public Page<UserResponse> getallstudentsofclass(@PathVariable Long classid,
													@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
													@RequestParam(required = false) String keyword){
		return classService.getallstudentsofclass(classid,PageRequest.of(page, size),keyword);
	}
	@GetMapping("/get-all-students-of-class/nopage/{classid}")
	public List<UserResponse> getAllStudentsNopage(@PathVariable Long classid){
		return classService.getStudentsnopage(classid);
	}
	
//	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/import-student-class/{classid}")
	public ResponseEntity<?> importExcel(@PathVariable Long classid,@RequestBody List<UserResponse> requests){
		return classService.importexcel(classid,requests);
	}
	
//	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/delete-user-class/{userid}/{classid}")
	public ResponseEntity<?> deleteuserclass(@PathVariable Long userid , @PathVariable Long classid){
		return classService.deleteuserclass(userid,classid);
	}
	
//	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/add-student-to-class/{classid}")
	public ResponseEntity<?> addusertoclass(@PathVariable Long classid,
											@RequestPart("userDTO") UserResponse userResponse, @RequestPart("image") MultipartFile image) {
	    return classService.addusertoclass(classid, userResponse, image);
	}

	
}
