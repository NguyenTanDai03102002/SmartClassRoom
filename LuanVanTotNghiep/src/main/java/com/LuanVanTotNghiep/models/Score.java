package com.LuanVanTotNghiep.models;

import java.util.Date;

import lombok.*;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(exclude = {"subject","category","academicResult"})
@ToString(exclude = {"subject","category","academicResult"})
@Entity
public class Score {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long id;

	private String score;
	private Date createdTime;
	private Date updatedTime;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "subject_id")
	private Subject subject;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "academicResult_id")
	private AcademicResult academicResult;


}
