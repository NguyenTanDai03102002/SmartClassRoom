package com.NLNganh.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.NLNganh.dto.ClassesDTO;
import com.NLNganh.dto.TeacherClassRequest;
import com.NLNganh.dto.UserDTO;

public interface ClassService {

	List<ClassesDTO> getClassesByYearAndBlock(Integer year,Long khoiid);

	ResponseEntity<?> importexcel(Long classid,List<UserDTO> requests);

	List<ClassesDTO> addTeachersToClasses(List<TeacherClassRequest> requests);

	Page<UserDTO> getallstudentsofclass(Long classid, Pageable pageable,String keyword);

}
