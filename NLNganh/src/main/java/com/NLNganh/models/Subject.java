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
@Table(name = "subjects")
public class Subject {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "subject_name" , nullable = false , unique = true, length = 64)
	private String name;
	
	@OneToMany(mappedBy = "subject" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Score> scores = new HashSet<>();
	
	@OneToMany(mappedBy = "subject" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Teach> teach = new HashSet<>();

	public Subject() {
		super();
	}

	public Subject(Long id, String name) {
		super();
		this.id = id;
		this.name = name;

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Score> getScores() {
		return scores;
	}

	public void setScores(Set<Score> scores) {
		this.scores = scores;
	}

	public Set<Teach> getTeach() {
		return teach;
	}

	public void setTeach(Set<Teach> teach) {
		this.teach = teach;
	}

	
}
