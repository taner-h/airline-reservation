package com.project.auran.repository;

import com.project.auran.model.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
    Optional<Passenger> findByPnr(String pnr);

    Optional<Passenger> findPassengerById(Long passengerId);
}
