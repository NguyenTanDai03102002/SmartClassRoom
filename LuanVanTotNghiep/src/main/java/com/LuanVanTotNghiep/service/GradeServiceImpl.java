package com.LuanVanTotNghiep.service;

import java.util.List;
import java.util.stream.Collectors;

import com.LuanVanTotNghiep.Mapper.GradeMapper;
import com.LuanVanTotNghiep.dto.response.ApiResponse;
import com.LuanVanTotNghiep.models.Grade;
import com.LuanVanTotNghiep.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LuanVanTotNghiep.dto.response.GradeResponse;

@Service
public class GradeServiceImpl implements GradeService {

	@Autowired
	private GradeRepository gradeRepository;

	@Autowired
	private GradeMapper gradeMapper;

	@Override
	public ApiResponse<List<GradeResponse>> getAll() {
		List<Grade> gradeList = gradeRepository.findAll();
		return ApiResponse.<List<GradeResponse>>builder()
				.result(gradeList.stream().map(grade -> gradeMapper.toGradeResponse(grade))
						.collect(Collectors.toList()))
				.build();
	}
}
