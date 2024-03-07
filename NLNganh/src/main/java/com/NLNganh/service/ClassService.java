package com.NLNganh.service;

import java.util.List;

import com.NLNganh.dto.ClassesDTO;

public interface ClassService {

	List<ClassesDTO> getClassesByYear(int year);

}
