package com.LuanVanTotNghiep.service;

import java.util.List;
import java.util.stream.Collectors;

import com.LuanVanTotNghiep.Mapper.GradeMapper;
import com.LuanVanTotNghiep.dto.response.ApiResponse;
import com.LuanVanTotNghiep.models.Grade;
import com.LuanVanTotNghiep.repository.GradeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LuanVanTotNghiep.dto.response.GradeResponse;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class GradeServiceImpl implements GradeService {
	GradeRepository gradeRepository;
	GradeMapper gradeMapper;

	@Override
	public List<GradeResponse> getAll() {
		List<Grade> gradeList = gradeRepository.findAll();
		return gradeList.stream().map(gradeMapper::toGradeResponse).collect(Collectors.toList());
	}
}
