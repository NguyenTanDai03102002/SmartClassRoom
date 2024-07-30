package com.LuanVanTotNghiep.controller;

import java.util.List;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LuanVanTotNghiep.dto.response.TeachResponse;
import com.LuanVanTotNghiep.dto.request.TeachRequest;
import com.LuanVanTotNghiep.service.TeachService;

@RestController
@RequestMapping("/teach")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class TeachController {
	
	TeachService teachService;
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/get-giang-day")
	public List<TeachResponse> getgiangday(){

		return teachService.GetGiangDay();
	}
//
//	@PreAuthorize("hasRole('TEACHER')")
//	@GetMapping("/get-giang-day/{teacherId}")
//	public List<TeachResponse> getgiangday(@PathVariable Long teacherId){
//		return teachService.GetGiangDayByteacherId(teacherId);
//	}
//
//	@PreAuthorize("hasRole('ADMIN')")
//	@PostMapping("/xep-giang-day")
//	public ResponseEntity<?> xepgiangday(@RequestBody List<TeachRequest> teachsRequestDTO){
//		return teachService.XepGiangDay(teachsRequestDTO);
//	}
	
}
