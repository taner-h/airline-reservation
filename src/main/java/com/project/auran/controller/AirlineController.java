package com.project.auran.controller;

import com.project.auran.model.Airline;
import com.project.auran.service.AirlineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "airline")
public class AirlineController {

    private final AirlineService airlineService;

    @Autowired
    public AirlineController(AirlineService airlineService){
        this.airlineService = airlineService;
    }

    @GetMapping
    public List<Airline> getAllAirlines(){
        return airlineService.getAllAirlines();
    }

    @GetMapping(path = "{airlineId}")
    public Airline getAirline(@PathVariable Long airlineId){
        return airlineService.getAirline(airlineId);
    }

    @PostMapping(path = "{countryId}")
    public Airline addNewAirline(@PathVariable Long countryId,
                                 @RequestBody Airline airline) {
        return airlineService.addNewAirline(countryId, airline);
    }

    @PutMapping(path = "{airlineId}")
    public Airline updateAirline(@PathVariable Long airlineId,
                                 @RequestParam (required = false) String name,
                                 @RequestParam (required = false) String website,
                                 @RequestParam (required = false) Long countryId) {
        return airlineService.updateAirline(airlineId, name, website, countryId);
    }


    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{airlineId}")
    public void deleteAirline(@PathVariable Long airlineId) {
        airlineService.deleteAirline(airlineId);
    }

}
