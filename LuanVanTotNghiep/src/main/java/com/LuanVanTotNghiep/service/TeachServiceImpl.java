package com.LuanVanTotNghiep.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.LuanVanTotNghiep.dto.response.TeachResponse;
import com.LuanVanTotNghiep.dto.request.TeachRequest;
import com.LuanVanTotNghiep.models.Teach;
import com.LuanVanTotNghiep.models.User;
import com.LuanVanTotNghiep.repository.ClassRepository;
import com.LuanVanTotNghiep.repository.SubjectRepository;
import com.LuanVanTotNghiep.repository.TeachRepository;
import com.LuanVanTotNghiep.repository.UserRepository;
import com.LuanVanTotNghiep.repository.YearRepository;

@Service
public class TeachServiceImpl implements TeachService {
	
	@Autowired
	private ClassRepository classRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SubjectRepository subjectRepository;
	
	@Autowired
	private YearRepository yearRepository;
	
	@Autowired
	private TeachRepository teachRepository;
	
	@Override
	public ResponseEntity<?> XepGiangDay(List<TeachRequest> teachsRequestDTO) {
		try {
			for (TeachRequest teachRequest : teachsRequestDTO) {
				Teach teach = new Teach();
				teach.setClassEntity(classRepository.findById(teachRequest.getClassEntityId()).orElseThrow());
				teach.setUser(userRepository.findById(teachRequest.getTeacherId()).orElseThrow());
				teach.setSubject(subjectRepository.findById(teachRequest.getSubjectId()).orElseThrow());
				teach.setDayOfWeek(teachRequest.getDayOfWeek());
//				teach.setTiet(teachRequest.getTiet());
				teach.setSchoolYear(yearRepository.findBySchoolYear(teachRequest.getYear()));
			
				teachRepository.save(teach);
			}
			return ResponseEntity.ok().build();
		}catch(Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("XepGiangDay failed: " + ex.getMessage());
		}		
	}

	@Override
	public List<TeachResponse> GetGiangDay() {
		List<Teach> teachs = teachRepository.findAll();
		List<TeachResponse> teachsReponseDTO = teachs.stream().map(teach -> {
            TeachResponse teachResponse = new TeachResponse();
            teachResponse.setId(teach.getId());
//            teachResponse.setClassEntity(ClassEntityResponse.mapClassToDTO(teach.getClassEntity()));
//            teachResponse.setTeacher(UserResponse.mapUsertoUserDTO(teach.getUser()));
//            teachResponse.setDayOfWeek(teach.getDayOfWeek());
//            teachResponse.setSubject(SubjectResponse.MapSujectToDTO(teach.getSubject()));
//            teachResponse.setTiet(teach.getTiet());
//            teachResponse.setYear(YearResponse.mapYeartoDTO(teach.getYear()));
            
            return teachResponse;
        }).collect(Collectors.toList());
		
		return teachsReponseDTO;
	}

	@Override
	public List<TeachResponse> GetGiangDayByteacherId(Long teacherId) {
		User user = userRepository.findById(teacherId).orElseThrow();
		List<Teach> teachs = teachRepository.findByUser(user);
		List<TeachResponse> teachsReponseDTO = teachs.stream().map(teach -> {
            TeachResponse teachResponse = new TeachResponse();
            teachResponse.setId(teach.getId());
//            teachResponse.setClassEntity(ClassEntityResponse.mapClassToDTO(teach.getClassEntity()));
//            teachResponse.setTeacher(UserResponse.mapUsertoUserDTO(teach.getUser()));
//            teachResponse.setDayOfWeek(teach.getDayOfWeek());
//            teachResponse.setSubject(SubjectResponse.MapSujectToDTO(teach.getSubject()));
//            teachResponse.setTiet(teach.getTiet());
//            teachResponse.setYear(YearResponse.mapYeartoDTO(teach.getYear()));
            
            return teachResponse;
        }).collect(Collectors.toList());
		
		return teachsReponseDTO;
	}

}