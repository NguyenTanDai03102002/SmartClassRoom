package com.LuanVanTotNghiep.controller;

import com.LuanVanTotNghiep.dto.response.ApiResponse;
import com.LuanVanTotNghiep.dto.response.SchoolYearResponse;
import com.LuanVanTotNghiep.service.SchoolYearService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schoolYear")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class SchoolYearController {

    SchoolYearService schoolYearService;

    @GetMapping("/getAll")
    public ApiResponse<List<SchoolYearResponse>> getAll(@RequestParam(required = false) String keyword){
        List<SchoolYearResponse> result =  schoolYearService.getAll(keyword);
        return ApiResponse.<List<SchoolYearResponse>>builder()
                .result(result)
                .build();
    }
}
