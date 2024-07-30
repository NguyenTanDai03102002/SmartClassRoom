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
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Score {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	Long id;

	String score;
	Date createdTime;
	Date updatedTime;
	
	@ManyToOne
	@JoinColumn(name = "subject_id")
	Subject subject;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	Category category;

	@ManyToOne
	@JoinColumn(name = "academicResult_id")
	AcademicResult academicResult;


}
