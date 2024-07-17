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
	
	@Query(value = "SELECT * FROM users u JOIN users_roles ur ON u.id = ur.user_id Where ur.role_id = ?1 AND LOWER(u.fullname) LIKE LOWER(CONCAT(?2,'%'))" 
			,nativeQuery = true)
	Page<User> findTeachersByRoleAndKeyWord(Long roleId,String keyword,Pageable pageable);
	
	Page<User> findUsersByClassEntity(ClassEntity classEntity,Pageable pageable);

	@Query("SELECT u FROM User u JOIN u.classEntity c WHERE c = :classEntity AND LOWER(u.fullName) LIKE LOWER(CONCAT(:keyword, '%'))")
	Page<User> findUsersByClassEntityAndKeyWord(ClassEntity classEntity, String keyword, Pageable pageable);
	
	

}
