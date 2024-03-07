package com.NLNganh.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NLNganh.dto.BlockDTO;
import com.NLNganh.repository.BlockRepository;

@Service
public class BlockServiceImpl implements BlockService {
	
	
	@Autowired
	private BlockRepository blockRepository;

	@Override
	public List<BlockDTO> getAllBlocks() {
	    return blockRepository.findAll().stream()
	            .map(block -> {
	                BlockDTO blockDTO = new BlockDTO();
	                blockDTO.setId(block.getId());
	                blockDTO.setName(block.getName());
	                return blockDTO;
	            })
	            .collect(Collectors.toList());
	}


	
	
}
