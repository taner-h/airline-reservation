package com.project.auran.repository;

import com.project.auran.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {


    Optional<City> findCityById(Long cityId);
}
