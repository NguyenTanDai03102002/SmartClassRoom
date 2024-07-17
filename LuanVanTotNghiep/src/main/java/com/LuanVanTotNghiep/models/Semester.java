package com.LuanVanTotNghiep.models;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Semester {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String code;
	private String name;

	private int startDay;
	private int startMonth;

	private int endDay;
	private int endMonth;

	@OneToMany(mappedBy = "semester" , cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Attendance> attendances = new HashSet<>();

	@OneToMany(mappedBy = "semester" , cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<AcademicResult> academicResults = new HashSet<>();
}
