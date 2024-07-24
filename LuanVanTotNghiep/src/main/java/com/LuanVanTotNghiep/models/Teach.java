package com.LuanVanTotNghiep.models;

import java.time.DayOfWeek;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(exclude = {"lessons","user","subject","classEntity","schoolYear"})
@ToString(exclude = {"lessons","user","subject","classEntity","schoolYear"})
@Entity
public class Teach {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private Long id;

	private DayOfWeek dayOfWeek;

	@ManyToMany(fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
	@JoinTable(name ="teaches_lessons" ,
			joinColumns = @JoinColumn(name = "teach_id") ,
			inverseJoinColumns = @JoinColumn(name = "lesson_id"))
	private Set<Lesson> lessons = new HashSet<>();
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "teacher_id")
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "subject_id")
	private Subject subject;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "class_id")
	private ClassEntity classEntity;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "year_id")
	private SchoolYear schoolYear;

}
