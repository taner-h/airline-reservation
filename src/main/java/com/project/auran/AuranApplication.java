package com.project.auran;

import com.project.auran.model.Role;
import com.project.auran.model.User;
import com.project.auran.repository.AirlineRepository;
import com.project.auran.repository.CountryRepository;
import com.project.auran.repository.RoleRepository;
import com.project.auran.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.net.UnknownServiceException;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class AuranApplication implements CommandLineRunner {

//	@Autowired
//	private AirlineRepository airlineRepository;
//
//	@Autowired
//	private CountryRepository countryRepository;
// 	@Autowired
//	private UserRepository userRepository;
//
//	@Autowired
//	private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(AuranApplication.class, args);
	}
	@Bean
	PasswordEncoder passwordEncoder(){
		 return new BCryptPasswordEncoder();
	}

	@Override
	public void run(String... args) throws Exception {

//		User user = new User(null, "admin", "admin@email.com", "admin", new ArrayList<>());
//		userRepository.save(user);

//		Role role = new Role(null, "ADMIN");
//		roleRepository.save(role);
	}


	}
