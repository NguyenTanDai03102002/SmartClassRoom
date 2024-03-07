package com.NLNganh.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "years")
public class Year {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false , unique = true , length = 10)
	private int namhoc;
	
	@OneToMany(mappedBy = "year" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Score> scores = new HashSet<>();
	
	@OneToMany(mappedBy = "year" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<ClassEntity> classEntities = new HashSet<>();
	
	@OneToMany(mappedBy = "year" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Attendance> attendance = new HashSet<>();
	
	@OneToMany(mappedBy = "year" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Teach> teach = new HashSet<>();

	public Year() {
		super();
	}

	public Year(Long id, int namhoc) {
		super();
		this.id = id;
		this.namhoc = namhoc;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getNamhoc() {
		return namhoc;
	}

	public void setNamhoc(int namhoc) {
		this.namhoc = namhoc;
	}

	public Set<Score> getScores() {
		return scores;
	}

	public void setScores(Set<Score> scores) {
		this.scores = scores;
	}

	public Set<ClassEntity> getClassEntity() {
		return classEntities;
	}

	public void setClassEntity(Set<ClassEntity> classEntities) {
		this.classEntities = classEntities;
	}

	public Set<Attendance> getAttendance() {
		return attendance;
	}

	public void setAttendance(Set<Attendance> attendance) {
		this.attendance = attendance;
	}

	public Set<Teach> getTeach() {
		return teach;
	}

	public void setTeach(Set<Teach> teach) {
		this.teach = teach;
	}

	
	
	
}
