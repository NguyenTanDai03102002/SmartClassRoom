package com.NLNganh.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.NLNganh.models.Role;
import com.NLNganh.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDTO {
	private Long id;
	
	private String maSo;
	
	private String fullName;
	
	private LocalDate birthday;
	
	private String address;
	
	private String phoneNumber;
	
	private int sex;
	
	private String image;
	
	private String email;
	
	@JsonIgnore
	private String password;
	
	private List<String> roles;

	public UserDTO() {
		super();
	}

	public UserDTO(Long id,String maSo,String fullName, LocalDate birthday, String address, String phoneNumber, int sex, String image,
			String email,String password, List<String> roles) {
		super();
		this.id = id;
		this.maSo = maSo;
		this.fullName = fullName;
		this.birthday = birthday;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.sex = sex;
		this.image = image;
		this.email = email;
		this.password = password;
		this.roles = roles;
	}
	
	public static UserDTO mapUsertoUserDTO(User user) {
        return new UserDTO(user.getId(),user.getMaSo(),user.getFullName(), user.getBirthday(), user.getAddress(), user.getPhoneNumber(), user.getSex()
        		, user.getImage(), user.getEmail(), null, user.getRoles().stream().map(Role::getName).collect(Collectors.toList()));
    }
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMaSo() {
		return maSo;
	}

	public void setMaSo(String maSo) {
		this.maSo = maSo;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public LocalDate getBirthday() {
		return birthday;
	}

	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	
	
}
