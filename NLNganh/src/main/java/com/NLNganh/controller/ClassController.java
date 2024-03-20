package com.NLNganh.controller;


import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.NLNganh.dto.BlockDTO;
import com.NLNganh.dto.ClassesDTO;
import com.NLNganh.dto.TeacherClassRequest;
import com.NLNganh.dto.UserDTO;
import com.NLNganh.models.ClassEntity;
import com.NLNganh.models.User;
import com.NLNganh.repository.ClassRepository;
import com.NLNganh.repository.UserRepository;
import com.NLNganh.service.ClassService;

@RestController
@RequestMapping
@CrossOrigin("*")
public class ClassController {
	
	@Autowired
	private ClassService classService;
	
	@Autowired
	private ClassRepository classRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/classes")
    public List<ClassesDTO> getClassesByYear(@RequestParam(required = false) Integer year,@RequestParam(required = false) Long khoiid) {
        return classService.getClassesByYearAndBlock(year,khoiid);
    }
	
	@GetMapping("/classes/{classid}")
	public ClassesDTO getClassByid(@PathVariable Long classid) {
		ClassEntity classEntity = classRepository.findById(classid).get();
		ClassesDTO dto = new ClassesDTO();
		dto.setId(classEntity.getId());
		dto.setName(classEntity.getName());
		BlockDTO blockdto = new BlockDTO(classEntity.getBlock().getId(),classEntity.getBlock().getName());
		dto.setBlock(blockdto);
		dto.setTeacher(UserDTO.mapUsertoUserDTO(classEntity.getTeacher()));
		dto.setYear(classEntity.getYear().getNamhoc());
		return dto;
		
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/add-teachers-to-classes")
	public List<ClassesDTO> addTeachersToClasses(@RequestBody List<TeacherClassRequest> requests){
		return classService.addTeachersToClasses(requests);
	}
	
	@GetMapping("/get-all-students-of-class/{classid}")
	public Page<UserDTO> getallstudentsofclass(@PathVariable Long classid,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "8") int size,
			@RequestParam(required = false) String keyword){
		return classService.getallstudentsofclass(classid,PageRequest.of(page, size),keyword);
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/import-student-class/{classid}")
	public ResponseEntity<?> importExcel(@PathVariable Long classid,@RequestBody List<UserDTO> requests){
		return classService.importexcel(classid,requests);
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/delete-user-class/{userid}/{classid}")
	public ResponseEntity<?> deleteuserclass(@PathVariable Long userid , @PathVariable Long classid){
		ClassEntity classEntity = classRepository.findById(classid).get();
		User user = userRepository.findById(userid).get();
		user.getClassEntity().remove(classEntity);
		userRepository.save(user);
		return ResponseEntity.ok().build();
	}
	
}
