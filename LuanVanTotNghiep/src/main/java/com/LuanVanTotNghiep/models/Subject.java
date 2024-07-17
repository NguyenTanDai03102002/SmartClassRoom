package com.LuanVanTotNghiep.models;

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
public class Subject {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@ManyToMany(mappedBy = "subjects")
	private Set<User> users = new HashSet<>();
	
	@OneToMany(mappedBy = "subject" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Score> scores = new HashSet<>();
	
	@OneToMany(mappedBy = "subject" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Teach> teaches = new HashSet<>();

}
