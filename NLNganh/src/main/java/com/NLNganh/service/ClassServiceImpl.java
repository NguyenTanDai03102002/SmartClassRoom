package com.NLNganh.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.NLNganh.dto.BlockDTO;
import com.NLNganh.dto.ClassesDTO;
import com.NLNganh.dto.TeacherClassRequest;
import com.NLNganh.dto.UserDTO;
import com.NLNganh.models.Block;
import com.NLNganh.models.ClassEntity;
import com.NLNganh.models.Role;
import com.NLNganh.models.User;
import com.NLNganh.models.Year;
import com.NLNganh.repository.BlockRepository;
import com.NLNganh.repository.ClassRepository;
import com.NLNganh.repository.RoleRepository;
import com.NLNganh.repository.UserRepository;
import com.NLNganh.repository.YearRepository;

@Service
public class ClassServiceImpl implements ClassService {
	
	@Autowired 
	private ClassRepository classRepository;
	
	@Autowired 
	private YearRepository yearRepository;
	
	@Autowired 
	private BlockRepository blockRepository;
	
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserRepository userRepository;
    
	
//	private UserDTO mapUsertoUserDTO(User user) {
//        return new UserDTO(user.getId(),user.getMaSo(),user.getFullName(), user.getBirthday(), user.getAddress(), user.getPhoneNumber(), user.getSex()
//        		, user.getImage(), user.getEmail(), null, user.getRoles().stream().map(Role::getName).collect(Collectors.toList()));
//    }

	@Override
	public List<ClassesDTO> getClassesByYearAndBlock(Integer year,Long khoid) {
		int y = (year != null) ? year : LocalDate.now().getYear();
		Year targetYear = yearRepository.findByNamhoc(y);
		List<ClassEntity> classEntities;
		if(khoid != null) {
			Optional<Block> khoi = blockRepository.findById(khoid);
			if(khoi.isPresent()) {
				Block targetBlock = khoi.get();
				classEntities = classRepository.findByYearAndBlock(targetYear,targetBlock);		
			}else {
				return null;
			}
		}else {
			classEntities = classRepository.findByYear(targetYear);
		}
		
		return classEntities.stream()
				.map(classEntity -> {
					ClassesDTO dto = new ClassesDTO();
			        dto.setId(classEntity.getId());
			        dto.setName(classEntity.getName());	
			        Block block = classEntity.getBlock();
			        dto.setBlock(new BlockDTO(block.getId(),block.getName()));
			        User teacher = classEntity.getTeacher();
	                dto.setTeacher((teacher !=null) ? UserDTO.mapUsertoUserDTO(teacher) : null);
			        dto.setYear(classEntity.getYear().getNamhoc());
					return dto;
				})
				.collect(Collectors.toList());
	}

	@Override
	public List<ClassesDTO> addTeachersToClasses(List<TeacherClassRequest> requests) {
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
	public ResponseEntity<?> importexcel(Long classid,List<UserDTO> requests) {
		Optional<ClassEntity> lop = classRepository.findById(classid);
		if (!lop.isPresent()) {
	        return null;
	    }
		Set<Role> roleUser = new HashSet<>();
		Role role = roleRepository.findByName("USER");
		roleUser.add(role);
		
		lop.get().getUsers().forEach(user -> user.getClassEntity().remove(lop.get()));
		
		for(UserDTO dto : requests) {
			User user = userRepository.findByMaSo(dto.getMaSo());
			if(user == null) {
				user = new User(dto.getMaSo(),dto.getFullName(),dto.getBirthday(),
						dto.getAddress(),dto.getPhoneNumber(),dto.getSex(),dto.getImage(),dto.getEmail(),"","",roleUser);
				
			}else {
				user.setFullName(dto.getFullName());
				user.setBirthday(dto.getBirthday());
				user.setAddress(dto.getAddress());
				user.setPhoneNumber(dto.getPhoneNumber());
				user.setSex(dto.getSex());
				user.setEmail(dto.getEmail());
				user.setUsername("");
				user.setPassword("");
				user.setRoles(roleUser);
				
			}	
			userRepository.save(user);
			lop.get().getUsers().add(user);
			user.getClassEntity().add(lop.get());
		}
		classRepository.save(lop.get());
		return ResponseEntity.ok().build();
	}

	@Override
	public Page<UserDTO> getallstudentsofclass(Long classid,Pageable pageable,String keyword) {
		Optional<ClassEntity> ClassEntity = classRepository.findById(classid);
		if(ClassEntity.isPresent()) {
			ClassEntity classEntity = ClassEntity.get();
			Page<User> students;
			if(keyword != null) {
				students = userRepository.findUsersByClassEntityAndKeyWord(classEntity,keyword, pageable);
			}else {
				students = userRepository.findUsersByClassEntity(classEntity, pageable);
			}
			List<UserDTO> userdto = new ArrayList<>();
			for(User student : students) {
				UserDTO dto = new UserDTO(student.getId(),student.getMaSo(),student.getFullName(), student.getBirthday(),
						student.getAddress(),student.getPhoneNumber(),student.getSex(),student.getImage(),student.getEmail(),
						student.getPassword(),
						student.getRoles().stream().map(Role::getName).collect(Collectors.toList()));
				
				userdto.add(dto);
			}
			 return new PageImpl<>(userdto, pageable, students.getTotalElements());
		}else {
			return null;
		}
	}
	
	



	

	
}
