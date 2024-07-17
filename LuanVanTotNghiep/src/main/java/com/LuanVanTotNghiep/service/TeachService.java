package com.LuanVanTotNghiep.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.LuanVanTotNghiep.dto.response.TeachResponse;
import com.LuanVanTotNghiep.dto.request.TeachRequest;

public interface TeachService {

	ResponseEntity<?> XepGiangDay(List<TeachRequest> teachsRequestDTO);

	List<TeachResponse> GetGiangDay();

	List<TeachResponse> GetGiangDayByteacherId(Long teacherId);
	
}
