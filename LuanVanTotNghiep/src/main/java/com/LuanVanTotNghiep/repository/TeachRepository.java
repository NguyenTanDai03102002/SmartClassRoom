package com.LuanVanTotNghiep.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.LuanVanTotNghiep.models.Teach;
import com.LuanVanTotNghiep.models.User;

public interface TeachRepository extends JpaRepository<Teach, Long> {
//	List<Teach> findByUser(User user);
}
