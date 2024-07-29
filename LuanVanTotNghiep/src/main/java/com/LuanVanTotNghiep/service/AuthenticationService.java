package com.LuanVanTotNghiep.service;

import com.LuanVanTotNghiep.dto.request.AuthenticationRequest;
import com.LuanVanTotNghiep.dto.request.IntrospectRequest;
import com.LuanVanTotNghiep.dto.request.LogoutRequest;
import com.LuanVanTotNghiep.dto.request.RefreshRequest;
import com.LuanVanTotNghiep.dto.response.AuthenticationResponse;
import com.LuanVanTotNghiep.dto.response.IntrospectResponse;
import com.LuanVanTotNghiep.dto.response.RefreshResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface AuthenticationService {
    AuthenticationResponse authenticate(AuthenticationRequest request);
    IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException;
    void logout(LogoutRequest request) throws ParseException, JOSEException;
    RefreshResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException;
}
