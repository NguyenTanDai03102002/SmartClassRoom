package com.NLNganh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.NLNganh.models.User;
import com.NLNganh.repository.UserRepository;
import com.NLNganh.utils.CustomUserDetails;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
    private UserRepository userRepository; 
    
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if(user == null) {
			throw new UsernameNotFoundException("user not found");
		}
		
		return new CustomUserDetails(user);
	}

}
