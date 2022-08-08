package com.project.auran.service;

import com.project.auran.model.Airplane;
import com.project.auran.model.Airport;
import com.project.auran.model.Flight;
import com.project.auran.repository.AirplaneRepository;
import com.project.auran.repository.AirportRepository;
import com.project.auran.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FlightService {
    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository){
        this.flightRepository = flightRepository;
    }
    @Autowired
    private AirplaneRepository airplaneRepository;
    @Autowired
    private AirportRepository airportRepository;

    public Flight addFlight(Long airplaneId, Long destId, Long srcId, Flight flight) {
        Optional<Flight> flightName = flightRepository.findByCode(flight.getCode());
        if (flightName.isPresent()) throw new RuntimeException("a flight by that name already exists.");
        Airplane airplane = airplaneRepository.findAirplaneById(airplaneId)
                .orElseThrow(() -> new IllegalStateException("no airplane found with given id"));
        flight.setAirplane(airplane);

        Airport destAirport = airportRepository.findAirportById(destId)
                .orElseThrow(() -> new IllegalStateException("no airport found with given id"));
        flight.setDestinationAirport(destAirport);

        Airport srcAirport = airportRepository.findAirportById(srcId)
                .orElseThrow(() -> new IllegalStateException("no airport found with given id"));
        flight.setSourceAirport(srcAirport);
        flightRepository.save(flight);
        return flight;

    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }


    public void deleteFlight(Long flightId) {
        flightRepository.findById(flightId)
                .orElseThrow(() -> new IllegalStateException("no flight found with given id"));
        flightRepository.deleteById(flightId);
    }


    public Flight getFlight(Long flightId) {
        return flightRepository.findById(flightId)
                .orElseThrow(() -> new IllegalStateException("no flight found with given id"));
    }
}
