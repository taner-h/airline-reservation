package com.project.auran.repository;

import com.project.auran.model.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
    Optional<Airport> findAirportByName(String name);

    Optional<Airport> findAirportById(Long destId);
}
