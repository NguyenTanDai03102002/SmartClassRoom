package com.LuanVanTotNghiep.dto.response;

import com.LuanVanTotNghiep.models.Lesson;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.DayOfWeek;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeachResponse {

	 Long id;
	
	 UserResponse teacher;
	
	 SubjectResponse subject;
	
	 ClassEntityResponse classEntity;
	
	 SchoolYearResponse year;
	
	 DayOfWeek dayOfWeek;

	 Set<Lesson> lessons;

}
