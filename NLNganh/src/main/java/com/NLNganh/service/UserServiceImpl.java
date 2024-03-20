package com.NLNganh.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.NLNganh.dto.AuthRequestDTO;
import com.NLNganh.dto.JwtReponseDTO;
import com.NLNganh.dto.UserDTO;

import com.NLNganh.models.Role;
import com.NLNganh.models.User;
import com.NLNganh.repository.RoleRepository;
import com.NLNganh.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
    private JwtService jwtService; 
  
    @Autowired
    private AuthenticationManager authenticationManager; 
    
    @Autowired
    private UserRepository userRepossitory; 
    
    @Autowired
    private RoleRepository roleRepossitory; 
    
    private UserDTO mapUsertoUserDTO(User user) {
        return new UserDTO(user.getId(),user.getMaSo(),user.getFullName(), user.getBirthday(), user.getAddress(), user.getPhoneNumber(), user.getSex()
        		, user.getImage(), user.getEmail(), null, user.getRoles().stream().map(Role::getName).collect(Collectors.toList()));
    }

	@Override
	public JwtReponseDTO UserLogin(AuthRequestDTO authRequestDTO) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
        
        if (authentication.isAuthenticated()) {
            User user = userRepossitory.findByUsername(authRequestDTO.getUsername());
            String token = jwtService.GenerateToken(authRequestDTO.getUsername());
            JwtReponseDTO reponseDTO =  new JwtReponseDTO(token , mapUsertoUserDTO(user)); 
            return reponseDTO;
        } else {
            return new JwtReponseDTO("",null);
        }
	}

	@Override
	public List<UserDTO> getAllTeacher() {
		Role teacherRole = roleRepossitory.findByName("TEACHER");
	    List<User> teachers = userRepossitory.findByRolesContaining(teacherRole);
	    return teachers.stream()
	            .map(this::mapUsertoUserDTO)
	            .collect(Collectors.toList());
	}
	
	private final String IMAGE_DIRECTORY = "src/main/resources/static/assets/img/";

	@Override
	public Resource getImageMainUrlFromUser(Long userid) {
		Optional<User> user = userRepossitory.findById(userid);
		if(user.isPresent()) {
			Path imagePath = Paths.get(IMAGE_DIRECTORY + user.get().getImage());
			if(!Files.exists(imagePath)) {
				imagePath = Paths.get(IMAGE_DIRECTORY + "anhdaidien.png");
			}
			try {
					Resource resource = new UrlResource(imagePath.toUri());
		        return resource;
			}catch(Exception e) {
				return null;
			}
	        
		}else {
			return null;
		}
	}
	
}
