package com.project.auran.repository;

import com.project.auran.model.Airline;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AirlineRepository extends JpaRepository<Airline,Long> {
    Optional<Airline> findAirlineByName(String name);

    Optional<Airline> findAirlineById(Long airlineId);
}
