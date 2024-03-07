package com.NLNganh.models;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "classEntity")
public class ClassEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "class_name" , nullable = false , unique = true ,length = 10)
	private String name;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "block_id")
	private Block block;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gvcv")
	private User teacher;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "year_id")
	private Year year;
		
	@ManyToMany(mappedBy = "classEntity")
	private Set<User> users = new HashSet<>();
	
	@OneToMany(mappedBy = "classEntity" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Teach> teachs =  new HashSet<>();

	public ClassEntity() {
		super();
	}

	public ClassEntity(Long id, String name, Block block,Year year) {
		super();
		this.id = id;
		this.name = name;
		this.block = block;
		this.year = year;

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

	public Block getBlock() {
		return block;
	}

	public void setBlock(Block block) {
		this.block = block;
	}

	public User getTeacher() {
		return teacher;
	}

	public void setTeacher(User teacher) {
		this.teacher = teacher;
	}

	public Year getYear() {
		return year;
	}

	public void setYear(Year year) {
		this.year = year;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public Set<Teach> getTeachs() {
		return teachs;
	}

	public void setTeachs(Set<Teach> teachs) {
		this.teachs = teachs;
	}

	


	
	

}
