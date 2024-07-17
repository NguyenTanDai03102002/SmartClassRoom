package com.LuanVanTotNghiep.Scheduler;

import com.LuanVanTotNghiep.models.SchoolYear;
import com.LuanVanTotNghiep.repository.YearRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Year;


@Component
public class SchoolYearScheduler {

    @Autowired
    private YearRepository yearRepository;

    @Scheduled(cron = "0 0 0 22 8 ?")
    public void addNewSchoolYear(){
        int year = 2025; //Year.now().getValue();
        yearRepository.save(SchoolYear.builder().schoolYear(year).build());
    }
}
