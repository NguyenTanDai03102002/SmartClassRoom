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
@Table(name = "categories")
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "category_name" , nullable = false , unique = true, length = 128)
	private String name;
	
	@Column(nullable = false , unique = true , length = 5)
	private int heso;
	
	
	@OneToMany(mappedBy = "category" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Score> scores = new HashSet<>();


	public Category() {
		super();
	}


	public Category(Long id, String name, int heso, Set<Score> scores) {
		super();
		this.id = id;
		this.name = name;
		this.heso = heso;
		this.scores = scores;
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


	public int getHeso() {
		return heso;
	}


	public void setHeso(int heso) {
		this.heso = heso;
	}


	public Set<Score> getScores() {
		return scores;
	}


	public void setScores(Set<Score> scores) {
		this.scores = scores;
	}
	
	

}
