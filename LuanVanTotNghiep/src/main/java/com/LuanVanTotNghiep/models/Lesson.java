package com.LuanVanTotNghiep.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Lesson {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private int lesson;
    private LocalTime start;
    private LocalTime end;

    @ManyToMany(mappedBy = "lessons")
    private Set<Teach> teaches = new HashSet<>();

}
