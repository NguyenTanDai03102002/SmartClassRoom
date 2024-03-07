package com.NLNganh.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.NLNganh.dto.ClassesDTO;
import com.NLNganh.dto.TeacherClassRequest;
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
    private UserRepository userRepository;

    @Autowired
    private ClassRepository classRepository;
	
	
	@GetMapping("/classes")
    public List<ClassesDTO> getClassesByYear(@RequestParam(required = false) Integer year) {
		int targetyear = (year != null) ? year : LocalDate.now().getYear();
        return classService.getClassesByYear(targetyear);
    }
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/add-teachers-to-classes")
	public List<ClassesDTO> addTeachersToClasses(@RequestBody List<TeacherClassRequest> requests){
		for(TeacherClassRequest request : requests) {
			Optional<User> teacherOptional = userRepository.findById(request.getTeacherId());
			User teacher = teacherOptional.get();
			
			Optional<ClassEntity> classOptional = classRepository.findById(request.getClassId());
			ClassEntity classEntity = classOptional.get();
			
			classEntity.setTeacher(teacher);
			classRepository.save(classEntity);
			
		}
		return getClassesByYear(null);
	}
}
