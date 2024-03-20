package com.NLNganh.models;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name ="users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String maSo;
	
	@Column(name = "fullname" , nullable =false , length =40)
	private String fullName;
	
	private LocalDate birthday;
	
	private String address;
	
	private String phoneNumber;
	
	private int sex;
	
	private String image;
	
	
	private String email;
	
	@Column(nullable =false , length =64)
	private String username;
	
	@Column(nullable =false , length =64)
	private String password;
	
	
	@ManyToMany(fetch = FetchType.EAGER ,cascade = CascadeType.ALL)
	@JoinTable(name ="users_roles" ,
			joinColumns = @JoinColumn(name = "user_id") , 
			inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	

	@ManyToMany(fetch = FetchType.EAGER ,cascade = CascadeType.ALL)
	@JoinTable(name ="users_classes" ,
			joinColumns = @JoinColumn(name = "user_id") , 
			inverseJoinColumns = @JoinColumn(name = "class_id"))
	private Set<ClassEntity> classEntity = new HashSet<>();
	
	@OneToMany(mappedBy = "user" , cascade = CascadeType.ALL , orphanRemoval = true)
	private Set<Teach> teachs =  new HashSet<>();

	public User() {
		super();
	}

	public User(Long id,String maSo,String fullName, LocalDate birthday, String address, String phoneNumber, int sex, String image,
			String email,String username, String password, Set<Role> roles) {
		super();
		this.id = id;
		this.maSo = maSo;
		this.fullName = fullName;
		this.birthday = birthday;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.sex = sex;
		this.image = image;
		this.email = email;
		this.username = username;
		this.password = password;
		this.roles = roles;
	}
	public User(String maSo,String fullName, LocalDate birthday, String address, String phoneNumber, int sex, String image,
			String email,String username, String password, Set<Role> roles) {
		super();
		this.maSo = maSo;
		this.fullName = fullName;
		this.birthday = birthday;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.sex = sex;
		this.image = image;
		this.email = email;
		this.username = username;
		this.password = password;
		this.roles = roles;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMaSo() {
		return maSo;
	}

	public void setMaSo(String maSo) {
		this.maSo = maSo;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public LocalDate getBirthday() {
		return birthday;
	}

	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Set<ClassEntity> getClassEntity() {
		return classEntity;
	}

	public void setClassEntity(Set<ClassEntity> classEntity) {
		this.classEntity = classEntity;
	}

	public Set<Teach> getTeachs() {
		return teachs;
	}

	public void setTeachs(Set<Teach> teachs) {
		this.teachs = teachs;
	}

	
	
}
