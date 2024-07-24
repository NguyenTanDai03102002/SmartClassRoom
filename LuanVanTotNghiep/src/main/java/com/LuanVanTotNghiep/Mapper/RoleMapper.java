package com.LuanVanTotNghiep.Mapper;

import com.LuanVanTotNghiep.dto.response.RoleResponse;
import com.LuanVanTotNghiep.models.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleResponse toRoleResponse(Role role);
}
