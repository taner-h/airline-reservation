package com.project.auran.controller;

import com.project.auran.model.Airline;
import com.project.auran.model.Manufacturer;
import com.project.auran.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "manufacturer")
public class ManufacturerController {

    private final ManufacturerService manufacturerService;

    @Autowired
    public  ManufacturerController(ManufacturerService manufacturerService){
        this.manufacturerService = manufacturerService;
    }

    @PostMapping(path = "{countryId}")
    public Manufacturer addManufacturer(@PathVariable Long countryId,
                                        @RequestBody Manufacturer manufacturer){
        return manufacturerService.addManufacturer(countryId, manufacturer);
    }

    @GetMapping
    public Page<Manufacturer> getAllManufacturers(@RequestParam(defaultValue = "0") Integer page,
                                                  @RequestParam(defaultValue = "10") Integer pageSize,
                                                  @RequestParam(defaultValue = "id") String sortBy)  {
        return manufacturerService.getAllManufacturers(page, pageSize, sortBy);
    }

    @PutMapping(path = "{manufacturerId}")
    public Manufacturer updateManufacturer(@PathVariable Long manufacturerId,
                                 @RequestParam (required = false) String name,
                                 @RequestParam (required = false) String website,
                                 @RequestParam (required = false) Long countryId) {
        return manufacturerService.updateManufacturer(manufacturerId, name, website, countryId);
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{manufacturerId}")
    public void deleteManufacturer(@PathVariable Long manufacturerId) {
        manufacturerService.deleteManufacturer(manufacturerId);
    }

    @GetMapping(path = "{manufacturerId}")
    public Manufacturer getManufacturer(@PathVariable Long manufacturerId){
        return manufacturerService.getManufacturer(manufacturerId);
    }
}
