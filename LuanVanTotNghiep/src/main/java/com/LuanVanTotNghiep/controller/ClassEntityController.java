package com.LuanVanTotNghiep.controller;

import java.util.List;

import com.LuanVanTotNghiep.dto.request.ArrayIdRequest;
import com.LuanVanTotNghiep.dto.request.ClassEntityRequest;
import com.LuanVanTotNghiep.dto.response.ApiResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.LuanVanTotNghiep.dto.response.ClassEntityResponse;
import com.LuanVanTotNghiep.service.ClassEntityService;

@RestController
@RequestMapping("/classEntity")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ClassEntityController {
	
	ClassEntityService classEntityService;

	@GetMapping("/getAllBySchoolYear")
	ApiResponse<List<ClassEntityResponse>> getAllByYear(@RequestParam(required = false) Long schoolYearId,
														@RequestParam(required = false) String keyword) {
		List<ClassEntityResponse> result = classEntityService.getAllBySchoolYear(schoolYearId,keyword);
		return ApiResponse.<List<ClassEntityResponse>>builder()
				.result(result)
				.build();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/createClass")
	ApiResponse<ClassEntityResponse> CreateClass(@RequestParam Long schoolYearId,
												 @RequestParam Long gradeId,
												 @RequestBody ClassEntityRequest request){
		ClassEntityResponse result = classEntityService.createClass(schoolYearId,gradeId,request);
		return ApiResponse.<ClassEntityResponse>builder()
				.result(result)
				.build();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/editClass/{classEntityId}")
	ApiResponse<ClassEntityResponse> EditClass(@PathVariable Long classEntityId,
														@RequestParam Long schoolYearId,
														@RequestParam Long gradeId,
														@RequestBody ClassEntityRequest request){
		ClassEntityResponse result = classEntityService.editClass(classEntityId,
				schoolYearId,gradeId,request);

		return ApiResponse.<ClassEntityResponse>builder()
				.result(result)
				.build();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteClass")
	ApiResponse<String> DeleteClass(@RequestBody ArrayIdRequest request){
		classEntityService.deleteClass(request);
		return ApiResponse.<String>builder()
				.result("Xóa thành công")
				.build();
    }


	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/cpyData")
	ApiResponse<String> CpyData(@RequestParam Long schoolYearId){
		classEntityService.cpyData(schoolYearId);
		return ApiResponse.<String>builder()
				.result("Dữ liệu đã được sao chép")
				.build();
	}

}
