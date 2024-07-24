package com.LuanVanTotNghiep.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(exclude = {"academicResults"})
@ToString(exclude = {"academicResults"})
@Entity
public class Conduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "conduct" , cascade = CascadeType.ALL , orphanRemoval = true)
    private Set<AcademicResult> academicResults =  new HashSet<>();

}
