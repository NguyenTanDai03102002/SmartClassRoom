package com.LuanVanTotNghiep.controller;

import java.util.List;

import com.LuanVanTotNghiep.dto.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LuanVanTotNghiep.dto.response.GradeResponse;
import com.LuanVanTotNghiep.service.GradeService;

@RestController
@RequestMapping("/grade")
@CrossOrigin("*")
public class GradeController {
	
	@Autowired
	private GradeService gradeService;

	@GetMapping("/getAll")
	public ApiResponse<List<GradeResponse>> getALlGrade(){
		return gradeService.getAll();
	}
}
