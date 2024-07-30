package com.LuanVanTotNghiep.models;


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
public class ClassEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	String name;

	@ManyToMany
	@JoinTable(name ="classes_students")
	Set<User> students;

	@ManyToOne
	@JoinColumn(name = "grade_id")
	Grade grade;
	
	@ManyToOne
	@JoinColumn(name = "classTeacher_id")
	User classTeacher;
	
	@ManyToOne
	@JoinColumn(name = "year_id")
	SchoolYear schoolYear;

}
