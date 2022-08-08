package com.project.auran.repository;

import com.project.auran.model.Airplane;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AirplaneRepository extends JpaRepository<Airplane, Long> {
    Optional<Airplane> findByRegistration(String registration);

    Optional<Airplane> findAirplaneById(Long airplaneId);
}
