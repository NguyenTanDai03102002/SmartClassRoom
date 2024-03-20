package com.NLNganh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NLNganh.models.Block;

public interface BlockRepository extends JpaRepository<Block,Long> {
}
