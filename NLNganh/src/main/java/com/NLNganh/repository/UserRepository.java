package com.NLNganh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NLNganh.models.Role;
import com.NLNganh.models.User;

public interface UserRepository extends JpaRepository<User, Long>{
	public User findByUsername(String username);
	
	List<User> findByRolesContaining(Role role);
}
