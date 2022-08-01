package com.project.auran.repository;

import com.project.auran.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company,Long> {
    Optional<Company> findCompanyByName(String name);

    Optional<Company> findCompanyById(Long companyId);
}
