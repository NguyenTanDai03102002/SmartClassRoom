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
@Table(name = "blocks")
public class Block {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "block_name" , nullable = false , unique = true)
	private int name;
	
	@OneToMany(mappedBy = "block" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<ClassEntity> classEntity =  new HashSet<>();

	public Block() {
		super();
	}

	public Block(Long id, int name) {
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

	public int getName() {
		return name;
	}

	public void setName(int name) {
		this.name = name;
	}

	public Set<ClassEntity> getClassEntity() {
		return classEntity;
	}

	public void setClassEntity(Set<ClassEntity> classEntity) {
		this.classEntity = classEntity;
	}
}
