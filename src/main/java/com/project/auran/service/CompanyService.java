package com.project.auran.service;

import com.project.auran.model.Company;
import com.project.auran.model.Country;
import com.project.auran.repository.CompanyRepository;
import com.project.auran.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Autowired
    private CountryRepository countryRepository;




    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company addNewCompany(Long countryId, Company company) {
        Optional<Company> companyName = companyRepository.findCompanyByName(company.getName());
        if (companyName.isPresent()) throw new RuntimeException("a company by that name already exists.");
        Country country = countryRepository.findCountryById(countryId)
                .orElseThrow(() -> new IllegalStateException("no countries found with given id"));
        company.setCountry(country);
        companyRepository.save(company);
        return company;
    }

    public Company updateCompany(Long companyId, String name, String website, Long countryId) {
        Company company = companyRepository.findCompanyById(companyId)
                .orElseThrow(() -> new IllegalStateException("no company found with given id (" + companyId + ")"));

        if (name != null) company.setName(name);
        if (website != null) company.setWebsite(website);
        if (countryId != null) {
            Country country = countryRepository.findCountryById(countryId)
                    .orElseThrow(() -> new IllegalStateException("no countries found with given id"));
            company.setCountry(country);
        }
        companyRepository.save(company);
        return company;


    }

    public void deleteCompany(Long companyId) {
        companyRepository.findCompanyById(companyId)
                .orElseThrow(() -> new IllegalStateException("no company found with given id (" + companyId + ")"));
        companyRepository.deleteById(companyId);

    }

    public Company getCompany(Long id) {
        return companyRepository.findCompanyById(id)
                .orElseThrow(() -> new IllegalStateException("no company found with given id (" + id + ")"));
    }
}
