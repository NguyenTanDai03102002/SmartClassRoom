package com.LuanVanTotNghiep.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SubjectResponse {
	 Long id;
	 String name;

	
}
