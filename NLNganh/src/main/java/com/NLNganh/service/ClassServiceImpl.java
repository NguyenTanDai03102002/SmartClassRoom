package com.NLNganh.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NLNganh.dto.BlockDTO;
import com.NLNganh.dto.ClassesDTO;
import com.NLNganh.dto.UserDTO;
import com.NLNganh.models.Block;
import com.NLNganh.models.Role;
import com.NLNganh.models.User;
import com.NLNganh.models.Year;
import com.NLNganh.repository.ClassRepository;
import com.NLNganh.repository.YearRepository;

@Service
public class ClassServiceImpl implements ClassService {
	
	@Autowired 
	private ClassRepository classRepository;
	
	@Autowired 
	private YearRepository yearRepository;
	
	private UserDTO mapUsertoUserDTO(User user) {
        return new UserDTO(user.getId(),user.getMaSo(),user.getFullName(), user.getBirthday(), user.getAddress(), user.getPhoneNumber(), user.getSex()
        		, user.getImage(), user.getEmail(), null, user.getRoles().stream().map(Role::getName).collect(Collectors.toList()));
    }

	@Override
	public List<ClassesDTO> getClassesByYear(int year) {
		Year targetYear = yearRepository.findByNamhoc(year);
		return classRepository.findByYear(targetYear).stream()
				.map(classEntity -> {
					ClassesDTO dto = new ClassesDTO();
			        dto.setId(classEntity.getId());
			        dto.setName(classEntity.getName());	
			        Block block = classEntity.getBlock();
			        dto.setBlock(new BlockDTO(block.getId(),block.getName()));
			        User teacher = classEntity.getTeacher();
	                dto.setTeacher((teacher !=null) ? mapUsertoUserDTO(teacher) : null);
			        dto.setYear(classEntity.getYear().getNamhoc());
					return dto;
				})
				.collect(Collectors.toList());
	}

	
}
