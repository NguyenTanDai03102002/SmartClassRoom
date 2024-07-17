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
public class SchoolYear {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private int schoolYear;
	
	@OneToMany(mappedBy = "schoolYear" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<ClassEntity> classEntities = new HashSet<>();
	
	@OneToMany(mappedBy = "schoolYear" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Attendance> attendances = new HashSet<>();
	
	@OneToMany(mappedBy = "schoolYear" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Teach> teaches = new HashSet<>();

	@OneToMany(mappedBy = "schoolYear" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<AcademicResult> academicResults = new HashSet<>();
}
