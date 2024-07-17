package com.LuanVanTotNghiep.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeachRequest {
	 Long teacherId;
	 Long subjectId;
	 Long classEntityId;
	 int year;
	 DayOfWeek dayOfWeek;
     Set<Integer> lessons;

}
