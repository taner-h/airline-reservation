package com.project.auran.service;

import com.project.auran.model.Airport;
import com.project.auran.model.City;
import com.project.auran.model.Country;
import com.project.auran.repository.AirportRepository;
import com.project.auran.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirportService {

    private final AirportRepository airportRepository;

    @Autowired
    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    @Autowired
    private CityRepository cityRepository;
    public Airport addAirport(Long cityId, Airport airport) {
        Optional<Airport> airportName = airportRepository.findAirportByName(airport.getName());
        if (airportName.isPresent()) throw new RuntimeException("an airport by that name already exists.");
        City city = cityRepository.findCityById(cityId)
                .orElseThrow(() -> new IllegalStateException("no city found with given id"));
        airport.setCity(city);
        airportRepository.save(airport);
        return airport;
    }

    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }


    public Airport updateAirport(Long airportId, String name, String code, Long cityId) {
        Airport airport = airportRepository.findById(airportId)
                .orElseThrow(() -> new IllegalStateException("no airport found with given id"));
             if (name != null) airport.setName(name);
             if (code != null) airport.setCode(code);
             if (cityId != null){
                 City city = cityRepository.findCityById(cityId)
                         .orElseThrow(() -> new IllegalStateException("no city found with given id"));
        airport.setCity(city);
             }
             airportRepository.save(airport);
             return airport;
    }

    public Airport getAirport(Long airportId) {
        return airportRepository.findById(airportId)
                .orElseThrow(() -> new IllegalStateException("no airport found with given id"));
    }

    public void deleteAirport(Long airportId) {
        airportRepository.findById(airportId)
                .orElseThrow(() -> new IllegalStateException("no airport found with given id"));
        airportRepository.deleteById(airportId);
    }
}
