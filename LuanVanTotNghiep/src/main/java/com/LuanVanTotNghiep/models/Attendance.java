package com.LuanVanTotNghiep.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Attendance {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	Long id;
	
	Date date;
	int status;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "student_id")
	User student;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "semester_id")
	Semester semester;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "year_id")
	SchoolYear schoolYear;
}
