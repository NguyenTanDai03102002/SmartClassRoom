package com.LuanVanTotNghiep.Mapper;

import com.LuanVanTotNghiep.dto.response.SchoolYearResponse;
import com.LuanVanTotNghiep.models.SchoolYear;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SchoolYearMapper {
    SchoolYearResponse toSchoolYearResponse(SchoolYear schoolYear);
}
