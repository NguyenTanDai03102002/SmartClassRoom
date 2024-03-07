package com.NLNganh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NLNganh.models.Role;

public interface RoleRepository extends JpaRepository<Role ,Long> {
	Role findByName(String name);
}
