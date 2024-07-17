package com.LuanVanTotNghiep.controller;

import com.LuanVanTotNghiep.dto.request.AuthenticationRequest;
import com.LuanVanTotNghiep.dto.response.ApiResponse;
import com.LuanVanTotNghiep.dto.response.AuthenticationResponse;
import com.LuanVanTotNghiep.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> authenticate(@RequestBody  AuthenticationRequest request){
        return authenticationService.authenticate(request);
    }
}
