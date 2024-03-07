package com.NLNganh.dto;

public class JwtReponseDTO {
    private String token;

    private UserDTO user;
    
	public JwtReponseDTO() {
		super();
	}
	public JwtReponseDTO(String token, UserDTO user) {
		super();
		this.token = token;
		this.user = user;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public UserDTO getUser() {
		return user;
	}
	public void setUser(UserDTO user) {
		this.user = user;
	}
   


    
}
