package com.LuanVanTotNghiep.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.LuanVanTotNghiep.models.SchoolYear;

public interface YearRepository extends JpaRepository<SchoolYear,Long> {
	SchoolYear findBySchoolYear(int schoolYear);
}
