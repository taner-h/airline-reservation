package com.project.auran.service;

import com.project.auran.model.Airline;
import com.project.auran.model.Country;
import com.project.auran.repository.AirlineRepository;
import com.project.auran.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AirlineService {

    private final AirlineRepository airlineRepository;

    @Autowired
    public AirlineService(AirlineRepository airlineRepository) {
        this.airlineRepository = airlineRepository;
    }

    @Autowired
    private CountryRepository countryRepository;

    public Page<Airline> getAirlines(Integer page, Integer pageSize, String sortBy) {
        return airlineRepository.findAll(PageRequest.of(page, pageSize, Sort.Direction.ASC, sortBy));
    }

    public Airline addNewAirline(Long countryId, Airline airline) {
        Optional<Airline> airlineName = airlineRepository.findAirlineByName(airline.getName());
        if (airlineName.isPresent()) throw new RuntimeException("a airline by that name already exists.");
        Country country = countryRepository.findCountryById(countryId)
                .orElseThrow(() -> new IllegalStateException("no countries found with given id"));
        airline.setCountry(country);
        airlineRepository.save(airline);
        return airline;
    }

    public Airline updateAirline(Long airlineId, String name, String website, Long countryId) {
        Airline airline = airlineRepository.findAirlineById(airlineId)
                .orElseThrow(() -> new IllegalStateException("no airline found with given id (" + airlineId + ")"));

        if (name != null) airline.setName(name);
        if (website != null) airline.setWebsite(website);
        if (countryId != null) {
            Country country = countryRepository.findCountryById(countryId)
                    .orElseThrow(() -> new IllegalStateException("no countries found with given id"));
            airline.setCountry(country);
        }
        airlineRepository.save(airline);
        return airline;
    }

    public void deleteAirline(Long airlineId) {
        airlineRepository.findAirlineById(airlineId)
                .orElseThrow(() -> new IllegalStateException("no airline found with given id (" + airlineId + ")"));
        airlineRepository.deleteById(airlineId);

    }

    public Airline getAirline(Long id) {
        return airlineRepository.findAirlineById(id)
                .orElseThrow(() -> new IllegalStateException("no airline found with given id (" + id + ")"));
    }
}
