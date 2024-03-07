package com.NLNganh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NLNganh.models.Year;

public interface YearRepository extends JpaRepository<Year,Long> {
	Year findByNamhoc(int namhoc);
}
