package com.LuanVanTotNghiep.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeacherClassRequest {
	 Long classId;
     Long teacherId;

}
