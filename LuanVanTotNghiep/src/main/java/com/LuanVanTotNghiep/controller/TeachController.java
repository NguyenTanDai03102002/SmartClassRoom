package com.LuanVanTotNghiep.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping
@CrossOrigin("*")
public class TeachController {
	
	@Autowired
	private TeachService teachService;
	
//	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/get-giang-day")
	public List<TeachResponse> getgiangday(){
		return teachService.GetGiangDay();
	}
	
//	@PreAuthorize("hasAuthority('TEACHER')")
	@GetMapping("/get-giang-day/{teacherId}")
	public List<TeachResponse> getgiangday(@PathVariable Long teacherId){
		return teachService.GetGiangDayByteacherId(teacherId);
	}
	
//	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/xep-giang-day")
	public ResponseEntity<?> xepgiangday(@RequestBody List<TeachRequest> teachsRequestDTO){
		return teachService.XepGiangDay(teachsRequestDTO);
	}
	
}
