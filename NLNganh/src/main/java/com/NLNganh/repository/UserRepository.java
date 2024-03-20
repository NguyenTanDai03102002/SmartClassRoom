package com.NLNganh.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.NLNganh.models.ClassEntity;
import com.NLNganh.models.Role;
import com.NLNganh.models.User;

public interface UserRepository extends JpaRepository<User, Long>{
	User findByUsername(String username);
	
	User findByMaSo(String maso);
	
	List<User> findByRolesContaining(Role role);
	
	Page<User> findUsersByClassEntity(ClassEntity classEntity,Pageable pageable);

	@Query("SELECT u FROM User u JOIN u.classEntity c WHERE c = :classEntity AND LOWER(u.fullName) LIKE LOWER(CONCAT(:keyword, '%'))")
	Page<User> findUsersByClassEntityAndKeyWord(ClassEntity classEntity, String keyword, Pageable pageable);

}
