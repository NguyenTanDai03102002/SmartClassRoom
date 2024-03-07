package com.NLNganh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NLNganh.models.ClassEntity;
import com.NLNganh.models.Year;


public interface ClassRepository extends JpaRepository<ClassEntity,Long> {
	List<ClassEntity> findByYear(Year year);
}
