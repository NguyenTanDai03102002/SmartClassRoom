package com.LuanVanTotNghiep.models;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String userCode;
	private String fullName;
	private LocalDate birthday;
	private String phoneNumber;
	private int sex;
	private String image;
	private String email;
	private String password;
	private String job;
	private String ethnicity;
	private String nationality;
	
	
	@ManyToMany(fetch = FetchType.EAGER ,cascade = CascadeType.ALL)
	@JoinTable(name ="users_roles" ,
			joinColumns = @JoinColumn(name = "user_id") , 
			inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	

	@ManyToMany(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
	@JoinTable(name ="students_classes" ,
			joinColumns = @JoinColumn(name = "student_id") ,
			inverseJoinColumns = @JoinColumn(name = "class_id"))
	private Set<ClassEntity> classEntity = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
	@JoinTable(name ="teachers_subjects" ,
			joinColumns = @JoinColumn(name = "teacher_id") ,
			inverseJoinColumns = @JoinColumn(name = "subject_id"))
	private Set<Subject> subjects = new HashSet<>();
	
	@OneToMany(mappedBy = "user" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Teach> teaches =  new HashSet<>();

	@OneToMany(mappedBy = "student" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<AcademicResult> academicResults =  new HashSet<>();

	@OneToMany(mappedBy = "student" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Attendance> attendances =  new HashSet<>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "address_id")
	private Address address;

}
