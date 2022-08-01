package com.project.auran;

import com.project.auran.model.Company;
import com.project.auran.model.Country;
import com.project.auran.repository.CompanyRepository;
import com.project.auran.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuranApplication implements CommandLineRunner {

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private CountryRepository countryRepository;

	public static void main(String[] args) {
		SpringApplication.run(AuranApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		Country usa =new Country(
//				"United States of America",
//				"USA" );
//		Company delta =new Company(
//				"Delta Air Lines",
//				"www.delta.com",
//				usa);
//		countryRepository.save(usa);
//		companyRepository.save(delta);


	}


	}
