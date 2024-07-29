package com.LuanVanTotNghiep.controller;

import com.LuanVanTotNghiep.dto.response.ApiResponse;
import com.LuanVanTotNghiep.dto.response.SchoolYearResponse;
import com.LuanVanTotNghiep.service.SchoolYearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schoolYear")
@CrossOrigin("*")
public class SchoolYearController {

    @Autowired
    private SchoolYearService schoolYearService;

    @GetMapping("/getAll")
    public ApiResponse<List<SchoolYearResponse>> getAll(@RequestParam(required = false) String keyword){
        return schoolYearService.getAll(keyword);
    }
}
