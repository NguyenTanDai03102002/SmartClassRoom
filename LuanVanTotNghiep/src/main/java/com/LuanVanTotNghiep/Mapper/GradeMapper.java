package com.LuanVanTotNghiep.Mapper;

import com.LuanVanTotNghiep.dto.response.GradeResponse;
import com.LuanVanTotNghiep.models.Grade;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GradeMapper {
    GradeResponse toGradeResponse(Grade grade);
}
