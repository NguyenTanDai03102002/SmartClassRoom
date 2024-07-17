package com.LuanVanTotNghiep.service;

import com.LuanVanTotNghiep.Exception.AppException;
import com.LuanVanTotNghiep.Exception.ErrorCode;
import com.LuanVanTotNghiep.Mapper.UserMapper;
import com.LuanVanTotNghiep.dto.request.AuthenticationRequest;
import com.LuanVanTotNghiep.dto.response.ApiResponse;
import com.LuanVanTotNghiep.dto.response.AuthenticationResponse;
import com.LuanVanTotNghiep.models.User;
import com.LuanVanTotNghiep.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class AuthenticationServiceImpl implements AuthenticationService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Value("${jwt.key}")
    protected String SIGNER_KEY;

    @NonFinal
    @Override
    public ApiResponse<AuthenticationResponse> authenticate(AuthenticationRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        var user = userRepository.findByUserCode(request.getUserCode());
        if (user == null)
            throw new AppException(ErrorCode.USER_EXISTED);

        boolean authenticated  = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if(!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        var token = generateToken(request.getUserCode());

        return ApiResponse.<AuthenticationResponse>builder()
                .result(AuthenticationResponse.builder()
                        .token(token)
                        .user(userMapper.UserToUserResponse(user))
                        .build())
                .build();
    }

    private String generateToken(String userCode) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(userCode)
                .issuer("NguyenTanDai.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header,payload);

        try{
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));

            return jwsObject.serialize();
        }catch (JOSEException e){
            throw new RuntimeException(e.getMessage());
        }

    }
}