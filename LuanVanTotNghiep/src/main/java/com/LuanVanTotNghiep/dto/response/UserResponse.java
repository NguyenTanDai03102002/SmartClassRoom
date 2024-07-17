package com.LuanVanTotNghiep.dto.response;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

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
	 String image;
	 String email;
	 String password;
	 String job;
	 String ethnicity;
	 String nationality;
	 AddressResponse addressResponse;
	 Set<RoleResponse> roles;

	
}
