package com.LuanVanTotNghiep.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Lesson {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    Long id;

    int lesson;
    LocalTime start;
    LocalTime end;

    @ManyToMany
    Set<Teach> teaches;

}
