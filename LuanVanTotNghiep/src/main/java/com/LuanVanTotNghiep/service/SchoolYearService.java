package com.LuanVanTotNghiep.service;

import com.LuanVanTotNghiep.dto.response.ApiResponse;
import com.LuanVanTotNghiep.dto.response.SchoolYearResponse;

import java.util.List;

public interface SchoolYearService {
    List<SchoolYearResponse> getAll(String keyword);
}
