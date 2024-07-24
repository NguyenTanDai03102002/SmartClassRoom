package com.LuanVanTotNghiep.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.LuanVanTotNghiep.models.Grade;
import com.LuanVanTotNghiep.models.ClassEntity;
import com.LuanVanTotNghiep.models.SchoolYear;


public interface ClassEntityRepository extends JpaRepository<ClassEntity,Long> {

	List<ClassEntity> findBySchoolYear(SchoolYear schoolYear);

	List<ClassEntity> findBySchoolYearAndGrade(SchoolYear schoolYear, Grade grade);

}
