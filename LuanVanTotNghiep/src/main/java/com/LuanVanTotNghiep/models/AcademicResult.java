package com.LuanVanTotNghiep.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class AcademicResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float meanScore;
    private int studentRank;

    @OneToMany(mappedBy = "academicResult" , cascade = CascadeType.ALL , orphanRemoval = true)
    private Set<Score> scores =  new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conduct_id")
    private Conduct conduct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_id")
    private Semester semester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "year_id")
    private SchoolYear schoolYear;
}
