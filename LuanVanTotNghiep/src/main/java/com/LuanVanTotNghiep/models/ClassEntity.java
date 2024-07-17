package com.LuanVanTotNghiep.models;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
public class ClassEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "grade_id")
	private Grade grade;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gvcv")
	private User teacher;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "year_id")
	private SchoolYear schoolYear;
		
	@ManyToMany(mappedBy = "classEntity")
	private Set<User> students = new HashSet<>();
	
	@OneToMany(mappedBy = "classEntity" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Teach> teaches =  new HashSet<>();
}
