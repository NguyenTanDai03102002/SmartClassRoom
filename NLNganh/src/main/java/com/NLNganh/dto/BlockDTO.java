package com.NLNganh.dto;

public class BlockDTO {
	private Long id;
    private int name;
    
    
    
	public BlockDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public BlockDTO(Long id, int name) {
		super();
		this.id = id;
		this.name = name;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getName() {
		return name;
	}
	public void setName(int name) {
		this.name = name;
	}
	
}
