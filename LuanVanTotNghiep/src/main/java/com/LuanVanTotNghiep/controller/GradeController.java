package com.LuanVanTotNghiep.controller;

import java.util.List;

import com.LuanVanTotNghiep.dto.response.ApiResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LuanVanTotNghiep.dto.response.GradeResponse;
import com.LuanVanTotNghiep.service.GradeService;

@RestController
@RequestMapping("/grade")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class GradeController {

	GradeService gradeService;

	@GetMapping("/getAll")
	public ApiResponse<List<GradeResponse>> getALlGrade(){
		List<GradeResponse> result = gradeService.getAll();
		return ApiResponse.<List<GradeResponse>>builder()
				.result(result)
				.build();
	}
}
