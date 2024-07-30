package com.LuanVanTotNghiep.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class AcademicResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    float meanScore;
    int studentRank;

    @ManyToOne
    @JoinColumn(name = "conduct_id")
    Conduct conduct;

    @ManyToOne
    @JoinColumn(name = "student_id")
    User student;

    @ManyToOne
    @JoinColumn(name = "semester_id")
    Semester semester;

    @ManyToOne
    @JoinColumn(name = "year_id")
    SchoolYear schoolYear;
}
