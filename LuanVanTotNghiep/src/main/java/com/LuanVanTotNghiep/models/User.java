package com.LuanVanTotNghiep.models;

import java.time.LocalDate;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column(name = "userCode", unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8mb4_unicode_ci")
	String userCode;
	String fullName;
	LocalDate birthday;
	String phoneNumber;
	int sex;
	String imageUrl;
	String email;
	String password;
	String job;
	String ethnicity;
	String nationality;

	@ManyToMany
	Set<Role> roles;

	@ManyToOne
	@JoinColumn(name = "address_id")
	Address address;
}
