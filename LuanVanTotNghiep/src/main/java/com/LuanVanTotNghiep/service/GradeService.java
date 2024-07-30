package com.LuanVanTotNghiep.service;

import java.util.List;

import com.LuanVanTotNghiep.dto.response.ApiResponse;
import com.LuanVanTotNghiep.dto.response.GradeResponse;

public interface GradeService {
    List<GradeResponse> getAll();
}
