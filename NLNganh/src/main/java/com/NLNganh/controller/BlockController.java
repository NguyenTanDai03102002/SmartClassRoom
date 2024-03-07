package com.NLNganh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NLNganh.dto.BlockDTO;
import com.NLNganh.service.BlockService;

@RestController
@RequestMapping
@CrossOrigin("*")
public class BlockController {
	
	@Autowired
	private BlockService blockService;
	
	
	@GetMapping("/block")
	public List<BlockDTO> getAllBlocks(){
		return blockService.getAllBlocks();
	}
}
