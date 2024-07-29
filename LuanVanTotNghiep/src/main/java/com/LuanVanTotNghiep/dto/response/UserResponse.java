package com.LuanVanTotNghiep.dto.response;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
	 Long id;
	 String userCode;
	 String fullName;
	 LocalDate birthday;
	 String phoneNumber;
	 int sex;
	 String imageUrl;
	 String email;
	 @JsonIgnore
	 String password;
	 String job;
	 String ethnicity;
	 String nationality;
	 AddressResponse addressResponse;
	 Set<RoleResponse> roles;

	
}
