package com.NLNganh.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NLNganh.dto.AuthRequestDTO;
import com.NLNganh.dto.JwtReponseDTO;
import com.NLNganh.dto.UserDTO;

import com.NLNganh.service.UserService;

@RestController
@RequestMapping
@CrossOrigin("*")
public class UserController {
  
	@Autowired
	private UserService userService;
	
    @PostMapping("/userLogin")
    public JwtReponseDTO AuthenticateAndGetToken(@RequestBody AuthRequestDTO authRequestDTO) {
    	return userService.UserLogin(authRequestDTO);
    }
    
    @GetMapping("/getImage/{userid}")
    public Resource getImage(@PathVariable Long userid) throws IOException{
    	return userService.getImageMainUrlFromUser(userid);
    	
    }
	
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/teacher")
    public List<UserDTO> getAllTeacher() {
    	return userService.getAllTeacher();
       
    }
}
