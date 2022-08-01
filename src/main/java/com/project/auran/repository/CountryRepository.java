package com.project.auran.repository;

import com.project.auran.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CountryRepository extends JpaRepository<Country, Long> {
    Optional<Country> findCountryByName(String name);

    Optional<Country> findCountryById(Long id);
}
