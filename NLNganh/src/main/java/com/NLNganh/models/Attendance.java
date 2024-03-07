package com.NLNganh.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "attendances")
public class Attendance {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int buoi;
	
	private Date day; 
	
	private int status;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "student_id")
	private User student;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "semester_id")
	private Semester semester;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "year_id")
	private Year year;

	public Attendance() {
		super();
	}

	public Attendance(Long id, int buoi, Date day, int status, User student, Semester semester, Year year) {
		super();
		this.id = id;
		this.buoi = buoi;
		this.day = day;
		this.status = status;
		this.student = student;
		this.semester = semester;
		this.year = year;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getBuoi() {
		return buoi;
	}

	public void setBuoi(int buoi) {
		this.buoi = buoi;
	}

	public Date getDay() {
		return day;
	}

	public void setDay(Date day) {
		this.day = day;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public User getStudent() {
		return student;
	}

	public void setStudent(User student) {
		this.student = student;
	}

	public Semester getSemester() {
		return semester;
	}

	public void setSemester(Semester semester) {
		this.semester = semester;
	}

	public Year getYear() {
		return year;
	}

	public void setYear(Year year) {
		this.year = year;
	}

	
	
	
}
