package com.project.auran.service;

import com.project.auran.model.Manufacturer;
import com.project.auran.model.Country;
import com.project.auran.repository.CountryRepository;
import com.project.auran.repository.ManufacturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public Page<Manufacturer> getAllManufacturers(Integer page, Integer pageSize, String sortBy) {
        return manufacturerRepository.findAll(PageRequest.of(page, pageSize, Sort.Direction.ASC, sortBy));
    }

    public Manufacturer updateManufacturer(Long manufacturerId, String name, String website, Long countryId) {

        Manufacturer manufacturer = (Manufacturer) manufacturerRepository.findManufacturerById(manufacturerId)
                .orElseThrow(() -> new IllegalStateException("no manufacturer found with given id (" + manufacturerId + ")"));

        if (name != null) manufacturer.setName(name);
        if (website != null) manufacturer.setWebsite(website);
        if (countryId != null) {
            Country country = countryRepository.findCountryById(countryId)
                    .orElseThrow(() -> new IllegalStateException("no countries found with given id"));
            manufacturer.setCountry(country);
        }
        manufacturerRepository.save(manufacturer);
        return manufacturer;
    
    }

    public void deleteManufacturer(Long manufacturerId) {
        manufacturerRepository.findManufacturerById(manufacturerId)
                .orElseThrow(() -> new IllegalStateException("no manufacturer found with given id (" + manufacturerId + ")"));
        manufacturerRepository.deleteById(manufacturerId);

    }

    public Manufacturer getManufacturer(Long manufacturerId) {
        return manufacturerRepository.findManufacturerById(manufacturerId)
                .orElseThrow(() -> new IllegalStateException("no manufacturer found with given id (" + manufacturerId + ")"));
    }
}
