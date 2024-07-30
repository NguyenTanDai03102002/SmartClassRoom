package com.LuanVanTotNghiep.service;

import com.LuanVanTotNghiep.Mapper.SchoolYearMapper;
import com.LuanVanTotNghiep.dto.response.SchoolYearResponse;
import com.LuanVanTotNghiep.models.SchoolYear;
import com.LuanVanTotNghiep.repository.SchoolYearRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SchoolYearServiceImpl implements SchoolYearService{

    SchoolYearRepository schoolYearRepository;
    SchoolYearMapper schoolYearMapper;

    @Override
    public List<SchoolYearResponse> getAll(String keyword) {

        List<SchoolYear> schoolYearList = schoolYearRepository.findAllByKeyWord(keyword);

        return schoolYearList.stream()
                .map(schoolYearMapper::toSchoolYearResponse)
                .toList();
    }
}
