package com.LuanVanTotNghiep.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.LuanVanTotNghiep.models.SchoolYear;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SchoolYearRepository extends JpaRepository<SchoolYear,Long> {
	SchoolYear findBySchoolYear(int schoolYear);

    @Query(value = "SELECT s FROM SchoolYear s WHERE CAST(s.schoolYear AS string) LIKE %:keyword% ")
    List<SchoolYear> findAllByKeyWord(String keyword);
}
