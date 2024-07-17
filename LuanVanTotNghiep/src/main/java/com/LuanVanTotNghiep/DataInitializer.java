package com.LuanVanTotNghiep;

import com.LuanVanTotNghiep.models.*;
import com.LuanVanTotNghiep.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    GradeRepository gradeRepository;
    @Autowired
    YearRepository yearRepository;
    @Autowired
    SemesterRepository semesterRepository;
    @Autowired
    SubjectRepository subjectRepository;
    @Autowired
    ClassRepository classRepository;

    PasswordEncoder passwordEncode = new BCryptPasswordEncoder(10);


    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if(roleRepository.findByName("ADMIN") != null) return;
        Role adminRole = roleRepository.save(Role.builder().name("ADMIN").build());
        roleRepository.save(Role.builder().name("USER").build());
        roleRepository.save(Role.builder().name("TEACHER").build());

        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);

        userRepository.save(User.builder().userCode("AD001").fullName("admin")
                .password(passwordEncode.encode("admin"))
                .roles(adminRoles).build());

        Grade grade10 = gradeRepository.save(Grade.builder().grade(10).build());
        Grade grade11 = gradeRepository.save(Grade.builder().grade(11).build());
        Grade grade12 = gradeRepository.save(Grade.builder().grade(12).build());

        yearRepository.save(SchoolYear.builder().schoolYear(2023).build());
        SchoolYear schoolYear2 = yearRepository.save(SchoolYear.builder().schoolYear(2024).build());

        semesterRepository.save(Semester.builder().code("I").name("Học kỳ 1").startDay(5).startMonth(9).endDay(15).endMonth(1).build());
        semesterRepository.save(Semester.builder().code("I").name("Học kỳ 2").startDay(22).startMonth(1).endDay(25).endMonth(5).build());

        subjectRepository.save(Subject.builder().name("Toán").build());
        subjectRepository.save(Subject.builder().name("Vật lí").build());
        subjectRepository.save(Subject.builder().name("Hóa học").build());
        subjectRepository.save(Subject.builder().name("Sinh học").build());
        subjectRepository.save(Subject.builder().name("Tin học").build());
        subjectRepository.save(Subject.builder().name("Ngữ văn").build());
        subjectRepository.save(Subject.builder().name("Lịch sử").build());
        subjectRepository.save(Subject.builder().name("Địa lí").build());
        subjectRepository.save(Subject.builder().name("Tiếng Anh").build());
        subjectRepository.save(Subject.builder().name("Giáo dục công dân").build());
        subjectRepository.save(Subject.builder().name("Công nghệ").build());
        subjectRepository.save(Subject.builder().name("Thể dục").build());
        subjectRepository.save(Subject.builder().name("Giáo dục Quốc phòng - An ninh").build());

        classRepository.save(ClassEntity.builder().name("10A1").grade(grade10).schoolYear(schoolYear2).build());
        classRepository.save(ClassEntity.builder().name("10A2").grade(grade10).schoolYear(schoolYear2).build());
        classRepository.save(ClassEntity.builder().name("10A3").grade(grade10).schoolYear(schoolYear2).build());
        classRepository.save(ClassEntity.builder().name("11A1").grade(grade11).schoolYear(schoolYear2).build());
        classRepository.save(ClassEntity.builder().name("11A2").grade(grade11).schoolYear(schoolYear2).build());
        classRepository.save(ClassEntity.builder().name("11A3").grade(grade11).schoolYear(schoolYear2).build());
        classRepository.save(ClassEntity.builder().name("12A1").grade(grade12).schoolYear(schoolYear2).build());
        classRepository.save(ClassEntity.builder().name("12A2").grade(grade12).schoolYear(schoolYear2).build());
        classRepository.save(ClassEntity.builder().name("12A3").grade(grade12).schoolYear(schoolYear2).build());
    }
}
