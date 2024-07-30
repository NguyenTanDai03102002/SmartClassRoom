package com.LuanVanTotNghiep.service;

import java.util.List;

import com.LuanVanTotNghiep.Mapper.SubjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import com.LuanVanTotNghiep.dto.response.SubjectResponse;
import com.LuanVanTotNghiep.models.Subject;
import com.LuanVanTotNghiep.repository.SubjectRepository;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SubjectServiceImpl implements SubjectService {

	SubjectRepository subjectRepository;
	SubjectMapper subjectMapper;

	@Override
	public List<SubjectResponse> getAllSubject() {

		List<Subject> subjectList = subjectRepository.findAll();

		return subjectList.stream().map(subjectMapper::toSubjectResponse).toList();
	}

}
