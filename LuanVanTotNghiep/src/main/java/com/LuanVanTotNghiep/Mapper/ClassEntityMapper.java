package com.LuanVanTotNghiep.Mapper;

import com.LuanVanTotNghiep.dto.request.ClassEntityRequest;
import com.LuanVanTotNghiep.dto.response.ClassEntityResponse;
import com.LuanVanTotNghiep.models.ClassEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ClassEntityMapper {
    ClassEntityResponse toClassEntityResponse(ClassEntity classEntity);

    @Mapping(target = "schoolYear", ignore = true)
    @Mapping(target = "grade", ignore = true)
    void updateClassEntity(@MappingTarget ClassEntity classEntity, ClassEntityRequest request);
}
