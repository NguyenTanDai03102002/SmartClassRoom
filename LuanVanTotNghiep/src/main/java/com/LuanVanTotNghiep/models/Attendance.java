package com.LuanVanTotNghiep.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Attendance {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Date date;
	private int status;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "student_id")
	private User student;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "semester_id")
	private Semester semester;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "year_id")
	private SchoolYear schoolYear;
}
