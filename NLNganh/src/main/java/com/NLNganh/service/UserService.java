package com.NLNganh.service;

import java.util.List;

import com.NLNganh.dto.AuthRequestDTO;
import com.NLNganh.dto.JwtReponseDTO;
import com.NLNganh.dto.UserDTO;

public interface UserService {
	JwtReponseDTO UserLogin(AuthRequestDTO authRequestDTO);

	List<UserDTO> getAllTeacher();
}
