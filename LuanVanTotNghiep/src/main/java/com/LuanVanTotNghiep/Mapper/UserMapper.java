package com.LuanVanTotNghiep.Mapper;

import com.LuanVanTotNghiep.dto.response.UserResponse;
import com.LuanVanTotNghiep.models.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse UserToUserResponse(User user);
}
