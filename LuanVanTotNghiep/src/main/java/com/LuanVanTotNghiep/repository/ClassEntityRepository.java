package com.LuanVanTotNghiep.repository;

import java.util.List;

import com.LuanVanTotNghiep.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.LuanVanTotNghiep.models.Grade;
import com.LuanVanTotNghiep.models.ClassEntity;
import com.LuanVanTotNghiep.models.SchoolYear;
import org.springframework.data.jpa.repository.Query;


public interface ClassEntityRepository extends JpaRepository<ClassEntity,Long> {

	@Query(value = "SELECT COUNT(*) > 0 FROM ClassEntity c WHERE c.schoolYear.id = ?1 AND c.name = ?2")
	boolean existsByNameOfSchoolYear(Long schoolYearId, String name);

	@Query(value = "SELECT c FROM ClassEntity c WHERE c.schoolYear = ?1 AND LOWER(c.name) LIKE LOWER(CONCAT(?2, '%'))")
	List<ClassEntity> findBySchoolYearAndKeyWord(SchoolYear schoolYear, String keyword);

	List<ClassEntity> findBySchoolYear(SchoolYear schoolYear);

//	List<ClassEntity> findBySchoolYearAndGrade(SchoolYear schoolYear, Grade grade);

	boolean existsByClassTeacherAndSchoolYear(User teacher, SchoolYear schoolYear);
}
