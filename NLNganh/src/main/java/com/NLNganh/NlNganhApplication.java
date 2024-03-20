package com.NLNganh;

import java.time.LocalDate;
import java.time.MonthDay;
import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.NLNganh.models.Block;
import com.NLNganh.models.Role;
import com.NLNganh.models.Semester;
import com.NLNganh.models.Subject;
import com.NLNganh.models.User;
import com.NLNganh.models.Year;
import com.NLNganh.models.ClassEntity;
import com.NLNganh.repository.BlockRepository;
import com.NLNganh.repository.ClassRepository;
import com.NLNganh.repository.RoleRepository;
import com.NLNganh.repository.SemesterRepository;
import com.NLNganh.repository.SubjectRepository;
import com.NLNganh.repository.UserRepository;
import com.NLNganh.repository.YearRepository;


@SpringBootApplication
public class NlNganhApplication {

	public static void main(String[] args) {
		SpringApplication.run(NlNganhApplication.class, args);
	}
	
	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository,BlockRepository blockRepository,
			YearRepository yearRepository,SemesterRepository semesterRepository, SubjectRepository subjectRepository, ClassRepository classRepository,
			PasswordEncoder passwordEncode){
		return args ->{
			if(roleRepository.findByName("ADMIN") != null) return;
			Role adminRole = roleRepository.save(new Role("ADMIN"));
			Role userrole = roleRepository.save(new Role("USER"));
			Role teacherrole = roleRepository.save(new Role("TEACHER"));

			Set<Role> adminroles = new HashSet<>();
			adminroles.add(adminRole);
			
			Set<Role> userroles = new HashSet<>();
			userroles.add(userrole);
			
			Set<Role> teacherroles = new HashSet<>();
			teacherroles.add(teacherrole);

			User admin = new User((long) 1,"AD001", "admin",  LocalDate.now(), "BL", "0000", 1, "admin.png", "admin@gmail.com","admin", passwordEncode.encode("admin"), adminroles);
			User user = new User((long) 2,"", "user", LocalDate.now(), "BL", "0000", 1, "user.png", "user@gmail.com","user", passwordEncode.encode("user"), userroles);
			User teacher1 = new User((long) 3,"GV001", "teacher1", LocalDate.now(), "BL", "0000", 1, "teacher1.png", "teacher1@gmail.com","teacher1", passwordEncode.encode("teacher1"), teacherroles);
			User teacher2 = new User((long) 4,"GV002", "teacher2", LocalDate.now(), "BL", "0000", 1, "teacher2.png", "teacher2.com","teacher2", passwordEncode.encode("teacher2"), teacherroles);
			User teacher3 = new User((long) 5,"GV003", "teacher3", LocalDate.now(), "BL", "0000", 1, "teacher1.png", "teacher1@gmail.com","teacher3", passwordEncode.encode("teacher3"), teacherroles);
			User teacher4 = new User((long) 6,"GV004", "teacher4", LocalDate.now(), "BL", "0000", 1, "teacher2.png", "teacher2.com","teacher4", passwordEncode.encode("teacher4"), teacherroles);
			User teacher5 = new User((long) 7,"GV005", "teacher5", LocalDate.now(), "BL", "0000", 1, "teacher1.png", "teacher1@gmail.com","teacher5", passwordEncode.encode("teacher5"), teacherroles);
			User teacher6 = new User((long) 8,"GV006", "teacher6", LocalDate.now(), "BL", "0000", 1, "teacher2.png", "teacher2.com","teacher6", passwordEncode.encode("teacher6"), teacherroles);
			User teacher7 = new User((long) 9,"GV007", "teacher7", LocalDate.now(), "BL", "0000", 1, "teacher1.png", "teacher1@gmail.com","teacher7", passwordEncode.encode("teacher7"), teacherroles);
			User teacher8 = new User((long) 10,"GV008", "teacher8", LocalDate.now(), "BL", "0000", 1, "teacher2.png", "teacher2.com","teacher8", passwordEncode.encode("teacher8"), teacherroles);
			User teacher9 = new User((long) 11,"GV009", "teacher9", LocalDate.now(), "BL", "0000", 1, "teacher1.png", "teacher1@gmail.com","teacher9", passwordEncode.encode("teacher9"), teacherroles);
			User teacher10 = new User((long) 12,"GV010", "teacher10", LocalDate.now(), "BL", "0000", 1, "teacher2.png", "teacher2.com","teacher10", passwordEncode.encode("teacher10"), teacherroles);

			userRepository.save(admin);
			userRepository.save(user);
			userRepository.save(teacher1);
			userRepository.save(teacher2);
			userRepository.save(teacher3);
			userRepository.save(teacher4);
			userRepository.save(teacher5);
			userRepository.save(teacher6);
			userRepository.save(teacher7);
			userRepository.save(teacher8);
			userRepository.save(teacher9);
			userRepository.save(teacher10);
			
			
			Block block10 = new Block((long) 1,10);
			Block block11 = new Block((long) 2,11);
			Block block12 = new Block((long) 3,12);
			blockRepository.save(block10);
			blockRepository.save(block11);
			blockRepository.save(block12);
			
			Year year1 = new Year((long) 1 , 2023);
			Year year2 = new Year((long) 2 , 2024);
			yearRepository.save(year1);
			yearRepository.save(year2);
			
			MonthDay startMonthDay1 = MonthDay.of(9, 5); // 5/9
			MonthDay endMonthDay1 = MonthDay.of(1, 15); // 15/1
			MonthDay startMonthDay2 = MonthDay.of(1, 22); // 22/1
			MonthDay endMonthDay2 = MonthDay.of(5, 25); // 25/5
			Semester semester1 = new Semester((long) 1, "HK1", "Học kỳ 1",startMonthDay1.toString() , endMonthDay1.toString() );
			Semester semester2 = new Semester((long) 2, "HK2", "Học kỳ 2",startMonthDay2.toString() , endMonthDay2.toString() );
			semesterRepository.save(semester1);
			semesterRepository.save(semester2);
			
			Subject subject1 = new Subject((long) 1 , "Toán");
			Subject subject2 = new Subject((long) 2 , "Vật lí");
			Subject subject3 = new Subject((long) 3 , "Hóa học");
			Subject subject4 = new Subject((long) 4 , "Sinh học");
			Subject subject5 = new Subject((long) 5 , "Tin học");
			Subject subject6 = new Subject((long) 6 , "Ngữ văn");
			Subject subject7 = new Subject((long) 7 , "Lịch sử");
			Subject subject8 = new Subject((long) 8 , "Địa lí");
			Subject subject9 = new Subject((long) 9 , "Tiếng Anh");
			Subject subject10 = new Subject((long) 10 , "Giáo dục công dân");
			Subject subject11 = new Subject((long) 11 , "Công nghệ");
			Subject subject12 = new Subject((long) 12 , "Thể dục");
			Subject subject13 = new Subject((long) 13 , "Giáo dục Quốc phòng - An ninh");
			subjectRepository.save(subject1);
			subjectRepository.save(subject2);
			subjectRepository.save(subject3);
			subjectRepository.save(subject4);
			subjectRepository.save(subject5);
			subjectRepository.save(subject6);
			subjectRepository.save(subject7);
			subjectRepository.save(subject8);	
			subjectRepository.save(subject9);
			subjectRepository.save(subject10);
			subjectRepository.save(subject11);
			subjectRepository.save(subject12);
			subjectRepository.save(subject13);			
			
			ClassEntity class1 = new ClassEntity((long) 1, "10A1", block10, year2);
			ClassEntity class2 = new ClassEntity((long) 2, "10A2", block10, year2);
			ClassEntity class3 = new ClassEntity((long) 3, "10A3", block10, year2);
			ClassEntity class4 = new ClassEntity((long) 4, "11A1", block11, year2);
			ClassEntity class5 = new ClassEntity((long) 5, "11A2", block11, year2);
			ClassEntity class6 = new ClassEntity((long) 6, "11A3", block11, year2);
			ClassEntity class7 = new ClassEntity((long) 7, "12A1", block12, year2);
			ClassEntity class8 = new ClassEntity((long) 8, "12A2", block12, year2);
			ClassEntity class9 = new ClassEntity((long) 9, "12A3", block12, year2);
			classRepository.save(class1);
			classRepository.save(class2);
			classRepository.save(class3);
			classRepository.save(class4);
			classRepository.save(class5);
			classRepository.save(class6);
			classRepository.save(class7);
			classRepository.save(class8);
			classRepository.save(class9);
		};
	}

}
