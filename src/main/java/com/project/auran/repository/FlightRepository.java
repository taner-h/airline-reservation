package com.project.auran.repository;

import com.project.auran.model.Airport;
import com.project.auran.model.Flight;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    Optional<Flight> findByCode(String code);

    Optional<Flight> findFlightById(Long flightId);

    Page<Flight> findAllByDestinationAirportAndSourceAirportAndTakeoffBetween(
            Airport destinationAirport,
            Airport sourceAirport,
            LocalDateTime takeoff,
            LocalDateTime takeoff2,
            Pageable pageable);
}
