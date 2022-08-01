package com.project.auran.service;

import com.project.auran.model.Country;
import com.project.auran.model.Manufacturer;
import com.project.auran.repository.CountryRepository;
import com.project.auran.repository.ManufacturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ManufacturerService {

    private final ManufacturerRepository manufacturerRepository;

    @Autowired
    public ManufacturerService(ManufacturerRepository manufacturerRepository) {
        this.manufacturerRepository = manufacturerRepository;
    }

    @Autowired
    private CountryRepository countryRepository;


    public Manufacturer addManufacturer(Long countryId, Manufacturer manufacturer) {
        Optional<Manufacturer> manufacturerOptional = manufacturerRepository.findByName(manufacturer.getName());
        if (manufacturerOptional.isPresent()) throw new IllegalStateException("a manufacturer by given name already exists");
        Country country = countryRepository.findCountryById(countryId)
                .orElseThrow(() -> new IllegalStateException("no countries found with given id"));
        manufacturer.setCountry(country);
        manufacturerRepository.save(manufacturer);
        return manufacturer;


    }

    public List<Manufacturer> getAllManufacturers() {
        return manufacturerRepository.findAll();
    }
}
