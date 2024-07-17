package com.LuanVanTotNghiep.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.LuanVanTotNghiep.models.Role;

public interface RoleRepository extends JpaRepository<Role ,Long> {
	Role findByName(String name);
}
