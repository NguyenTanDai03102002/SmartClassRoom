package com.LuanVanTotNghiep.controller;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import com.LuanVanTotNghiep.Mapper.UserMapper;
import com.LuanVanTotNghiep.models.User;
import com.LuanVanTotNghiep.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
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

import com.LuanVanTotNghiep.dto.response.UserResponse;
import com.LuanVanTotNghiep.service.UserService;

@RestController
@RequestMapping
@CrossOrigin("*")
public class UserController {
  
	@Autowired
	private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;
   
    @GetMapping("/getImage/{userid}")
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable Long userid) throws IOException{
    	return userService.getImageMainUrlFromUser(userid);
    		
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user")
    public List<UserResponse> getAllUser() {
        List<User> userList = userRepository.findAll();
        return userList.stream().map(user -> userMapper.toUserResponse(user))
                .collect(Collectors.toList());
    }

	
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/teacher")
    public List<UserResponse> getAllTeacher() {
    	return userService.getAllTeacher();
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/teacher-page")
    public Page<UserResponse> getAllTeacherPageable(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "8") int size,
                                                    @RequestParam(required =false) String keyword) {
    	return userService.getAllTeacherPageable(PageRequest.of(page, size),keyword);
    }
   
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/import-excel-teacher")
    public ResponseEntity<?> importexcelTeacher(@RequestBody List<UserResponse> teachersDTO){
    	return userService.importexcelTeacher(teachersDTO);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add-teacher")
    public ResponseEntity<?> addteacher(@RequestPart("UserDTO") UserResponse userdto, @RequestPart(value="image",required =false) MultipartFile image){
    	return userService.addteacher(userdto,image);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/edit-teacher/{userId}")
    public ResponseEntity<?> editteacher(@PathVariable Long userId, @RequestPart("UserDTO") UserResponse userdto, @RequestPart(value="image",required =false) MultipartFile image){
    	return userService.editTeacher(userId,userdto,image);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete-teacher/{userId}")
    public ResponseEntity<?> deleteteacher(@PathVariable Long userId){
    	return userService.deleteTeacher(userId);
    }
    
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/edit-student-in-class/{userid}")
	public ResponseEntity<?> editStudentInCLass(@PathVariable Long userid, @RequestPart("userDTO") UserResponse userdto, @RequestPart(value = "image", required = false) MultipartFile image){
		return userService.EditStudentInClass(userid,userdto,image);
	}
	
	
	
}
