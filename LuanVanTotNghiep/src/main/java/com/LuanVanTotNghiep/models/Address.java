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
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int houseNumber;
    private String street;
    private String hamlet;
    private String ward;
    private String district;
    private String city;

    @OneToMany(mappedBy = "address" , cascade = CascadeType.ALL , orphanRemoval = true)
    private Set<User> users =  new HashSet<>();
}
