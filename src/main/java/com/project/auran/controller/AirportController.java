package com.project.auran.controller;

import com.project.auran.model.Airport;
import com.project.auran.model.Company;
import com.project.auran.service.AirportService;
import com.project.auran.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "airport")
public class AirportController {
    
    private final AirportService airportService;

    @Autowired
    public  AirportController(AirportService airportService){
        this.airportService = airportService;
    }

    @GetMapping
    public List<Airport> getAllAirports(){
        return airportService.getAllAirports();
    }

    @GetMapping(path = "{airportId}")
    public Airport getAirport(@PathVariable Long airportId){
        return airportService.getAirport(airportId);
    }


    @PostMapping(path = "{cityId}")
    public Airport addAirport(@PathVariable Long cityId,
                              @RequestBody Airport airport){
        return airportService.addAirport(cityId, airport);
    }

    @PutMapping(path = "{airportId}")
    public Airport updateAirport(@PathVariable Long airportId,
                                 @RequestParam (required = false) String name,
                                 @RequestParam (required = false) String code,
                                 @RequestParam (required = false) Long cityId){
        return airportService.updateAirport(airportId, name, code, cityId);
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{airportId}")
    public void deleteAirport(@PathVariable Long airportId){
        airportService.deleteAirport(airportId);
    }



}
