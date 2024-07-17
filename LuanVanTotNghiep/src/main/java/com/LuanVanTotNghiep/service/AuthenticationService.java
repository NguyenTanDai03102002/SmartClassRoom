package com.LuanVanTotNghiep.service;

import com.LuanVanTotNghiep.dto.request.AuthenticationRequest;
import com.LuanVanTotNghiep.dto.response.ApiResponse;
import com.LuanVanTotNghiep.dto.response.AuthenticationResponse;

public interface AuthenticationService {
    ApiResponse<AuthenticationResponse> authenticate(AuthenticationRequest request);
}
