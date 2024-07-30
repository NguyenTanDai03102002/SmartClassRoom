package com.LuanVanTotNghiep.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.LuanVanTotNghiep.Exception.AppException;
import com.LuanVanTotNghiep.Exception.ErrorCode;
import com.LuanVanTotNghiep.Mapper.ClassEntityMapper;
import com.LuanVanTotNghiep.dto.request.ArrayIdRequest;
import com.LuanVanTotNghiep.dto.request.ClassEntityRequest;
import com.LuanVanTotNghiep.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import com.LuanVanTotNghiep.dto.response.ClassEntityResponse;
import com.LuanVanTotNghiep.models.Grade;
import com.LuanVanTotNghiep.models.ClassEntity;
import com.LuanVanTotNghiep.models.User;
import com.LuanVanTotNghiep.models.SchoolYear;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ClassEntityServiceImpl implements ClassEntityService {

	ClassEntityRepository classEntityRepository;
	SchoolYearRepository schoolYearRepository;
	GradeRepository gradeRepository;
	UserRepository userRepository;
	ClassEntityMapper classEntityMapper;

	@Override
	public List<ClassEntityResponse> getAllBySchoolYear(Long schoolYearId, String keyword) {
		if(schoolYearId != null){
			SchoolYear schoolYear = schoolYearRepository.findById(schoolYearId)
					.orElseThrow(() -> new AppException(ErrorCode.YEAR_NOT_EXISTED));

			List<ClassEntity> classEntityList = classEntityRepository
					.findBySchoolYearAndKeyWord(schoolYear,keyword);

            return classEntityList.stream()
					.map(classEntityMapper::toClassEntityResponse)
					.toList();
		}
		return new ArrayList<>();
	}

	@Override
	public ClassEntityResponse createClass(Long schoolYearId, Long gradeId,
										   ClassEntityRequest request) {
		boolean existsByNameOfSchoolYear =
				classEntityRepository.existsByNameOfSchoolYear(schoolYearId,request.getName());

		if(existsByNameOfSchoolYear){
			throw new AppException(ErrorCode.CLASS_EXISTED);
		}
		SchoolYear schoolYear = schoolYearRepository.findById(schoolYearId)
				.orElseThrow(() -> new AppException(ErrorCode.YEAR_NOT_EXISTED));
		Grade grade = gradeRepository.findById(gradeId)
				.orElseThrow(() -> new AppException(ErrorCode.GRADE_NOT_EXISTED));
		User teacher = userRepository.findById(request.getTeacherId())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

		boolean teacherExistsInYear  =
				classEntityRepository.existsByClassTeacherAndSchoolYear(teacher,schoolYear);

		if(teacherExistsInYear){
			throw new AppException(ErrorCode.TEACHER_ALREADY_ASSIGNED);
		}

		return classEntityMapper.toClassEntityResponse(
				classEntityRepository.save(ClassEntity.builder()
						.name(request.getName())
						.schoolYear(schoolYear)
						.grade(grade)
						.classTeacher(teacher)
						.build()));
	}

	@Override
	public ClassEntityResponse editClass(Long classEntityId, Long schoolYearId, Long gradeId,
										ClassEntityRequest request) {

		ClassEntity classEntity = classEntityRepository.findById(classEntityId)
				.orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));

		SchoolYear schoolYear = schoolYearRepository.findById(schoolYearId)
				.orElseThrow(() -> new AppException(ErrorCode.YEAR_NOT_EXISTED));

		Grade grade = gradeRepository.findById(gradeId)
				.orElseThrow(() -> new AppException(ErrorCode.GRADE_NOT_EXISTED));

		User teacher = userRepository.findById(request.getTeacherId())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

		boolean teacherExistsInYear  =
				classEntityRepository.existsByClassTeacherAndSchoolYear(teacher,schoolYear);

		if(teacherExistsInYear){
			throw new AppException(ErrorCode.TEACHER_ALREADY_ASSIGNED);
		}

		classEntityMapper.updateClassEntity(classEntity,request);
		classEntity.setSchoolYear(schoolYear);
		classEntity.setGrade(grade);
		classEntity.setClassTeacher(teacher);

		return classEntityMapper.toClassEntityResponse(classEntityRepository.save(classEntity));
	}

	@Override
	public void deleteClass(ArrayIdRequest request) {
		request.getArrId().forEach(id -> {
			ClassEntity classEntity = classEntityRepository.findById(id)
					.orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
			if(!classEntity.getStudents().isEmpty())
				throw new AppException(ErrorCode.STUDENT_EXISTED);
			classEntityRepository.delete(classEntity);
		});
    }

	@Override
	public void cpyData(Long schoolYearId) {
		SchoolYear schoolYearNew = schoolYearRepository.findById(schoolYearId)
				.orElseThrow(() -> new AppException(ErrorCode.YEAR_NOT_EXISTED));
		if (!classEntityRepository.findBySchoolYear(schoolYearNew).isEmpty()) {
			throw new AppException(ErrorCode.CLASS_EXISTED);
		}

		SchoolYear schoolYearOld = schoolYearRepository.findBySchoolYear(schoolYearNew.getSchoolYear() -1);
		if(schoolYearOld == null){
			throw new AppException(ErrorCode.YEAR_NOT_EXISTED);
		}
		List<ClassEntity> classEntityList = classEntityRepository.findBySchoolYear(schoolYearOld);
		if(classEntityList.isEmpty()){
			throw new AppException(ErrorCode.NO_DATA);
		}
		Set<ClassEntity> newClassEntities = new HashSet<>();
		for (ClassEntity classEntity : classEntityList) {
			ClassEntity newClassEntity = ClassEntity.builder()
					.name(classEntity.getName())
					.grade(classEntity.getGrade())
					.schoolYear(schoolYearNew)
					.build();
			newClassEntities.add(newClassEntity);
		}
		classEntityRepository.saveAll(newClassEntities);
	}
}
