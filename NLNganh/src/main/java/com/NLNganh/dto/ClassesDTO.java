package com.NLNganh.dto;

public class ClassesDTO {
	private Long id;
    private String name;
    private BlockDTO blockName;
    private UserDTO teacher;
    private int year;
    
    public ClassesDTO() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BlockDTO getBlock() {
		return blockName;
	}

	public void setBlock(BlockDTO blockName) {
		this.blockName = blockName;
	}

	public UserDTO getTeacher() {
		return teacher;
	}

	public void setTeacher(UserDTO teacher) {
		this.teacher = teacher;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}
    
}
