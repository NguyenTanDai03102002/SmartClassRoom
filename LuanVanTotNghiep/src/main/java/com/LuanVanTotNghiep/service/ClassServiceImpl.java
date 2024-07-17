package com.LuanVanTotNghiep.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.LuanVanTotNghiep.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.LuanVanTotNghiep.dto.response.ClassEntityResponse;
import com.LuanVanTotNghiep.dto.request.TeacherClassRequest;
import com.LuanVanTotNghiep.dto.response.UserResponse;
import com.LuanVanTotNghiep.models.Grade;
import com.LuanVanTotNghiep.models.ClassEntity;
import com.LuanVanTotNghiep.models.Role;
import com.LuanVanTotNghiep.models.User;
import com.LuanVanTotNghiep.models.SchoolYear;

@Service
public class ClassServiceImpl implements ClassService {
	
	@Autowired 
	private ClassRepository classRepository;
	
	@Autowired 
	private YearRepository yearRepository;
	
	@Autowired 
	private GradeRepository gradeRepository;
	
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserRepository userRepository;

    PasswordEncoder passwordEncode =new BCryptPasswordEncoder(10);
    
    private final String IMAGE_DIRECTORY = "src/main/resources/static/assets/img/";
    
	@Override
	public List<ClassEntityResponse> getClassesByYearAndBlock(Integer year, Long khoid) {
		int y = (year != null) ? year : LocalDate.now().getYear();
		SchoolYear targetSchoolYear = yearRepository.findBySchoolYear(y);
		List<ClassEntity> classEntities;
		if(khoid != null) {
			Optional<Grade> khoi = gradeRepository.findById(khoid);
			if(khoi.isPresent()) {
				Grade targetGrade = khoi.get();
				classEntities = classRepository.findBySchoolYearAndGrade(targetSchoolYear, targetGrade);
			}else {
				return null;
			}
		}else {
			classEntities = classRepository.findBySchoolYear(targetSchoolYear);
		}
		
		return classEntities.stream()
				.map(classEntity -> {
					ClassEntityResponse dto = new ClassEntityResponse();
			        dto.setId(classEntity.getId());
			        dto.setName(classEntity.getName());	
			        Grade grade = classEntity.getGrade();
//			        dto.setBlock(new GradeResponse(grade.getId(), grade.getName()));
//			        User teacher = classEntity.getTeacher();
//	                dto.setTeacher((teacher !=null) ? UserResponse.mapUsertoUserDTO(teacher) : null);
//			        dto.setYear(classEntity.getYear().getNamhoc());
					return dto;
				})
				.collect(Collectors.toList());
	}

	@Override
	public List<ClassEntityResponse> addTeachersToClasses(List<TeacherClassRequest> requests) {
		for(TeacherClassRequest request : requests) {
			Optional<User> teacherOptional = userRepository.findById(request.getTeacherId());
			User teacher = teacherOptional.get();
			
			Optional<ClassEntity> classOptional = classRepository.findById(request.getClassId());
			ClassEntity classEntity = classOptional.get();
			
			classEntity.setTeacher(teacher);
			classRepository.save(classEntity);
			
		}
		return getClassesByYearAndBlock(null,null);
	}
	
	
	
	
	@Override
	public ResponseEntity<?> importexcel(Long classid,List<UserResponse> requests) {
		Optional<ClassEntity> lop = classRepository.findById(classid);
		if (!lop.isPresent()) {
	        return null;
	    }
		Set<Role> roleUser = new HashSet<>();
		Role role = roleRepository.findByName("USER");
		roleUser.add(role);
		
//		lop.get().getUsers().forEach(user -> user.getClassEntity().remove(lop.get()));
		
		for(UserResponse dto : requests) {
			User user = userRepository.findByUserCode(dto.getUserCode());
			if(user == null) {
//				user = new User(dto.getMaSo(),dto.getFullName(),dto.getBirthday(),
//						dto.getAddress(),dto.getPhoneNumber(),dto.getSex(),dto.getImage(),dto.getEmail(),passwordEncode.encode(dto.getPassword()),roleUser);
				
			}else {
				user.setFullName(dto.getFullName());
				user.setBirthday(dto.getBirthday());
//				user.setAddress(dto.getAddress());
				user.setPhoneNumber(dto.getPhoneNumber());
				user.setSex(dto.getSex());
				user.setEmail(dto.getEmail());
				user.setPassword(passwordEncode.encode(dto.getPassword()));
				user.setRoles(roleUser);
				
			}	
			userRepository.save(user);
//			lop.get().getUsers().add(user);
//			user.getClassEntity().add(lop.get());
		}
		classRepository.save(lop.get());
		return ResponseEntity.ok().build();
	}

	@Override
	public Page<UserResponse> getallstudentsofclass(Long classid, Pageable pageable, String keyword) {
		Optional<ClassEntity> ClassEntity = classRepository.findById(classid);
		if(ClassEntity.isPresent()) {
			ClassEntity classEntity = ClassEntity.get();
			Page<User> students;
			if(keyword != null) {
				students = userRepository.findUsersByClassEntityAndKeyWord(classEntity,keyword, pageable);
			}else {
				students = userRepository.findUsersByClassEntity(classEntity, pageable);
			}
			List<UserResponse> userdto = new ArrayList<>();
			for(User student : students) {
//				UserResponse dto = UserResponse.mapUsertoUserDTO(student);
//				userdto.add(dto);
			}
			 return new PageImpl<>(userdto, pageable, students.getTotalElements());
		}else {
			return null;
		}
	}

	@Override
	public ResponseEntity<?> deleteuserclass(Long userid, Long classid) {
		ClassEntity classEntity = classRepository.findById(classid).get();
		User user = userRepository.findById(userid).get();
//		user.getClassEntity().remove(classEntity);
		userRepository.save(user);
		return ResponseEntity.ok().build();
	}

	@Override
	public ResponseEntity<?> addusertoclass(Long classid, UserResponse userdto, MultipartFile file) {
		ClassEntity classEntity = classRepository.findById(classid).get();
		
		User user = userRepository.findByUserCode(userdto.getUserCode());
		if(user != null) {
			return ResponseEntity.noContent().build();
		}else {
			String imageName = file.getOriginalFilename();
				userdto.setImage(imageName);
				Path imagePath = Paths.get(IMAGE_DIRECTORY +imageName);
					try {
						if(imagePath == null) {
							Files.copy(file.getInputStream(),imagePath);
						}
						
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
				
			
	            Role roleUser = roleRepository.findByName("USER");
	            Set<Role> roleuser = new HashSet<>();
	            roleuser.add(roleUser);
//	            user = new User(userdto.getMaSo(), userdto.getFullName(), userdto.getBirthday(), userdto.getAddress(), userdto.getPhoneNumber(),
//	                    userdto.getSex(), userdto.getImage(), userdto.getEmail(), passwordEncode.encode(userdto.getPassword()), roleuser);
//	            user.getClassEntity().add(classEntity);
	            userRepository.save(user);

	            return ResponseEntity.ok().build();	
		
	}

	@Override
	public List<UserResponse> getStudentsnopage(Long classid) {
		Optional<ClassEntity> classEntity = classRepository.findById(classid);
//		if(classEntity.isPresent()) {
//			Set<User> users= classEntity.get().getUsers();
//			return users.stream().map(user -> {
//				return UserResponse.mapUsertoUserDTO(user);
//			}).collect(Collectors.toList());
//
//		}
		
		return null;
	}

	
	



	

	
}
