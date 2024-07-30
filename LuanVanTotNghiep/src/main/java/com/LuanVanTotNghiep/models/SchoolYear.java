package com.LuanVanTotNghiep.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class SchoolYear {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	int schoolYear;
	
}
