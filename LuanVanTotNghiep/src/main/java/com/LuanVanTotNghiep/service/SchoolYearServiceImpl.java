package com.LuanVanTotNghiep.service;

import com.LuanVanTotNghiep.Mapper.SchoolYearMapper;
import com.LuanVanTotNghiep.dto.response.ApiResponse;
import com.LuanVanTotNghiep.dto.response.SchoolYearResponse;
import com.LuanVanTotNghiep.models.SchoolYear;
import com.LuanVanTotNghiep.repository.SchoolYearRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchoolYearServiceImpl implements SchoolYearService{

    @Autowired
    private SchoolYearRepository schoolYearRepository;

    @Autowired
    private SchoolYearMapper schoolYearMapper;

    @Override
    public ApiResponse<List<SchoolYearResponse>> getAll() {
        List<SchoolYear> schoolYearList = schoolYearRepository.findAll();
        List<SchoolYearResponse> schoolYearResponseList = schoolYearList.stream()
                .map(schoolYear -> schoolYearMapper.toSchoolYearResponse(schoolYear))
                .toList();
        return ApiResponse.<List<SchoolYearResponse>>builder()
                .result(schoolYearResponseList)
                .build();
    }
}
