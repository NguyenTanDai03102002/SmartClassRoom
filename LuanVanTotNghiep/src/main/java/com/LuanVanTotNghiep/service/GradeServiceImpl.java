package com.LuanVanTotNghiep.service;

import java.util.List;
import java.util.stream.Collectors;

import com.LuanVanTotNghiep.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LuanVanTotNghiep.dto.response.GradeResponse;

@Service
public class GradeServiceImpl implements GradeService {
	
	
	@Autowired
	private GradeRepository gradeRepository;

	@Override
	public List<GradeResponse> getAllBlocks() {
	    return gradeRepository.findAll().stream()
	            .map(block -> {
	                GradeResponse gradeResponse = new GradeResponse();
//	                gradeResponse.setId(block.getId());
//	                gradeResponse.setName(block.getName());
	                return gradeResponse;
	            })
	            .collect(Collectors.toList());
	}


	
	
}
