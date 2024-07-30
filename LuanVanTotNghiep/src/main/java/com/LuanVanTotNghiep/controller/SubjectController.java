package com.LuanVanTotNghiep.controller;

import java.util.List;

import com.LuanVanTotNghiep.dto.response.ApiResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LuanVanTotNghiep.dto.response.SubjectResponse;
import com.LuanVanTotNghiep.service.SubjectService;

@RestController
@RequestMapping("/subject")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SubjectController {

	SubjectService subjectService;

	@GetMapping("/getAll")
	public ApiResponse<List<SubjectResponse>> getAllSubject(){
		List<SubjectResponse> result = subjectService.getAllSubject();
		return ApiResponse.<List<SubjectResponse>>builder()
				.result(result)
				.build();
	}
}
