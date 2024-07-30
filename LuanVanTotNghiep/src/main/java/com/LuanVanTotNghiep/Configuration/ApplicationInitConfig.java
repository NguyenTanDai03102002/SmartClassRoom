package com.LuanVanTotNghiep.Configuration;

import com.LuanVanTotNghiep.models.*;
import com.LuanVanTotNghiep.repository.*;
import lombok.AccessLevel;
import lombok.experimental.NonFinal;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

    PasswordEncoder passwordEncode;

    @NonFinal
    static final String ADMIN_USER_CODE = "AD000001";

    @NonFinal
    static final String ADMIN_PASSWORD = "admin";

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(RoleRepository roleRepository, UserRepository userRepository,
                                        GradeRepository gradeRepository, SchoolYearRepository schoolYearRepository,
                                        SemesterRepository semesterRepository, SubjectRepository subjectRepository) {
        return args -> {
            if (userRepository.findByUserCode(ADMIN_USER_CODE) == null) {

                Role adminRole = roleRepository.save(Role.builder().name("ADMIN").build());
                roleRepository.save(Role.builder().name("USER").build());
                Role teacherRole =roleRepository.save(Role.builder().name("TEACHER").build());

                Set<Role> adminRoles = new HashSet<>();
                adminRoles.add(adminRole);

                Set<Role> teacherRoles = new HashSet<>();
                teacherRoles.add(teacherRole);

                userRepository.save(User.builder()
                        .userCode(ADMIN_USER_CODE)
                        .fullName("admin")
                        .password(passwordEncode.encode(ADMIN_PASSWORD))
                        .imageUrl("https://res.cloudinary.com/danrswhe6/" +
                                "image/upload/v1721713336/1dbe84ad-b114-475b-b65d-baa126f4f6dd.jpg")
                        .roles(adminRoles)
                        .build());

                userRepository.save(User.builder()
                        .userCode("TC000001")
                        .fullName("teacher1")
                        .password(passwordEncode.encode(ADMIN_PASSWORD))
                        .roles(teacherRoles)
                        .build());
                userRepository.save(User.builder()
                        .userCode("TC000002")
                        .fullName("teacher2")
                        .password(passwordEncode.encode(ADMIN_PASSWORD))
                        .roles(teacherRoles)
                        .build());
                userRepository.save(User.builder()
                        .userCode("TC000003")
                        .fullName("teacher3")
                        .password(passwordEncode.encode(ADMIN_PASSWORD))
                        .roles(teacherRoles)
                        .build());


                gradeRepository.save(Grade.builder().grade(10).build());
                gradeRepository.save(Grade.builder().grade(11).build());
                gradeRepository.save(Grade.builder().grade(12).build());

                schoolYearRepository.save(SchoolYear.builder()
                        .schoolYear(2024).build());
                schoolYearRepository.save(SchoolYear.builder().schoolYear(2025).build());

                semesterRepository.save(Semester.builder()
                        .code("I")
                        .name("Học kỳ 1")
                        .startDay(5).startMonth(9).endDay(15).endMonth(1).build());
                semesterRepository.save(Semester.builder()
                        .code("I")
                        .name("Học kỳ 2")
                        .startDay(22).startMonth(1).endDay(25).endMonth(5).build());

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

            }
        };
    }
}