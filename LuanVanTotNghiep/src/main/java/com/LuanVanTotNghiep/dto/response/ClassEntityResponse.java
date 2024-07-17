package com.LuanVanTotNghiep.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ClassEntityResponse {
	 Long id;
     String name;
     GradeResponse blockName;
     UserResponse teacher;
     int year;

}
