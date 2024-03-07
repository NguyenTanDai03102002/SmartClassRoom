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
@Table(name = "semesters")
public class Semester {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false , unique = true , length = 10)
	private String mahk;
	
	@Column(nullable = false , unique = true , length = 10)
	private String tenhk;
	
	private String timeStart;
	
	private String endStart;
	
	
	@OneToMany(mappedBy = "semester" , cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Score> scores = new HashSet<>();

	@OneToMany(mappedBy = "semester" , cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Attendance> attendance = new HashSet<>();

	public Semester() {
		super();
	}

	public Semester(Long id, String mahk, String tenhk, String timeStart, String endStart) {
		super();
		this.id = id;
		this.mahk = mahk;
		this.tenhk = tenhk;
		this.timeStart = timeStart;
		this.endStart = endStart;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMahk() {
		return mahk;
	}

	public void setMahk(String mahk) {
		this.mahk = mahk;
	}

	public String getTenhk() {
		return tenhk;
	}

	public void setTenhk(String tenhk) {
		this.tenhk = tenhk;
	}

	public String getTimeStart() {
		return timeStart;
	}

	public void setTimeStart(String timeStart) {
		this.timeStart = timeStart;
	}

	public String getEndStart() {
		return endStart;
	}

	public void setEndStart(String endStart) {
		this.endStart = endStart;
	}

	public Set<Score> getScores() {
		return scores;
	}

	public void setScores(Set<Score> scores) {
		this.scores = scores;
	}

	public Set<Attendance> getAttendance() {
		return attendance;
	}

	public void setAttendance(Set<Attendance> attendance) {
		this.attendance = attendance;
	}


	
	
}
