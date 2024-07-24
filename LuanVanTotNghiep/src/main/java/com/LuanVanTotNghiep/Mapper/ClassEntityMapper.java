package com.LuanVanTotNghiep.Mapper;

import com.LuanVanTotNghiep.dto.response.ClassEntityResponse;
import com.LuanVanTotNghiep.models.ClassEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClassEntityMapper {
    ClassEntityResponse toClassEntityResponse(ClassEntity classEntity);
}
