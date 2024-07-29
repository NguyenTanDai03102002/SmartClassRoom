package com.LuanVanTotNghiep.repository;

import com.LuanVanTotNghiep.models.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String> {
    List<InvalidatedToken> findByExpiryTimeBefore(Date expiryTime);
    void deleteByExpiryTimeBefore(Date expiryTime);
}
