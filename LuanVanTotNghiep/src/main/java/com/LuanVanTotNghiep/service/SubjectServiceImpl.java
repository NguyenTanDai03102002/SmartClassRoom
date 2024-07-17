package com.LuanVanTotNghiep.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LuanVanTotNghiep.dto.response.SubjectResponse;
import com.LuanVanTotNghiep.models.Subject;
import com.LuanVanTotNghiep.repository.SubjectRepository;

@Service
public class SubjectServiceImpl implements SubjectService {
	
	@Autowired
	private SubjectRepository subjectRepository;

	@Override
	public List<SubjectResponse> getAllSubject() {
//		List<Subject> subjects = subjectRepository.findAll();
//
//		List<SubjectResponse> subjectResponses = subjects.stream().map(subject -> SubjectResponse.MapSujectToDTO(subject)).collect(Collectors.toList());
//
//		return subjectResponses;
		return null;
	}

}
