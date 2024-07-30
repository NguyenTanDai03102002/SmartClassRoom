package com.LuanVanTotNghiep.service;

import java.util.List;
import java.util.stream.Collectors;

import com.LuanVanTotNghiep.Mapper.UserMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import com.LuanVanTotNghiep.dto.response.UserResponse;

import com.LuanVanTotNghiep.models.Role;
import com.LuanVanTotNghiep.models.User;
import com.LuanVanTotNghiep.repository.RoleRepository;
import com.LuanVanTotNghiep.repository.UserRepository;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserServiceImpl implements UserService {

	UserRepository userRepository;
	RoleRepository roleRepository;
	UserMapper userMapper;

	@Override
	public List<UserResponse> getAllTeacher() {
		Role teacherRole = roleRepository.findByName("TEACHER");
	    List<User> teacherList = userRepository.findByRolesContaining(teacherRole);
	    return teacherList.stream().map(userMapper::toUserResponse)
				.collect(Collectors.toList());
	}
//	@Override
//	public Page<UserResponse> getAllTeacherPageable(Pageable pageable, String keyword) {
//		Role teacherRole = roleRepository.findByName("TEACHER");
//		Page<User> teachers = userRepository.findTeachersByRoleAndKeyWord(teacherRole.getId(),keyword, pageable);
//		List<UserResponse> teachersDTO = teachers.stream()
//				.map(teacher -> userMapper.toUserResponse(teacher))
//				.collect(Collectors.toList());
//		return new PageImpl<>(teachersDTO, pageable,teachers.getTotalElements());
//	}
//
//	@Override
//	public ResponseEntity<?> addteacher(UserResponse userdto, MultipartFile image) {
//		User user = userRepository.findByUserCode(userdto.getUserCode());
//		Role role = roleRepository.findByName("TEACHER");
//		Set<Role> roleteacher = new HashSet<>();
//		roleteacher.add(role);
//
//		if(user!= null) {
//			return ResponseEntity.noContent().build();
//		}else {
//			if(image!= null) {
//				try {
//					String filename = image.getOriginalFilename();
//					Path path = Paths.get(IMAGE_DIRECTORY,filename);
//					if(path == null) {
//						Files.copy(image.getInputStream(), path);
//					}
//				}catch(Exception ex) {
//					return null;
//				}
//			}
//			user = new User();
//			user.setUserCode(userdto.getUserCode());
//			user.setFullName(userdto.getFullName());
//			user.setBirthday(userdto.getBirthday());
//			user.setPhoneNumber(userdto.getPhoneNumber());
//			user.setSex(userdto.getSex());
//			user.setEmail(userdto.getEmail());
//			user.setPassword(passwordEncode.encode(userdto.getPassword()));
//			user.setImageUrl((image!=null ? image.getOriginalFilename() : null));
//			user.setRoles(roleteacher);
//		}
//		userRepository.save(user);
//		return ResponseEntity.ok().build();
//	}
//	@Override
//	public ResponseEntity<?> editTeacher(Long userId, UserResponse userdto, MultipartFile image) {
//		Optional<User> user = userRepository.findById(userId);
//		if(user.isPresent()) {
//			if(image != null) {
//				String filename = image.getOriginalFilename();
//				Path path = Paths.get(IMAGE_DIRECTORY + filename);
//				try {
//					if(path==null) {
//						Files.copy(image.getInputStream(),path);
//					}
//				}catch(Exception ex) {
//					return null;
//				}
//			}
//			user.get().setFullName(userdto.getFullName());
//			user.get().setBirthday(userdto.getBirthday());
//			user.get().setPhoneNumber(userdto.getPhoneNumber());
//			user.get().setSex(userdto.getSex());
//			user.get().setEmail(userdto.getEmail());
//			user.get().setPassword(passwordEncode.encode(userdto.getPassword()));
//			user.get().setImageUrl(image != null ? image.getOriginalFilename() : user.get().getImageUrl());
//			userRepository.save(user.get());
//		}
//		return ResponseEntity.ok().build();
//	}
//	@Override
//	public ResponseEntity<?> deleteTeacher(Long userId) {
//		if(userId != null) {
//	        User user = userRepository.findById(userId).orElse(null);
//	        if(user != null) {
//	        	user.getRoles().clear();
//	        	userRepository.save(user);
//	            userRepository.deleteById(userId);
//	            return ResponseEntity.ok().build();
//	        } else {
//	            return ResponseEntity.notFound().build();
//	        }
//	    } else {
//	        return ResponseEntity.badRequest().build();
//	    }
//	}
//
//
//	@Override
//	public ResponseEntity<ByteArrayResource> getImageMainUrlFromUser(Long userid) {
//		Optional<User> user = userRepository.findById(userid);
//		if(user.get().getImageUrl() != null) {
//			try {
//				Path filename = Paths.get(IMAGE_DIRECTORY,user.get().getImageUrl());
//				byte[] buffer = Files.readAllBytes(filename);
//				ByteArrayResource byteArrayResource = new ByteArrayResource(buffer);
//				return ResponseEntity.ok()
//						.contentLength(buffer.length)
//						.contentType(MediaType.parseMediaType("image/png"))
//						.body(byteArrayResource);
//			}catch(Exception ex) {
//				return null;
//			}
//		}else {
//			return null;
//		}
//	}
//
//	@Override
//	public ResponseEntity<?> EditStudentInClass(Long userid, UserResponse userdto, MultipartFile image) {
//		Optional<User> user = userRepository.findById(userid);
//		if(user.isPresent()) {
//			if(image != null) {
//				String fileName = image.getOriginalFilename();
//				userdto.setImageUrl(fileName);
//				Path imagePath = Paths.get(IMAGE_DIRECTORY + fileName);
//				try {
//					if(imagePath == null) {
//						Files.copy(image.getInputStream(), imagePath);
//					}
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//			}
//
//			user.get().setFullName(userdto.getFullName());
//			user.get().setSex(userdto.getSex());
//			user.get().setBirthday(userdto.getBirthday());
//			user.get().setPhoneNumber(userdto.getPhoneNumber());
//			user.get().setImageUrl(userdto.getImageUrl());
//			user.get().setPassword(passwordEncode.encode(userdto.getPassword()));
//			user.get().setEmail(userdto.getEmail());
//			userRepository.save(user.get());
//		}else {
//			return null;
//		}
//
//		return ResponseEntity.ok().build();
//	}
//
//	@Override
//	public ResponseEntity<?> importexcelTeacher(List<UserResponse> teachersDTO) {
//		Role role = roleRepository.findByName("TEACHER");
//
//		Set<Role> roleteacher  = new HashSet<>();
//		roleteacher.add(role);
//
//		for(UserResponse teacher : teachersDTO) {
//			User user = userRepository.findByUserCode(teacher.getUserCode());
//			if(user !=null) {
//				user.setFullName(teacher.getFullName());
//				user.setSex(teacher.getSex());
//				user.setBirthday(teacher.getBirthday());
////				user.setAddress(teacher.getAddress());
//				user.setPhoneNumber(teacher.getPhoneNumber());
//				user.setPassword(passwordEncode.encode(teacher.getPassword()));
//				user.setEmail(teacher.getEmail());
//				user.setRoles(roleteacher);
//			}else {
////				user = new User(teacher.getMaSo(),teacher.getFullName(),teacher.getBirthday(),teacher.getAddress()
////						,teacher.getPhoneNumber(),teacher.getSex(),null,teacher.getEmail(),
////						passwordEncode.encode(teacher.getPassword()),roleteacher);
//			}
//			userRepository.save(user);
//		}
//
//		return ResponseEntity.ok().build();
//	}

}
