package com.LuanVanTotNghiep.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.LuanVanTotNghiep.models.ClassEntity;
import com.LuanVanTotNghiep.models.Role;
import com.LuanVanTotNghiep.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	User findByUserCode(String userCode);
	
	List<User> findByRolesContaining(Role role);
}
