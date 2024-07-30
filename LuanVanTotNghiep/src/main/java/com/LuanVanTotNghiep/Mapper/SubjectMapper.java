package com.LuanVanTotNghiep.Mapper;

import com.LuanVanTotNghiep.dto.response.SubjectResponse;
import com.LuanVanTotNghiep.models.Subject;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubjectMapper {
    SubjectResponse toSubjectResponse(Subject subject);
}
