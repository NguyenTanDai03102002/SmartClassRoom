package com.LuanVanTotNghiep.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LuanVanTotNghiep.dto.response.SubjectResponse;
import com.LuanVanTotNghiep.service.SubjectService;

@RestController
@RequestMapping
@CrossOrigin("*")
public class SubjectController {
	
	@Autowired
	private SubjectService subjectService;
	
	
	@GetMapping("/getSubject")
	public List<SubjectResponse> getAllSubject(){
		return subjectService.getAllSubject();
	}
}
