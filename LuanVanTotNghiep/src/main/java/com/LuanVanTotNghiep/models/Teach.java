package com.LuanVanTotNghiep.models;

import java.time.DayOfWeek;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Teach {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	Long id;

	DayOfWeek dayOfWeek;
	
	@ManyToOne
	@JoinColumn(name = "teacher_id")
	User teacher;
	
	@ManyToOne
	@JoinColumn(name = "subject_id")
	Subject subject;
	
	@ManyToOne
	@JoinColumn(name = "class_id")
	ClassEntity classEntity;
	
	@ManyToOne
	@JoinColumn(name = "year_id")
	SchoolYear schoolYear;

}
